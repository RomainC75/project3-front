import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

const API_URL = "http://localhost:5005";

function UserSettings() {
  const storedToken = localStorage.getItem("authToken");
  const [userInfo, setUserInfo] = useState({});

  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  useEffect(() => {
    (
      isLoggedIn &&
      axios
        .get(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          console.log("RES", response.data);
          if (!response.data.address) response.data.address = {city:'', country:'', number:'', zipcode:'', street:''}
          setUserInfo(response.data);
          // console.log(response.data);
          return userInfo;
        })
    )
      .then(console.log(userInfo))
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    console.log(e.target);
    const { firstName, lastName, zipcode, street, number, city, country, imageUrl } = userInfo;
    fd.append("firstName", firstName);
    fd.append("lastName", lastName);
    fd.append("imageUrl", imageUrl);
    fd.append("zipcode", zipcode);
    fd.append("street", street);
    fd.append("number", number);
    fd.append("city", city);
    fd.append("country", country);

    for (let pair of fd.entries()) {
      console.log(pair[0], pair[1])
    }

    const storedToken = localStorage.getItem("authToken");
    axios
      .put(`${API_URL}/user`, fd, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("chien");
          document.getElementsByClassName("submission").innerHTML = (
            <p>Successfully modified</p>
          );
        }
      });
  };

  if (!Object.keys(userInfo).length) return <div>Loading</div>;
  return (
    <>
      <h2>User informations :</h2>
      <p>
        Hello {userInfo.firstName + " " + userInfo.lastName && userInfo.email}
      </p>
      <p>
        You can add of modify certain informations here. Here are the fields :
      </p>
      <form className="submission" onSubmit={handleSubmit}>
        <label>
          First Name :
          <input
            type="text"
            name="firstName"
            value={userInfo.firstName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
            }
          />
        </label>
        <label>
          Last Name :
          <input
            type="text"
            name="lastName"
            value={userInfo.lastName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
            }
          />
        </label>
        <p>Address :</p>
        <label>
          Number :
          <input
            type="number"
            value={userInfo.address?.number}
            onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })}
          />
        </label>
        <label>
          street :
          <input
            type="text"
            value={userInfo.address?.street}
            onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })}
          />
        </label>
        <label>
          zipcode :
          <input
            type="text"
            value={userInfo.address?.zipcode}
            onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })}
          />
        </label>
        <label>
          city :
          <input
            type="text"
            value={userInfo.address?.city}
            onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })}
          />
        </label>
        <label>
          country :
          <input
            type="text"
            value={userInfo.address?.country}
            onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })}
          />
        </label>

        <input
          type="file"
          name="avatar-image"
          onChange={(e) => {
            const copyOfUserInfo = { ...userInfo };
            copyOfUserInfo.imageUrl = e.target.files[0];
            setUserInfo(copyOfUserInfo);
          }}
        />

        <Button type="submit" variant="outlined">
          Apply changes
        </Button>
      </form>
    </>
  );
}

export default UserSettings;
