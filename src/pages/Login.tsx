import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import { useAuth } from "../hooks/OwnAuth";
import { useNavigate } from "react-router-dom";

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

  const { login, signUp, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    await signUp(name, email, password);
    window.location.href = "/";
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await login(logInEmail, logInPassword);

    if (data.success) {
      window.location.href = "/";
    }
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
        {!isLoggedIn && (
          <>
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
              <form onSubmit={handleLogin}>
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
              <form onSubmit={handleSignUp}>
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
          </>
        )}

        {isLoggedIn && (
          <div className="w-full p-6 bg-cover bg-center">
            <h2 className="text-3xl mb-4">You are logged in</h2>
            <button
              onClick={logout}
              className="
              bg-red-500
              hover:bg-red-700
              text-white
              font-bold
              py-2
              px-4
              rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Login;
