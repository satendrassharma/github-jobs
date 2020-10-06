import React from "react";

function filter({
  fulltime,
  location,
  handleLocation,
  handleLocationCheckbox,
  handleFullTime
}) {
  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="main__filter">
      <form action="#" onSubmit={onSubmit}>
        <div className="form-control fulltime">
          <input
            type="checkbox"
            name="fulltime"
            id="fulltime"
            checked={fulltime}
            onChange={handleFullTime}
          />
          <span>Full Time</span>
        </div>

        <div className="locationinput">
          <label htmlFor="location" className="bold__text">
            Location
          </label>

          <div className="location__inputwrapper">
            <i className="material-icons">public</i>
            <input
              type="text"
              name="location"
              id="location"
              placeholder=" City, state, zip code or country "
              value={location}
              onChange={handleLocation}
            />
          </div>
        </div>
        <div className="form-control">
          <input
            type="checkbox"
            name="location"
            id="london"
            checked={location === "london"}
            onChange={handleLocationCheckbox}
          />
          <span>London</span>
        </div>
        <div className="form-control">
          <input
            type="checkbox"
            name="location"
            id="amsterdom"
            checked={location === "amsterdom"}
            onChange={handleLocationCheckbox}
          />
          <span>Amsterdom</span>
        </div>
        <div className="form-control">
          <input
            type="checkbox"
            name="location"
            id="newyork"
            checked={location === "newyork"}
            onChange={handleLocationCheckbox}
          />
          <span>New York</span>
        </div>
        <div className="form-control">
          <input
            type="checkbox"
            name="location"
            id="berlin"
            checked={location === "berlin"}
            onChange={handleLocationCheckbox}
          />
          <span>Berlin</span>
        </div>
      </form>
    </div>
  );
}

export default filter;
