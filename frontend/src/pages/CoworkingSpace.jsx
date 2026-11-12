import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/Button";

function CoworkingSpace() {
  const navigate = useNavigate();
  const { coworkingspaceId } = useParams();

  return (
    <div className="w-screen h-dvh flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center h-full">
        <Button
          fullRound={true}
          onClick={() => navigate("/")}
          hideShadow={true}
        >
          to home
        </Button>
        <p> Coworking space {coworkingspaceId}</p>
      </div>
    </div>
  );
}

export default CoworkingSpace;
