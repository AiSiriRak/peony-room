import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-dvh flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center h-full">
        <Button
          fullRound={true}
          onClick={() => navigate("/invitation/ffffffffffffffff")}
          hideShadow={true}
        >
          home
        </Button>
        <p> to invivitaion</p>
      </div>
    </div>
  );
}

export default Home;
