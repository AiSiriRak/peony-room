import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { getCoworkingSpace } from "../features/coworkingspaces";

function CoworkingSpace() {
  const navigate = useNavigate();
  const { coworkingspaceId } = useParams();

  const [coSpace, setCoSpace] = useState(null);

  useEffect(() => {
    async function loadCoworkingSpaceData() {
      try {
        const coSpacedata = await getCoworkingSpace(coworkingspaceId);
        setCoSpace(coSpacedata);
      } catch (error) {
        console.error("Error fetching co-working space:", error);
      }
    }
    loadCoworkingSpaceData();

    return loadCoworkingSpaceData;
  }, [navigate]);

  return (
    <div className="w-screen h-dvh flex justify-center items-center">
      <div className="w-full flex flex-col justify-start items-start h-full p-20">
        <p className="text-h1 text-dark-pink font-semibold">{coSpace?.name}</p>
        <p className="text-h3">
          <span className="font-semibold">Address : </span>
          <span className="font-normal text-dark-pink">{coSpace?.address}</span>
        </p>
        <p className="text-h3">
          <span className="font-semibold"> Tel : </span>
          <span className="font-normal text-dark-pink">
            {coSpace?.telephoneNumber}
          </span>
        </p>
        <p className="text-h3">
          <span className="font-semibold"> Open time : </span>
          <span className="font-normal text-dark-pink">
            {coSpace?.openTime} - {coSpace?.closeTime}
          </span>
        </p>
        <p className="text-h3">
          <span className="font-semibold"> Maximum capacity : </span>
          <span className="font-normal text-dark-pink">
            {coSpace?.maximumCapacity}
          </span>
        </p>
        <Button
          fullRound={true}
          onClick={() => navigate("/")}
          hideShadow={true}
          className="mt-30"
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}

export default CoworkingSpace;
