import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetPageJobs } from "../actions/jobActions";

function Pagination() {
  const { totalPage, page } = useSelector(store => ({
    totalPage: store.jobs.totalPage,
    page: store.jobs.page
  }));
  const dispatch = useDispatch();

  const handlePrevPagination = e => {
    if (page > 1) {
      dispatch(GetPageJobs(page - 1));
    }
  };

  const handleNextPagination = e => {
    if (page < totalPage) {
      dispatch(GetPageJobs(page + 1));
    }
  };

  const handlePagination = e => {
    const page = parseInt(e.target.textContent);
    dispatch(GetPageJobs(page));
  };

  const pagelinks = () => {
    const dummylink = (
      <div key="dummylink" className="navigation dummylink">
        ...
      </div>
    );
    let links = new Array(totalPage).fill(0).map((d, i) => {
      return (
        <div
          key={i}
          className={`navigation ${page === i + 1 ? "active-page" : ""}`}
          onClick={handlePagination}
        >
          {i + 1}
        </div>
      );
    });
    const length = links.length;
    if (length > 5) {
      links = [
        links[0],
        links[1],
        dummylink,
        links[length - 2],
        links[length - 1]
      ];
    }
    return links;
  };

  return (
    <div className="jobs__pagination">
      {totalPage > 0 && (
        <>
          <div
            className={`navigation ${page === 1 ? "disabled-nav" : ""}`}
            onClick={handlePrevPagination}
          >
            <i className="material-icons">keyboard_arrow_left</i>
          </div>

          {!!totalPage && pagelinks()}

          <div
            className={`navigation ${page === totalPage ? "disabled-nav" : ""}`}
            onClick={handleNextPagination}
          >
            <i className="material-icons">keyboard_arrow_right</i>
          </div>
        </>
      )}
    </div>
  );
}

export default Pagination;
