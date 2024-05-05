import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  console.log("user: ", user);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    fetch("http://localhost:3001/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
          //   window.location.href = '/';
        } else {
          throw new Error("Failed to log out");
        }
      })
      .then((data) => {
        setUser(null);
        console.log(data);
      })
      .catch((err) => console.error("Fetch error: ", err));
  };
  // check login status to ensure logged in after refreshing page
  const fetchUserStatus = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/status", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.data) {
        console.log("Get user id and role: ", data.data);
        const userId = data.data.id;
        await fetchUserInfo(userId);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.err("Failed to fetch user status: ", err);
    }
  };

  const fetchUserInfo = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.data) {
        setUser((prevState) => ({
          ...prevState,
          _id: userId,
          ...data.data,
        }));
        console.log("Get user profile: ", data.data);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.err("Failed to fetch user information: ", err);
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
