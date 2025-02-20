import { useQuery } from "@apollo/client"
import { jobsQuery } from "./queries"

export const useJobs = (limit, offset) => {
    const { data, loading, error } = useQuery(jobsQuery, {
        variables: {
            limit,
            offset
        }
    })
    return { jobs: data?.jobs, loading, error: Boolean(error) }
}