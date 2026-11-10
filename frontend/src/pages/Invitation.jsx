import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/Button";

function Invitation() {
  const navigate = useNavigate();
  const { invitationId } = useParams();
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
        <p> invitation {invitationId}</p>
      </div>
    </div>
  );
}

export default Invitation;
