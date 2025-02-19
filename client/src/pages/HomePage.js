import { useEffect, useState } from 'react';
import JobList from '../components/JobList';

import { gql, request } from 'graphql-request'
import { getAllJobs } from '../lib/graphql/queries';
import { errorCodes } from '@apollo/client/invariantErrorCodes';

function HomePage() {

  const [jobs, setJobs] = useState([])

  const getJobs = async () => {
    const document = gql`
    query{
  jobs{
    id,
    title,
    date,
    description,
    company{
      id,
      name
    }
  }
}
    `

    request('http://localhost:9000/graphql', document)
      .then((data) => {
        console.log(data.jobs)
        setJobs(data.jobs)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    // graphql-request 
    // getJobs()

    // apollo client
    getAllJobs()
      .then((data) => setJobs(data))
      .catch((error) => console.log(error))

  }, [])

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
