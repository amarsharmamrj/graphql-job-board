import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache(),
})

export const getAllJobs = async () => {
    const query = gql`
      query{
        jobs{
            id,
            title,
            date,
            description,
            company {
                id,
                name
            }
        }
    }
    `
    const result = await apolloClient.query({ query: query })
    console.log(result.data.jobs)
    return result.data.jobs
}
