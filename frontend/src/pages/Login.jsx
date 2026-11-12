import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { useState } from "react";
import { TextInput } from "../components/TextInput";
import { login } from "../features/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("ai@gmail.com");
  const [password, setPassword] = useState("123456789");

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
              navigate(`/`);
            } catch (error) {
              console.error("Error login:", error);
            }
          }}
          hideShadow={true}
        >
          login
        </Button>
      </div>
    </div>
  );
}

export default Login;
