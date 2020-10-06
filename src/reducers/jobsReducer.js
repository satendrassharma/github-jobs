import {
  FETCH_JOBS_FAILED,
  FETCH_JOBS_START,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_PAGE,
  UPDATE_JOBS_LOCATION,
  UPDATE_JOBS_FULLTIME,
  UPDATE_JOBS_DESCRIPTION
} from "../actions/types";

const initialState = {
  entities: {},
  status: "idle",
  error: null,
  totalPage: 0,
  page: 0,
  viewData: {},
  id: null,
  location: "",
  fulltime: false,
  description: ""
};

const getPage = (data, page) => {
  let new_data = Object.entries(data);
  const start = (page - 1) * 5;
  const end = 5 * page;
  console.log({ start, end });
  new_data = new_data.slice(start, end);
  let result = {};

  for (let n in new_data) {
    result[new_data[n][0]] = new_data[n][1];
  }

  return result;
};

export default function jobsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS_START:
      return {
        ...state,
        status: "loading",
        error: null,
        totalPage: 0,
        page: 0,
        viewData: {},
        id: action.payload.id
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        entities: action.payload.jobsDetails.jobs,
        status: "success",
        error: null,
        totalPage: action.payload.jobsDetails.totalPage,
        page: 1,
        viewData: getPage(action.payload.jobsDetails.jobs, 1),
        id: null
      };
    case FETCH_JOBS_FAILED:
      return {
        ...state,
        status: "failed",
        error: action.payload.err,
        id: null
      };
    case FETCH_JOBS_PAGE:
      return {
        ...state,
        page: action.payload.currentPage,
        viewData: getPage(state.entities, action.payload.currentPage)
      };

    case UPDATE_JOBS_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case UPDATE_JOBS_FULLTIME:
      return {
        ...state,
        fulltime: action.payload
      };
    case UPDATE_JOBS_DESCRIPTION:
      return {
        ...state,
        description: action.payload
      };
    default:
      return state;
  }
}
