import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { TextInput } from "../components/TextInput";
import { getMe, logout } from "../features/auth";
import { getLineLink } from "../features/line";

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [coSpaceId, setCoSpaceId] = useState("");
  const [link, setLink] = useState("");

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
      <div className="w-full flex flex-col justify-center items-center h-full gap-5 overflow-auto py-10">
        {user && (
          <div className="flex-1 justify-center items-center m-10">
            <div className="text-h1 text-center">User : {user?.name}</div>
            <div className="text-h3 text-center">Email : {user?.email}</div>
          </div>
        )}
        {user && (
          <div className="flex-1 justify-center items-center">
            <Button
              fullRound={true}
              onClick={async () => {
                try {
                  const res = await getLineLink();
                  setLink(res.code);
                } catch (error) {
                  console.error("Error get LINE link:", error);
                }
              }}
              hideShadow={true}
            >
              Get LINE Link
            </Button>
            <p className="text-center text-h2">{link}</p>
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center items-center gap-2">
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
                navigate(`/coworking-spaces/${coSpaceId.trim()}`);
            }}
            hideShadow={true}
          >
            to co-working space
          </Button>
        </div>
        <Button
          fullRound={true}
          onClick={async () => {
            try {
              await logout();
              navigate("/login");
            } catch (error) {
              console.error("Error logout: ", error);
            }
          }}
          hideShadow={true}
        >
          {user ? "Logout" : "To Login page"}
        </Button>
      </div>
    </div>
  );
}

export default Home;
