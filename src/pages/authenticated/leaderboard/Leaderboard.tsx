const Leaderboard = () => {
  return (
    <div className="w-full max-w-lg bg-white/5 rounded-xl shadow-lg p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-200 mb-4 text-center tracking-wide">
        Leaderboard
      </h1>
      <div className="flex gap-4 mb-4">
        <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-full shadow transition-colors duration-150">
          Create Championship
        </button>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full shadow transition-colors duration-150">
          Join Championship
        </button>
      </div>
      <table className="min-w-full bg-white/10 rounded-xl shadow text-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Position</th>
            <th className="px-4 py-2 text-left">Team</th>
            <th className="px-4 py-2 text-left">Points</th>
            <th className="px-4 py-2 text-left">Wins</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-700">
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">Red Racers</td>
            <td className="px-4 py-2">312</td>
            <td className="px-4 py-2">5</td>
          </tr>
          <tr className="border-t border-gray-700">
            <td className="px-4 py-2">2</td>
            <td className="px-4 py-2">Blue Bolts</td>
            <td className="px-4 py-2">298</td>
            <td className="px-4 py-2">3</td>
          </tr>
          <tr className="border-t border-gray-700">
            <td className="px-4 py-2">3</td>
            <td className="px-4 py-2">Green Machines</td>
            <td className="px-4 py-2">287</td>
            <td className="px-4 py-2">2</td>
          </tr>
          <tr className="border-t border-gray-700">
            <td className="px-4 py-2">4</td>
            <td className="px-4 py-2">Silver Speedsters</td>
            <td className="px-4 py-2">265</td>
            <td className="px-4 py-2">1</td>
          </tr>
          <tr className="border-t border-gray-700">
            <td className="px-4 py-2">5</td>
            <td className="px-4 py-2">Black Panthers</td>
            <td className="px-4 py-2">251</td>
            <td className="px-4 py-2">1</td>
          </tr>
          <tr className="border-t border-gray-700">
            <td className="px-4 py-2">6</td>
            <td className="px-4 py-2">Golden Eagles</td>
            <td className="px-4 py-2">240</td>
            <td className="px-4 py-2">0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
