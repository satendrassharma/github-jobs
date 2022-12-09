import {
  FETCH_JOBS_FAILED,
  FETCH_JOBS_START,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_PAGE,
  UPDATE_JOBS_LOCATION,
  UPDATE_JOBS_FULLTIME,
  UPDATE_JOBS_DESCRIPTION
} from "./types";
import { v4 as uuidv4 } from "uuid";

export const FetchJobsStart = id => ({
  type: FETCH_JOBS_START,
  payload: { id }
});

export const FetchJobsSuccess = (jobsDetails, id) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: { jobsDetails, id }
});

export const FetchJobsFailed = (err, id) => ({
  type: FETCH_JOBS_FAILED,
  payload: { err, id }
});

export const FetchJobs = function(description, full_time, location) {
  return function(dispatch) {
    const id = uuidv4();

    dispatch(FetchJobsStart(id));

    const search = `description=${description}&full_time=${full_time}&location=${location}`;

    fetch(
      `https://api.allorigins.win/get?url=https://jobs.github.com/positions.json?${search}`
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        let totalPage = Math.ceil(data.length / 5);
        let jobs = {};
        data.forEach(job => {
          jobs[job.id] = job;
        });
        let jobsDetails = {
          totalPage,
          jobs
        };
        dispatch(FetchJobsSuccess(jobsDetails, id));
      })
      .catch(err => {
        console.log(err);
        dispatch(FetchJobsFailed(err.message, id));
      });
  };
};

export const GetPageJobs = function(page) {
  return {
    type: FETCH_JOBS_PAGE,
    payload: { currentPage: page }
  };
};

export const UpdateLocation = function(location) {
  return {
    type: UPDATE_JOBS_LOCATION,
    payload: location
  };
};

export const UpdateFullTime = function(fulltime) {
  return {
    type: UPDATE_JOBS_FULLTIME,
    payload: fulltime
  };
};

export const UpdateDescription = function(description) {
  return {
    type: UPDATE_JOBS_DESCRIPTION,
    payload: description
  };
};
