import React from "react";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function Job({ job }) {
  return (
    <Link to={`/jobdetail/${job.id}`} className="main__job">
      <div className="job__logo">
        {job.company_logo ? (
          <img src={job.company_logo} alt="" />
        ) : (
          <span className="notfound">not found</span>
        )}
      </div>
      <div className="job__description">
        <p className="company__name">{job.company}</p>
        <h3 className="job__title">{job.title}</h3>
        <div className="job__post">
          <span className="job__type">{job.type}</span>
          <span className="job__location">
            <i className="material-icons">public</i>
            {job.location.substr(0, 20)}
          </span>
          <span className="job__post-date">
            <i className="material-icons">access_time</i>
            {formatDistanceToNow(new Date(job.created_at))} ago
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Job;
