
import { useState } from "react";
import { createUserTeam } from "../../../api/userTeamApiClient";

type TeamCreationViewProps = {
    onClose: () => void
}

const TeamCreationView = ({ onClose }: TeamCreationViewProps) => {
    const [teamName, setTeamName] = useState("");
    const [teamColour, setTeamColour] = useState("#ff0000");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createUserTeam(teamName, teamColour)
          .then(() => {
            onClose();
          })
          .catch((error) => {
            console.error("Error creating team:", error);
          });
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 border-2 border-red-700">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Your Team</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                    <label className="block text-lg text-white mb-2" htmlFor="teamName">Team Name</label>
                    <input
                        id="teamName"
                        type="text"
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg text-white mb-2" htmlFor="teamColour">Team Colour</label>
                    <input
                        id="teamColour"
                        type="color"
                        value={teamColour}
                        onChange={e => setTeamColour(e.target.value)}
                        className="w-16 h-10 p-1 rounded border border-gray-700"
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Create Team
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TeamCreationView;