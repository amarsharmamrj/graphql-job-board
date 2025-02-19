import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
import { jobs } from '../lib/fake-data';
import { useEffect, useState } from 'react';

import { gql, request } from 'graphql-request'

function JobPage() {
  const { jobId } = useParams();

  const [job, setJob] = useState({})

  // const job = jobs.find((job) => job.id === jobId);

  const getJob = async () => {
    console.log("get job called funciton")
    const document = gql`
      query JobById($id: ID!){
        job(id: $id){
          id
          title
          date
          description
          company{
            id
            name
          }
      }
  }
    `
    const data = await request('http://localhost:9000/graphql', document, { id: jobId })
    setJob(data.job)
    console.log(data)

  }

  useEffect(() => {
    getJob(jobId)
  }, [jobId])

  return (
    <div>
      <h1 className="title is-2">
        {job.title}
      </h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job?.company?.id}`}>
          {job?.company?.name}
        </Link> 
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          {/* Posted: {formatDate(job.date, 'long')} */}
        </div>
        <p className="block">
          {job.description}
        </p>
      </div>
    </div>
  );
}

export default JobPage;
