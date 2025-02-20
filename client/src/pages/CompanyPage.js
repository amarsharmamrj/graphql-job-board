import { useParams } from 'react-router';
import JobList from '../components/JobList';

import { useQuery} from '@apollo/client'
import { companyByIdQuery } from '../lib/graphql/queries';

function CompanyPage() {
  const { companyId } = useParams();

  // the below code together with useEffect is used when we are not using useQuery from apollo client
  // const get = async () => {
  //   console.log("get job called funciton")
  //   const document = gql`
  //       query CompanyById($id: ID!){
  //         company(id: $id){
  //           id
  //           name
  //           description
  //           jobs {
  //             id
  //             date
  //             title
  //           }
  //       }
  //     }
  //   `
  //   const data = await request('http://localhost:9000/graphql', document, { id: companyId })
  //   setCompany(data.company)
  //   console.log("company:", data)

  // }

  // useEffect(() => {
  //   get(companyId)
  // }, [companyId])

  const { data, error, loading } = useQuery(companyByIdQuery, {
    variables: {
      id: companyId
    }
  })

  if(loading) return <p>Loading..</p>

  if(error) return <p>No Data!!</p>

  const { company } = data

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
