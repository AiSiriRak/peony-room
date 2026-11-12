import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { getCoworkingSpaces } from "../features/coworkingspaces";
import { TextInput } from "../components/TextInput";
import { getMe } from "../features/auth";

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [coSpace, setCoSpace] = useState(null);
  const [coSpaceId, setCoSpaceId] = useState("");
  const [invitationId, setInvitationId] = useState("");

  useEffect(() => {
    async function loadUserAndData() {
      try {
        const accountdata = await getMe();
        setUser(accountdata);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    loadUserAndData();

    return loadUserAndData;
  }, [navigate]);

  return (
    <div className="w-screen h-dvh flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center h-full gap-5">
        <div>User : {user?.name}</div>
        <div>Email : {user?.email}</div>
        <Button
          fullRound={true}
          onClick={() => navigate("/login")}
          hideShadow={true}
        >
          To login
        </Button>
        <p> to invitaion</p>
        <TextInput
          value={invitationId}
          onChange={setInvitationId}
          placeholder="Enter co-space id"
          className="w-80"
        />
        <Button
          fullRound={true}
          onClick={() => {
            if (invitationId.trim() != "")
              navigate(`/invitation/${invitationId.trim()}`);
          }}
          hideShadow={true}
        >
          to invitaion
        </Button>
        <p> to coworking details</p>
        <TextInput
          value={coSpaceId}
          onChange={setCoSpaceId}
          placeholder="Enter co-space id"
          className="w-80"
        />
        <Button
          fullRound={true}
          onClick={() => {
            if (coSpaceId.trim() != "")
              navigate(`/coworking-space/${coSpaceId.trim()}`);
          }}
          hideShadow={true}
        >
          to co-working space
        </Button>
        <Button
          fullRound={true}
          onClick={async () => {
            try {
              const data = await getCoworkingSpaces();
              setCoSpace(data);
            } catch (error) {
              console.error("Error fetching spaces:", error);
            }
          }}
          hideShadow={true}
        >
          Get Co-working Spaces
        </Button>
        <div className="h-50 overflow-auto bg-white">
          {coSpace ? JSON.stringify(coSpace, null, 2) : "No data fetched yet"}
        </div>
      </div>
    </div>
  );
}

export default Home;
