import React, { useState, useEffect } from "react";
import axios from "axios";

function UserDetails({ id, setUsers, users, user }) {
  const [userimage, setUserImage] = useState("");
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("Select");
  const [email, setEmail] = useState("");

  console.log("user", user);

  //   const [users, setUsers] = useState([]);

  const uploadImage = (files) => {
    // console.log(files[0]);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "ffe4o5of");

    axios
      .post("https://api.cloudinary.com/v1_1/dmq6h2h7y/image/upload", formData)
      .then((response) => {
        console.log(response.data.url);
        setUserImage(response.data.url);
        console.log("setUserImage", userimage);
      });
  };

  const editUser = async (e) => {
    e.preventDefault();
    const data = {
      userimage: userimage,
      name: name,
      gender: gender,
      address: address,
      district: district,
      email: email,
      id: id,
    };

    await axios
      .put("http://localhost:5000/update", data)
      .then((res) => {
        // alert("User Created.");
        setUsers(
          users.map((user) => {
            return user._id == id
              ? {
                  _id: id,
                  userimage: userimage,
                  name: name,
                  gender: gender,
                  address: address,
                  district: district,
                  email: email,
                }
              : user;
          })
        );
      })
      .catch((err) => {
        // alert(err);
      });
  };

  //   delete
  const deleteUser = async (e) => {
    e.preventDefault();
    const data = {
      id: id,
    };

    await axios
      .post("http://localhost:5000/delete", data)
      .then((res) => {
        // alert("User Created.");
        setUsers(
          users.filter((user) => {
            return user._id !== id;
          })
        );
      })
      .catch((err) => {
        // alert(err);
      });
  };

  //   useEffect(() => {}, []);
  const districts = [
    {
      id: "1",
      name: "Kamrup",
    },
    {
      id: "2",
      name: "Sonitpur",
    },
    {
      id: "3",
      name: "Nogaon",
    },
    {
      id: "4",
      name: "Dhemaji",
    },
  ];

  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <h1>Hello, world!</h1>

              <div class="row">
                <div class="col">
                  {("ID", id)}
                  <form>
                    {/* image */}
                    <div class=" mb-3">
                      <div class="d-flex">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label fw-bolder"
                        >
                          Upload user photo
                        </label>
                      </div>
                      <input
                        onChange={(e) => {
                          uploadImage(e.target.files);
                        }}
                        type="file"
                        class="form-control"
                        id="inputGroupFile02"
                      />
                      {/* <label class="input-group-text" for="inputGroupFile02">
                  Upload user photo
                </label> */}
                    </div>
                    <div class="mb-3">
                      <div class="d-flex">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label fw-bolder"
                        >
                          Name
                        </label>
                      </div>

                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    {/* <div class="mb-3">
                <div class="d-flex">
                  <label for="exampleFormControlInput1" className="form-label">
                    Gender
                  </label>
                </div>

                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="age..."
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div> */}

                    <div class="mb-3">
                      <div class="d-flex">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label fw-bolder"
                        >
                          Gender
                        </label>
                      </div>

                      <div
                        class="btn-group btn-group-md"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="btnradio1"
                          autocomplete="off"
                        />
                        <label
                          onClick={() => setGender("Male")}
                          class="btn btn-outline-primary"
                          for="btnradio1"
                        >
                          Male
                        </label>

                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="btnradio2"
                          autocomplete="off"
                        />
                        <label
                          onClick={() => setGender("Female")}
                          class="btn btn-outline-primary"
                          for="btnradio2"
                        >
                          Female
                        </label>

                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="btnradio3"
                          autocomplete="off"
                        />
                        <label
                          onClick={() => setGender("Other")}
                          class="btn btn-outline-primary"
                          for="btnradio3"
                        >
                          Other
                        </label>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="d-flex">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label fw-bolder"
                        >
                          Address
                        </label>
                      </div>

                      <textarea
                        rows="3"
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="username..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div class="mb-3">
                      <div class="d-flex">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label fw-bolder"
                        >
                          District
                        </label>
                      </div>

                      {/* <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="username..."
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                /> */}
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-outline-primary dropdown-toggle btn-md"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {district}
                        </button>
                        <ul class="dropdown-menu">
                          {districts.map((item) => {
                            return (
                              <li>
                                <a
                                  onClick={() => setDistrict(item.name)}
                                  class="dropdown-item"
                                  href="#"
                                >
                                  {item.name}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="d-flex">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label fw-bolder"
                        >
                          Email
                        </label>
                      </div>

                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="username..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              onClick={editUser}
              type="submit"
              class="btn btn-warning btn-sm"
            >
              Edit
            </button>
            <button
              onClick={deleteUser}
              type="submit"
              class="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
