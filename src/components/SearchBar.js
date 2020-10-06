import React, { useState } from "react";

function SearchBar({ onSearch, description }) {
  const [text, setText] = useState(description);

  const handleText = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    onSearch(text);
  };

  return (
    <div className="searchbar">
      <form action="#" onSubmit={onSubmit}>
        <div className="input-wrapper">
          <i className="material-icons">work_outline</i>
          <input
            type="text"
            placeholder=" Title, companies, expertise or benefits "
            id="jobquery"
            value={text}
            onChange={handleText}
          />
          <input type="submit" name="search" id="search" value="Search" />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
