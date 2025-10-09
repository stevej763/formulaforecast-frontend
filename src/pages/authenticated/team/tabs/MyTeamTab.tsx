import { getUserTeam, type UserTeam } from "../../../../api/userTeamApiClient";
import { useEffect, useState } from "react";
import LoaderSpinner from "../../../../shared/components/LoaderSpinner";
import TeamCreationView from "../TeamCreationView";
import { useDispatch } from "react-redux";
import { setUserTeam } from "../../../../store/teamSlice";

const MyTeamTab = () => {

  const [team, setTeam] = useState<UserTeam | null>(null);
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
  }, [dispatch]);

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
      <div className="w-full max-w-lg bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center justify-center border-2 border-red-700/50">
        <div className="mb-6">
          <img 
            src="/helmet-01.png" 
            alt="No Team" 
            className="mx-auto rounded-full" 
            style={{ height: "128px" }} 
          />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3 text-center">No Team Found</h2>
        <p className="text-gray-300 mb-6 text-center max-w-sm">
          You haven't set up your team yet. Get started to join the competition!
        </p>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-150 transform hover:scale-105"
          onClick={() => setCreatingTeam(true)}
        >
          Create Team
        </button>
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
    <div className="w-full max-w-lg bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-lg overflow-hidden">
      {/* Checkered flag banner */}
      <div
        className="w-full h-24 flex items-center justify-center relative"
        style={{ 
          background: checkeredPattern,
          backgroundColor: team.teamColour 
        }}
      >
        <span className="text-white text-3xl font-bold drop-shadow-lg">{team.teamName}</span>
      </div>
      
      {/* Team details section */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Team Color</span>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full border-2 border-white/30 shadow-lg"
              style={{ backgroundColor: team.teamColour }}
            />
            <span className="text-white font-mono text-sm">{team.teamColour}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Team ID</span>
          <span className="text-white/70 font-mono text-xs">{team.teamUid.slice(0, 8)}...</span>
        </div>
      </div>
    </div>
  );
};

export default MyTeamTab;