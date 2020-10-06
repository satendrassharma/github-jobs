import React, { useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import JobList from "./JobList";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchJobs,
  UpdateDescription,
  UpdateFullTime,
  UpdateLocation
} from "../actions/jobActions";
import Loading from "./Loading";
import Error from "./Error";
import { useLocation } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  // const [description, setDescription] = useState("");
  // const [location, setLocation] = useState("");
  // const [fulltime, setFulltime] = useState(false);

  const { status, location, fulltime, description } = useSelector(
    ({ jobs: { status, location, fulltime, description } }) => ({
      status,
      location,
      fulltime,
      description
    })
  );

  console.log({ status, location, fulltime, description });

  const searchJobs = (description, fulltime, location) =>
    dispatch(FetchJobs(description, fulltime, location));

  const debounceSearchJobs = useCallback(
    debounce(
      (description, fulltime, location) =>
        searchJobs(description, fulltime, location),
      1000
    ),
    []
  );

  useEffect(() => {
    if (state && state.fromJobDetails) {
      console.log("back from job details page");
    } else {
      debounceSearchJobs("", false, "");
    }
    return () => {};
  }, [debounceSearchJobs, state]);

  const handleFullTime = e => {
    const fulltime = e.target.checked;
    debounceSearchJobs(description, fulltime, location);
    // setFulltime(fulltime);
    dispatch(UpdateFullTime(fulltime));
  };

  const handleLocation = e => {
    const location = e.target.value;
    debounceSearchJobs(description, fulltime, location);
    // setLocation(location);
    dispatch(UpdateLocation(location));
  };

  const handleLocationCheckbox = e => {
    const location = e.target.id;
    debounceSearchJobs(description, fulltime, location);
    // setLocation(location);
    dispatch(UpdateLocation(location));
  };

  const onSearch = description => {
    debounceSearchJobs(description, fulltime, location);
    // setDescription(description);
    dispatch(UpdateDescription(description));
  };

  return (
    <>
      <header className="container">
        <div className="header">
          <strong>Github</strong> Jobs
        </div>
        <SearchBar onSearch={onSearch} description={description} />
      </header>
      <main className="container main">
        <Filter
          fulltime={fulltime}
          location={location}
          handleLocation={handleLocation}
          handleLocationCheckbox={handleLocationCheckbox}
          handleFullTime={handleFullTime}
        />
        <div className="main__jobs">
          {status === "loading" && <Loading />}
          {status === "failed" && <Error />}
          {status === "success" && <JobList />}
          <Pagination />
        </div>
      </main>
    </>
  );
}

export default Home;
