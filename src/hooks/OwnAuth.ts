import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(["PHPSESSID"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (cookies.PHPSESSID) {      
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies.PHPSESSID]);

  const login = async (email: string, password: string) => {
    const postData = {
      email: email,
      password: password,
    }

    const response = await fetch(`/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    console.log(response);

    const data = await response.json();

    if (response.status === 200 && data.success) {    
      setIsLoggedIn(true);
    }

    return data;
  };

  const signUp = async (name: string, email: string, password: string) => {
    const postData = {
      username: name,
      email: email,
      password: password,
    }

    const response = await fetch(`/api/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (response.status === 200 && data.success) {
      setIsLoggedIn(true);
    }
  }

  const logout = () => {
    removeCookie("PHPSESSID");
    setIsLoggedIn(false);
    if(window.location.pathname !== "/") navigate("/");
    else window.location.reload();
  };

  return { isLoggedIn, login, signUp, logout };
}

