import React from "react";
import { useSelector } from "react-redux";
import Job from "./Job";
import NoJob from "./NoJob";

function JobList() {
  const jobs = useSelector(state => state.jobs.viewData);
  return (
    <>
      {Object.keys(jobs).length === 0 && <NoJob />}
      {Object.entries(jobs).map(([key, job]) => (
        <Job key={key} job={job} />
      ))}
    </>
  );
}

export default JobList;
