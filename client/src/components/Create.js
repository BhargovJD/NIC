import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function Create() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [data, setData] = useState({});

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setData = {
      name: username,
      age: age,
      city: city,
      country: country,
    };
    await axios.post("http://localhost:5000/create", data).then((res) => {
      //   window.location.reload();
    });
  };

  useEffect(() => {
    onFormSubmit();
  }, [data]);

  console.log(username);

  return (
    <div>
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={username}
            type="email"
            placeholder=""
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder=""
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="email"
            placeholder=""
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="email"
            placeholder=""
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Primary
        </Button>
      </Form>
    </div>
  );
}

export default Create;
