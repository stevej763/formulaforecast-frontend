import { getUserTeam, type UserTeam } from "../../../../api/userTeamApiClient";
import { useEffect, useState } from "react";
import LoaderSpinner from "../../../../shared/components/LoaderSpinner";
import TeamCreationView from "../TeamCreationView";
import { useDispatch } from "react-redux";
import { setUserTeam, useUserTeam } from "../../../../store/teamSlice";

const MyTeamTab = () => {

  const currentUserTeam = useUserTeam();
  const [team, setTeam] = useState<UserTeam>(currentUserTeam);
  const [loading, setLoading] = useState(true);
  const [creatingTeam, setCreatingTeam] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    getUserTeam()
      .then((teamResponse) => {
        setTeam(teamResponse.teamDetailsDto);
        const userTeam = teamResponse.teamDetailsDto;
        dispatch(setUserTeam({userTeam: userTeam}));

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch, creatingTeam]);

   if (loading) {
    return (
      <div className="p-4 text-center text-red-500">
        <LoaderSpinner />
      </div>
    );
  }

  if (!team) {
    if (creatingTeam) {
        return <TeamCreationView onClose={() => setCreatingTeam(false)} />;
    }

    return (
      <div className="w-full bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-b-xl shadow-2xl overflow-hidden flex flex-col h-full">
        {/* Empty State Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8">
          <div className="mb-6">
            <img 
              src="/helmet-01.png" 
              alt="No Team" 
              className="mx-auto rounded-full" 
              style={{ height: "128px" }} 
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 text-center">No Team Found</h2>
          <p className="text-sm sm:text-base text-gray-300 mb-6 text-center max-w-sm">
            You haven't set up your team yet. Get started to join the competition!
          </p>
          <button
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-150 transform hover:scale-105 active:scale-95"
            onClick={() => setCreatingTeam(true)}
          >
            Create Team
          </button>
        </div>
      </div>
    );
  }

  // Generate checkered flag pattern using team color
  const checkeredPattern = `
    repeating-linear-gradient(
      45deg,
      ${team.teamColour},
      ${team.teamColour} 20px,
      transparent 20px,
      transparent 40px
    ),
    repeating-linear-gradient(
      -45deg,
      ${team.teamColour},
      ${team.teamColour} 20px,
      transparent 20px,
      transparent 40px
    )
  `;

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-b-xl shadow-2xl overflow-hidden flex flex-col h-full">
      {/* Checkered flag banner */}
      <div
        className="w-full h-20 sm:h-24 flex items-center justify-center relative flex-shrink-0"
        style={{ 
          background: checkeredPattern,
          backgroundColor: team.teamColour 
        }}
      >
        <span className="text-white text-2xl sm:text-3xl font-bold drop-shadow-lg px-4 text-center truncate max-w-full">{team.teamName}</span>
      </div>
    </div>
  );
};

export default MyTeamTab;