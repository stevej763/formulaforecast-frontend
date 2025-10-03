import type { UserTeam } from "../../../../api/userTeamApiClient";
import { getGlobalLeaderboard, type ChampionshipLeaderboardResponse } from "../../../../api/championshipLeaderboardApiClient";
import { useEffect, useState } from "react";
import LoaderSpinner from "../../../../shared/components/LoaderSpinner";

const GlobalLeaderboardTab = () => {

    const [globalLeaderboard, setGlobalLeaderboard] = useState<ChampionshipLeaderboardResponse | null>(null);
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    getGlobalLeaderboard()
      .then((globalLeaderboardResponse) => {
        setGlobalLeaderboard(globalLeaderboardResponse);
      })
      .catch((error) => {
        console.error("Error fetching global leaderboard:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoaderSpinner />;
  }

  if (globalLeaderboard?.championshipLeaderboard === undefined) {
    return <div className="text-red-400 text-center">No global leaderboard found</div>;
  }


  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-200 mb-4 text-center tracking-wide">Global Leaderboard</h1>
        <table className="min-w-full bg-white/10 rounded-xl shadow text-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Team</th>
              <th className="px-4 py-2 text-left">Colour</th>
            </tr>
          </thead>
          <tbody>
            {globalLeaderboard.topTen.map((team: UserTeam, idx: number) => (
              <tr key={team.teamUid} className="border-t border-gray-700">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{team.teamName}</td>
                <td className="px-4 py-2">
                  <span
                    className="inline-block w-4 h-4 rounded-full border border-gray-400"
                    style={{ backgroundColor: team.teamColour }}
                  ></span>
                  <span className="ml-2">{team.teamColour}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default GlobalLeaderboardTab;
