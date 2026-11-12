import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Button } from "../components/Button";
import { respondInvitation } from "../features/invitations";
import { useEffect, useState } from "react";

function Invitation() {
  const navigate = useNavigate();
  const { invitationId } = useParams();
  const [searchParams] = useSearchParams();
  const statusFromUrl = searchParams.get("status");

  const storageKey = `invitation_responded_${invitationId}`;
  const [currentStatus, setCurrentStatus] = useState(
    () => sessionStorage.getItem(storageKey) || statusFromUrl,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDecision = async (decisionStatus) => {
    if (isSubmitting || sessionStorage.getItem(storageKey)) return;

    try {
      setIsSubmitting(true);
      sessionStorage.setItem(storageKey, decisionStatus);

      const data = await respondInvitation(invitationId, decisionStatus);
      console.log(data);

      setCurrentStatus(decisionStatus);
    } catch (error) {
      sessionStorage.removeItem(storageKey);
      console.error(
        "Error respond invitation:",
        error.response?.data || error.message,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (statusFromUrl && !sessionStorage.getItem(storageKey)) {
      handleDecision(statusFromUrl);
    }
  }, [statusFromUrl, invitationId]);

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
