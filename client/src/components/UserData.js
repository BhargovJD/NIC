import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";

function UserData() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/get").then((res) => setData(res.data));
  }, []);

  return (
    <div className="App">
      <div>
        <ListGroup>
          {data.map((value) => (
            <ListGroup.Item>{value.name}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default UserData;
