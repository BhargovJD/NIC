import React, { useState } from "react";

const SearchTable = ({ data }) => {
  return (
    <table class="table">
      <tbody>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Address</th>
          <th>District</th>
          <th>Email</th>
        </tr>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.gender}</td>
            <td>{item.address}</td>
            <td>{item.district}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchTable;
