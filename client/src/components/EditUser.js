import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useHistory } from "react-router-dom";

import UserDetails from "./UserDetails";

function EditUser({ currentUser }) {
  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:5000/users/${userId}`)
  //       .then((response) =>
  //         // console.log(response)
  //         setCurrentUser(response.data)
  //       )
  //       .catch((err) => {
  //         alert(err);
  //       });
  //   }, []);

  const [userimage, setUserImage] = useState(currentUser.url);
  const [name, setName] = useState(currentUser.name);
  const [gender, setGender] = useState(currentUser.gender);
  const [address, setAddress] = useState(currentUser.address);
  const [district, setDistrict] = useState(currentUser.district);
  const [email, setEmail] = useState(currentUser.email);

  let navigate = useNavigate();

  const [id, setId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([]);

  const getId = (id) => {
    setId(id);
  };

  let { userId } = useParams();

  console.log("CurrentUser", currentUser.name);

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

  const addUser = async (e) => {
    e.preventDefault();
    // const data = {
    //   name: name,
    //   age: age,
    // };
    await axios
      .post("http://localhost:5000/insert", {
        userimage: userimage,
        name: name,
        gender: gender,
        address: address,
        district: district,
        email: email,
      })
      .then((res) => {
        // alert("User Created.");
        setUsers([
          ...users,
          {
            userimage: userimage,
            name: name,
            gender: gender,
            address: address,
            district: district,
            email: email,
          },
        ]);
      })
      .catch((err) => {
        // alert(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/read")
      .then((response) =>
        // console.log(response)
        setUsers(response.data)
      )
      .catch((err) => {
        alert(err);
      });
  }, []);

  console.log("users", users);

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

  const editUser = async (e) => {
    e.preventDefault();
    const data = {
      userimage: userimage,
      name: name,
      gender: gender,
      address: address,
      district: district,
      email: email,
      id: userId,
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
        toast.success("User edited successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        // alert(err);
      });
    navigate("/");
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    const data = {
      id: userId,
    };

    await axios
      .post("http://localhost:5000/delete", data)
      .then((res) => {
        // alert("User Created.");
        setUsers(
          users.filter((user) => {
            return user._id !== userId;
          })
        );
        toast.success("User deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        // alert(err);
      });
    navigate("/");
  };

  return (
    <div className="App">
      <div class="container">
        <h2 className="mt-2">Edit Registered User</h2>
        <div class="row">
          <div class="col">
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
                  placeholder="address..."
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
                  placeholder="email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="modal-footer">
                <div class="hstack gap-3">
                  <div class="">
                    <button
                      onClick={editUser}
                      type="submit"
                      class="btn btn-warning btn-md"
                    >
                      Edit
                    </button>
                  </div>
                  <div class="vr"></div>

                  <div class="">
                    {" "}
                    <button
                      onClick={deleteUser}
                      type="submit"
                      class="btn btn-danger btn-md"
                    >
                      Delete
                    </button>
                  </div>
                  <div class="vr"></div>

                  <div class="bg-light border">
                    <button
                      onClick={() => navigate("/")}
                      type="submit"
                      class="btn btn-primary btn-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
