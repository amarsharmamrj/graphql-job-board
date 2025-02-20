import { useState } from 'react';
import JobList from '../components/JobList';
import { useJobs } from '../lib/graphql/hooks';
import PaginationBar from '../components/PaginationBar';

const JOBS_PER_PAGE = 2

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { jobs, loading, error } = useJobs(JOBS_PER_PAGE, (currentPage - 1) * JOBS_PER_PAGE)

  const totalPages = Math.ceil(jobs?.totalCount / JOBS_PER_PAGE)


  if (loading) return <p>Loading..</p>
  if (error) return <p>Error</p>

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>

      <PaginationBar currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <JobList jobs={jobs?.items} />
    </div>
  );
}

export default HomePage;
