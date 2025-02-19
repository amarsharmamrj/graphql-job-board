import { useParams } from 'react-router';
import { companies } from '../lib/fake-data';
import { gql, request } from 'graphql-request';
import { useEffect, useState } from 'react';
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();

  const [company, setCompany] = useState({})

  const get = async () => {
    console.log("get job called funciton")
    const document = gql`
        query CompanyById($id: ID!){
          company(id: $id){
            id
            name
            description
            jobs {
              id
              date
              title
            }
        }
      }
    `
    const data = await request('http://localhost:9000/graphql', document, { id: companyId })
    setCompany(data.company)
    console.log("company:", data)

  }

  useEffect(() => {
    get(companyId)
  }, [companyId])

  if (!company) return <p>Loading..</p>


  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>

      <h1 className="title">Jobs at {company.name}</h1>
      <JobList jobs={company.jobs} />

    </div>
  );
}

export default CompanyPage;
