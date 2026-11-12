import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { respondInvitation } from "../features/invitations";

function Invitation() {
  const navigate = useNavigate();
  const { invitationId } = useParams();

  const [currentStatus, setCurrentStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDecision = async (decisionStatus) => {
    setIsSubmitting(true);
    try {
      const data = await respondInvitation(invitationId, decisionStatus);

      if (!data) return;

      setCurrentStatus(decisionStatus);
    } catch (error) {
      console.error(
        "Error respond invitation:",
        error.response?.data || error.message,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-dvh flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center h-full gap-5">
        <Button
          fullRound={true}
          onClick={() => navigate("/")}
          hideShadow={true}
        >
          to home
        </Button>
        {!currentStatus ? (
          <div>
            <p className="text-center">
              You have an invitation! {invitationId}
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                fullRound={true}
                onClick={() => handleDecision("accepted")}
                hideShadow={true}
                disabled={isSubmitting}
              >
                accept
              </Button>
              <Button
                fullRound={true}
                onClick={() => handleDecision("declined")}
                hideShadow={true}
                disabled={isSubmitting}
              >
                decline
              </Button>
            </div>
          </div>
        ) : currentStatus === "accepted" ? (
          <div>
            <p>Invitation accepted! {invitationId}</p>
            <Button
              fullRound={true}
              onClick={() => navigate("/")}
              hideShadow={true}
            >
              to co-working space details
            </Button>
          </div>
        ) : (
          <p>Invitation declined {invitationId}</p>
        )}
      </div>
    </div>
  );
}

export default Invitation;
