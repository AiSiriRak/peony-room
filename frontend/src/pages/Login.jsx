import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { login, register } from "../features/auth";

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("Ai");
  const [telephoneNumber, setTelephoneNumber] = useState("000-000-0000");
  const [email, setEmail] = useState("ai@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [role, setRole] = useState("user");

  return (
    <div className="w-screen h-dvh flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center h-full gap-5">
        <p> login page </p>
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
        <Button
          fullRound={true}
          onClick={async () => {
            try {
              await login(email, password);
              navigate("/");
            } catch (error) {
              console.error("Error login:", error);
            }
          }}
          hideShadow={true}
        >
          login
        </Button>
        <Button
          fullRound={true}
          onClick={async () => {
            try {
              await register(name, telephoneNumber, email, password, role);
            } catch (error) {
              console.error("Error register:", error);
            }
          }}
          hideShadow={true}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default Login;
