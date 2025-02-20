import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache(),
})

// export const getAllJobs = async (limit, offset) => {
//     const query = gql`
//       query($limit: Int, $offset: Int){
//         jobs(limit: $limit, offset: $offset){
//             id,
//             title,
//             date,
//             description,
//             company {
//                 id,
//                 name
//             }
//         }
//     }
//     `
//     // const result = await apolloClient.query({ query: query }, { limit, offset })
//     // console.log(result.data.jobs)
//     // return result.data.jobs

//     const result = await useQuery(query, {
//         variables: { limit, offset }
//     })

//     console.log(result)

// }

export const companyByIdQuery = gql`
    query CompanyById($id: ID!){
        company(id: $id){
            id
            name
            description
            jobs{
                id
                companyId
                title
                date
                description
            }
        } 
    }   
    `

export const jobsQuery = gql`
query($limit: Int, $offset: Int){
  jobs(limit: $limit, offset: $offset){
    items {
          id
          title
          date
          description
          company{
            id
            name
          }
        }
        totalCount
      }
}
`