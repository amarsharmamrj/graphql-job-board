import { useState } from 'react';
import { gql, request } from 'graphql-request';
import { useNavigate } from 'react-router';
import { getAccessToken } from '../lib/auth';

function CreateJobPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate()

  const createJob = async () => {
    const mutation = gql`
      mutation creteJob($input: CreateJobInput!){
        job:createJob(input: $input){
          id
        }
      }
    `

    const token = getAccessToken()

    try {
      const result = await request('http://localhost:9000/graphql', mutation, {
        input: {
          title,
          description
        }
      }, {
        "Authorization": `Bearer ${token}`
      })
      console.log('result:', result)
      navigate(`/jobs/${result.job.id}`)
    } catch (error) {
      console.log(error)
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('should post a new job:', { title, description });
    createJob()
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
