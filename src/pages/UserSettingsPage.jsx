import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import Button from "@mui/material/Button";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function UserSettings() {
  const storedToken = localStorage.getItem("authToken");
  const [userInfo, setUserInfo] = useState({});
  const { isLoggedIn } = useContext(AuthContext);
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
          setUserInfo(response.data);
          return userInfo;
        })
    )
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, address } = userInfo;
    const storedToken = localStorage.getItem("authToken");
    axios.put(
      `${API_URL}/user`,
      { firstName, lastName, address },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
  };

  return (
    <>
      <h2>User informations :</h2>
      <p>
        Hello {userInfo.firstName + " " + userInfo.lastName && userInfo.email}
      </p>
      <p>
        You can add of modify certain informations here. Here are the fields :
      </p>
      <form onSubmit={handleSubmit}>
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
            value={userInfo.lastName || ""}
            onChange={(e) =>
              setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
            }
          />
        </label>
        <p>Address :</p>
        <label>
          Number :
          <input type="number" value={userInfo.address?.number || ""}
            onChange={(e) => {
              const copyOfUserInfo = { ...userInfo };
              copyOfUserInfo.address.number = e.target.value;
              setUserInfo(copyOfUserInfo);
            }}
           />
        </label>
        <label>
          street :
          <input
            type="text"
            value={
              ("address" in userInfo &&
                "street" in userInfo.address &&
                userInfo.address.street) ||
              ""
            }
            onChange={(e) => {
              const copyOfUserInfo = { ...userInfo };
              copyOfUserInfo.address.street = e.target.value;
              setUserInfo(copyOfUserInfo);
            }}
          />
        </label>
        <label>
          zipcode :
          <input
            type="text"
            value={
              ("address" in userInfo &&
                "zipcode" in userInfo.address &&
                userInfo.address.zipcode) ||
              ""
            }
            onChange={(e) => {
              const copyOfUserInfo = { ...userInfo };
              copyOfUserInfo.address.zipcode = e.target.value;
              setUserInfo(copyOfUserInfo);
            }}
          />
        </label>
        <label>
          city :
          <input
            type="text"
            value={
              ("address" in userInfo &&
                "city" in userInfo.address &&
                userInfo.address.city) ||
              ""
            }
            onChange={(e) => {
              const copyOfUserInfo = { ...userInfo };
              copyOfUserInfo.address.city = e.target.value;
              setUserInfo(copyOfUserInfo);
            }}
          />
        </label>
        <label>
          country :
          <input
            type="text"
            value={
              ("address" in userInfo &&
                "country" in userInfo.address &&
                userInfo.address.country) ||
              ""
            }
            onChange={(e) => {
              const copyOfUserInfo = { ...userInfo };
              copyOfUserInfo.address.country = e.target.value;
              setUserInfo(copyOfUserInfo);
            }}
          />
        </label>

        <Button type="submit" variant="outlined">Apply changes</Button>
      </form>
    </>
  );
}

export default UserSettings;
