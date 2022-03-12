import React from "react";

export default function LocalSearch({ keyword, setKeyword }) {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    // <div className="container pt-4 pb-4">
    <input
      type="search"
      placeholder="Filter categories"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
    // </div>
  );
}
