import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

import Input from "../components/Input";

function Login() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

  const [logInEmail, setLogInEmail] = useState<string>("");
  const [logInPassword, setLogInPassword] = useState<string>("");
  const [isLogInFormFilled, setIsLogInFormFilled] = useState<boolean>(false);

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    if (password !== confirmPassword) {
      return;
    }
    formdata.append("password", password);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/register.php`,
      {
        method: "POST",
        body: formdata,
      }
    );

    const data = await response.json();
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("email", logInEmail);
    formdata.append("password", logInPassword);

    const response = await fetch(`/api/auth/login.php`, {
      method: "POST",
      body: formdata,
    });

    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    setIsValidPassword(password.length >= 8);
  }, [password]);

  useEffect(() => {
    setIsFormFilled(
      name.length > 0 &&
        email.length > 0 &&
        isValidPassword &&
        password === confirmPassword
    );
  }, [name, email, isValidPassword, password, confirmPassword]);

  useEffect(() => {
    setIsLogInFormFilled(logInEmail.length > 0 && logInPassword.length > 0);
  }, [logInEmail, logInPassword]);

  let currentlyActive = "signup";
  const loginRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switchLoginSignup();
  }, []);

  const switchLoginSignup = () => {
    if (loginRef.current && signUpRef.current && currentlyActive === "signup") {
      loginRef.current.style.backgroundImage = "";
      signUpRef.current.style.backgroundImage =
        "url(https://picsum.photos/seed/hello/900)";
      currentlyActive = "login";

      signUpRef.current.children[1].classList.add("hidden");
      loginRef.current.children[1].classList.remove("hidden");
    } else if (
      loginRef.current &&
      signUpRef.current &&
      currentlyActive === "login"
    ) {
      loginRef.current.style.backgroundImage =
        "url(https://picsum.photos/seed/hello/900)";
      signUpRef.current.style.backgroundImage = "";
      currentlyActive = "signup";

      signUpRef.current.children[1].classList.remove("hidden");
      loginRef.current.children[1].classList.add("hidden");
    }

    console.log(currentlyActive);
  };

  return (
    <div className="relative h-[calc(100vh-96px)]">
      <div className="login-card shadow-xl flex h-1/2 w-2/3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          ref={loginRef}
          className="w-1/2 p-6 bg-cover bg-center"
          style={{
            backgroundImage: "url(https://picsum.photos/seed/hello/900)",
          }}
          onClick={() => {
            if (currentlyActive === "signup") {
              switchLoginSignup();
            }
          }}
        >
          <h2 className="text-3xl mb-4">Login</h2>
          <form onSubmit={login}>
            <Input
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="m.mustermann@students.htl-leonding.ac.at"
              onChange={(e) => setLogInEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={(e) => setLogInPassword(e.target.value)}
            />

            <Input
              type="submit"
              label="Login"
              name="submit"
              id="submit"
              disabled={!isLogInFormFilled}
            />
          </form>
        </div>
        <div
          ref={signUpRef}
          className="w-1/2 p-6 bg-cover bg-center"
          onClick={() => {
            if (currentlyActive === "login") {
              switchLoginSignup();
            }
          }}
        >
          <h2 className="text-3xl mb-4">Sign Up</h2>
          <form onSubmit={signUp}>
            <Input
              label="Name"
              type="text"
              name="name"
              id="name"
              placeholder="Max Mustermann"
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="m.mustermann@students.htl-leonding.ac.at"
              onChange={(e) => setEmail(e.target.value)}
            />

            {!isValidPassword && (
              <p className="text-red-500">Password is not valid</p>
            )}
            <Input
              label="Password"
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />

            {password !== confirmPassword && (
              <p className="text-red-500">Passwords do not match</p>
            )}
            <Input
              label="Confirm Password"
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Input
              label="Submit"
              type="submit"
              name="submit"
              id="submit"
              disabled={!isFormFilled}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
