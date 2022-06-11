import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserDetails from "./UserDetails";
import SearchPage from "./SearchPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home({ setCurrentUser }) {
  const [userimage, setUserImage] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("Select");
  const [email, setEmail] = useState("");

  const [id, setId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([]);

  const getId = (id) => {
    setId(id);
  };

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
    if (
      name === "" ||
      gender === "" ||
      addUser === "" ||
      district === "" ||
      email == ""
    ) {
      return toast.error("All fields are required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (userimage === "") {
      return toast.error("Please upload user photo", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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

        toast.success("User registered successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setName("");
        setGender("");
        setAddress("");
        setDistrict("Select");
        setEmail("");
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

  return (
    <div className="App">
      <div class="container">
        <h2 className="mt-2">User Registration System</h2>

        <div class="row">
          <div class="col-8">
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
              <div class="d-flex">
                <button
                  onClick={addUser}
                  type="submit"
                  class="btn btn-success btn-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div class="col-4">
            <label
              for="exampleFormControlInput1"
              className="form-label fw-bolder"
            >
              Frontend Search
            </label>
            <form class="d-flex" role="search">
              <input
                class="form-control mb-2"
                type="search"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name"
                aria-label="Search"
              />
            </form>
            <ul
              class="list-group"
              style={{
                height: "500px",
                // width: "200px",
                overflowY: "scroll",
              }}
            >
              {users.length == 0 ? "Empty" : ""}

              {users
                .filter((user) => {
                  if (searchTerm == "") {
                    return user;
                  } else if (
                    user.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return user;
                  }
                })
                .reverse()
                .map((user) => {
                  return (
                    <li class="list-group-item">
                      <div class="d-flex justify-content-between">
                        <div class="hstack gap-3">
                          <div class=" ">
                            <img
                              style={{ objectFit: "cover" }}
                              src={user.userimage}
                              class="rounded-circle"
                              alt="Cinque Terre"
                              width="60"
                              height="60"
                            />
                          </div>
                          <div class=" ">
                            <p class="fw-semibold"> {user.name}</p>
                          </div>
                        </div>

                        <div>
                          {" "}
                          <Link to={`/users/${user._id}`}>
                            {" "}
                            <button
                              type="button"
                              onClick={() => setCurrentUser(user)}
                              class="btn btn-primary btn-sm"
                              // data-bs-toggle="modal"
                              // data-bs-target="#exampleModal"
                            >
                              View user
                            </button>
                          </Link>
                        </div>
                      </div>

                      {/* <UserDetails
                        id={id}
                        setUsers={setUsers}
                        users={users}
                        user={user}
                      /> */}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>

      {/* Search Table */}
      <SearchPage />
      <ToastContainer />
    </div>
  );
}

export default Home;
