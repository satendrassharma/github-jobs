import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import JobList from "./JobList";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { FetchJobs } from "../actions/jobActions";
import Loading from "./Loading";
import Error from "./Error";

function Home() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fulltime, setFulltime] = useState(false);

  const { status } = useSelector(({ jobs: { status, error } }) => ({
    status
  }));

  const searchJobs = (description, fulltime, location) =>
    dispatch(FetchJobs(description, fulltime, location));

  const handleFullTime = e => {
    setFulltime(e.target.checked);
  };

  const handleLocation = e => {
    setLocation(e.target.value);
  };

  const handleLocationCheckbox = e => {
    setLocation(e.target.id);
  };

  const handledescription = e => {
    setDescription(e.target.value);
  };

  const onSearch = e => {
    e.preventDefault();
    searchJobs(description, fulltime, location);
  };

  const debounceSearchJobs = useCallback(
    debounce(
      (description, fulltime, location) =>
        searchJobs(description, fulltime, location),
      1000
    ),
    []
  );

  useEffect(() => {
    debounceSearchJobs(description, fulltime, location);
  }, [location, fulltime, debounceSearchJobs]);

  return (
    <>
      <header className="container">
        <div className="header">
          <strong>Github</strong> Jobs
        </div>
        <SearchBar
          description={description}
          handledescription={handledescription}
          onSearch={onSearch}
        />
      </header>
      <main className="container main">
        <Filter
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
