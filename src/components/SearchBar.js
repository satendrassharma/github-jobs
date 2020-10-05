import React from "react";

function SearchBar({ description, handledescription, onSearch }) {
  return (
    <div className="searchbar">
      <form action="#" onSubmit={onSearch}>
        <div className="input-wrapper">
          <i className="material-icons">work_outline</i>
          <input
            type="text"
            placeholder=" Title, companies, expertise or benefits "
            id="jobquery"
            value={description}
            onChange={handledescription}
          />
          <input type="submit" name="search" id="search" value="Search" />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
