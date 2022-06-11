import React, { useEffect, useState } from "react";
import SearchTable from "./SearchTable";
import axios from "axios";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/search?q=${query}`);
      setData(res.data);
    };
    fetchData();
  }, [query]);

  console.log("Search", data);
  return (
    <div>
      <div class="container mt-2">
        <hr />
        <label for="exampleFormControlInput1" className="form-label fw-bolder">
          Backtend Search
        </label>
        <div class="row">
          <div className="col-4"></div>
          <div class="col-4">
            <form class="d-flex" role="search">
              <input
                onChange={(e) => setQuery(e.target.value)}
                class="form-control me-2"
                type="search"
                placeholder="Search by name/email/address/district/gender"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="col-4"></div>
          <div className="row"> {<SearchTable data={data} />}</div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
