import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";
function PutUserInfo() {
  const storedToken = localStorage.getItem("authToken");
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
  axios.put(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
    data: {},
  });
 })
}

function UserSettings({ number, street, zipcode, city, country }) {
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
            setUserInfo(response.data);
            console.log(response.data);
          return userInfo;
        })
    )
      .then(console.log(userInfo))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <h2>User informations :</h2>
      <p>{userInfo.email}</p>
      <label>First Name : </label>
      <p>Address :</p>
      <p>
        Number : 
      <input type="text" value={"address" in userInfo &&
          "number" in userInfo.address &&
          userInfo.address.number || ""} />
      </p>
      <p>
        street : 
      <input type="text" value={"address" in userInfo &&
          "street" in userInfo.address &&
          userInfo.address.street || ""} />
      </p>
      <p>
        zipcode : 
      <input type="text" value={"address" in userInfo &&
          "zipcode" in userInfo.address &&
          userInfo.address.zipcode || ""} />
      </p>
      <p>
        city : 
      <input type="text" value={"address" in userInfo &&
          "city" in userInfo.address &&
          userInfo.address.city || ""} />
      </p>
      <p>
        country : 
      <input type="text" value={"address" in userInfo &&
          "country" in userInfo.address &&
          userInfo.address.country || ""} />
      </p>
    </>
  );
}

export default UserSettings;
