import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { login } from "../features/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorText, setErrorText] = useState("");

  const handleLogin = async () => {
    setErrorText("");
    if (email === "" || password === "") {
      setErrorText("Please insert email and password");
    } else
      try {
        await login(email, password);
        navigate("/");
      } catch (error) {
        console.error("Error login:", error);
        setErrorText(
          error?.response?.data?.message || error?.message || "Login failed",
        );
      }
  };

  return (
    <div className="w-screen h-dvh flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center h-full gap-5">
        <p className="text-h1 font-semibold"> Login to Peony room </p>
        <TextInput
          value={email}
          onChange={setEmail}
          placeholder="email"
          className="w-80"
        />
        <TextInput
          value={password}
          onChange={setPassword}
          placeholder="password"
          className="w-80"
        />
        {errorText != "" && <p className="text-red">{errorText}</p>}
        <Button fullRound={true} onClick={handleLogin} hideShadow={true}>
          login
        </Button>
      </div>
    </div>
  );
}

export default Login;
