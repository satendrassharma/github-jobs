import React from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function JobDetails() {
  const match = useRouteMatch();

  const job = useSelector(store => store.jobs.entities[match.params.id]);

  console.log(job);

  if (!job) {
    return null;
  }

  return (
    <div className="jobdetails">
      <header className="container">
        <div className="header">
          <strong>Github</strong> Jobs
        </div>
      </header>
      <main className="container main">
        <div className="main__left">
          <Link to="/" className="backlink">
            <i className="material-icons trending_flat-icon">trending_flat</i>
            &nbsp;&nbsp;Back to search
          </Link>

          <p className="bold__text">How to apply</p>

          <p
            className="apply_details"
            dangerouslySetInnerHTML={{ __html: job.how_to_apply }}
          ></p>
        </div>
        <div className="main__right">
          <div className="job__detail-header">
            <h1 className="job__title title-big">{job.title}</h1>
            <span className="job__type">{job.type}</span>
          </div>

          <div className="job__post-date">
            <i className="material-icons access_time-icon">access_time</i>
            {formatDistanceToNow(new Date(job.created_at))} ago
          </div>

          <div className="company__details">
            <div className="job__logo">
              {job.company_logo ? (
                <img src={job.company_logo} alt="" />
              ) : (
                <span className="notfound">not found</span>
              )}
            </div>
            <div className="company__details-right">
              <p className="company__name">{job.company}</p>
              <div className="job__location">
                <i className="material-icons public-icon">public</i>{" "}
                {job.location}
              </div>
            </div>
          </div>

          <div
            className="job__description jobdetail-jobdescription"
            dangerouslySetInnerHTML={{ __html: job.description }}
          >
            {/* {job.description} */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default JobDetails;
