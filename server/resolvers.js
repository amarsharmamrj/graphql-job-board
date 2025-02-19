import { createJob, deleteJob, getJob, getJobByCompany, getJobs, updateJob } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";
import { GraphQLError } from "graphql";

export const resolvers = {
    Query: {
        jobs: async () => {
            const jobs = await getJobs()
            return jobs
        },
        job: (root, args) => getJob(args.id),
        company: async (root, args) => {
            const company = await getCompany(args.id)
            if (!company) {
                throw new GraphQLError('No company found with id' + args.id, {
                    extensions: { code: 'NOT_FOUND' }
                })
            }
            return company
        }
    },
    Mutation: {
        // 1st arg: parent object, 2nd arg: to get arguments passed from client query, 3rd arg: to pass any custom data
        createJob: async (_root, { input: { title, description } }, context) => {
            const { user } = context

            if (!user) {
                return unauthorizedError('Unauthorized')
            }

            return await createJob({ companyId: user.companyId, title, description })
        },
        deleteJob: async (_root, args, context) => {
            const { user } = context
            if (!user) {
                throw unauthorizedError('Unauthorized')
            }

            const job = await deleteJob(args.id, user.companyId)
            if (!job) {
                throw notFoundError('not found!!')
            }

            return job
        },
        updateJob: async (_root, args, context) => {
            const { input } = args
            const { id, title, description } = input
            const { user } = context

            if (!user) {
                throw unauthorizedError('unathorized')
            }

            const job = await updateJob({ id, company: user.companyId, title, description })
            if (!job) {
                throw notFoundError()
            }
            return job
        }
    },
    Job: {
        // here obj is the parent object i.e. single job
        date: obj => toIsoDate(obj.createdAt),
        title: obj => obj.title.toLowerCase(),
        // the other fields are returned by default from the 
        // parent function since there is no resolver defined fo them

        // graphql first try to find the resolver for the 
        // fields requested and then send the response, but 
        // if the resolver is not available then it will graphql 
        // engine try to find the field in the parent object and then 
        // return, if not so then it will return null.
        company: (obj) => getCompany(obj.companyId)
    },
    Company: {
        jobs: (company) => getJobByCompany(company.id)
    }
}

function toIsoDate(date) {
    return date.slice(0, 'yyyy-mm-dd'.length)
}

function unauthorizedError(message) {
    throw new GraphQLError(message, {
        extensions: {
            code: 'UNATHORIZED'
        }
    })
}

function notFoundError(message) {
    throw new GraphQLError(message, {
        extensions: {
            code: 'NOT_FOUND'
        }
    })
}