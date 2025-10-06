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
        dispatch(setUserTeam({ userTeam: { teamUid: teamResponse.teamDetailsDto.teamUid } }));

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [creatingTeam]);

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
      <div className="w-full max-w-xs bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center mb-4 border-2 border-red-700">
        <div className="mb-4">
              <img src="/helmet-01.png" alt="No Team" className="mx-auto rounded-full" style={{ height: "128px"}} />
        </div>
        <h2 className="text-xl font-bold text-white mb-2 text-center">No Team Found</h2>
        <p className="text-gray-200 mb-4 text-center">You haven't set up your team yet. Get started to join the competition!</p>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-150"
          onClick={() => setCreatingTeam(true)}
        >
          Create Team
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs rounded-xl shadow-lg mb-4 border-2 border-gray-800 overflow-hidden">
      <div
        className="w-full h-16 flex items-center justify-center"
        style={{ backgroundColor: team.teamColour }}
      >
        <span className="text-white text-2xl font-bold drop-shadow-lg">{team.teamName}</span>
      </div>
    </div>
  );
};

export default MyTeamTab;