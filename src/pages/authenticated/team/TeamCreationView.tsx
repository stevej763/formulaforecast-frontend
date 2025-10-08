
import { useState } from "react";
import { createUserTeam } from "../../../api/userTeamApiClient";

type TeamCreationViewProps = {
    onClose: () => void
}

const TeamCreationView = ({ onClose }: TeamCreationViewProps) => {
    const [teamName, setTeamName] = useState("");
    const [teamColour, setTeamColour] = useState("#ff0000");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        createUserTeam(teamName, teamColour)
          .then(() => {
            onClose();
          })
          .catch((error) => {
            console.error("Error creating team:", error);
            setIsSubmitting(false);
          });
    };

    // Generate checkered flag pattern preview
    const checkeredPattern = `
        repeating-linear-gradient(
          45deg,
          ${teamColour},
          ${teamColour} 20px,
          transparent 20px,
          transparent 40px
        ),
        repeating-linear-gradient(
          -45deg,
          ${teamColour},
          ${teamColour} 20px,
          transparent 20px,
          transparent 40px
        )
    `;

    return (
        <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-2xl overflow-hidden border-2 border-red-700/50">
            {/* Header */}
            <div className="bg-black/40 p-6 border-b border-white/10">
                <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg">Create Your Team</h2>
                <p className="text-center text-gray-300 mt-2 text-sm">Choose a name and color that represents your racing spirit</p>
            </div>

            <div className="p-6 sm:p-8">
                {/* Live Preview */}
                {teamName && (
                    <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                        <div
                            className="w-full h-20 flex items-center justify-center"
                            style={{ 
                                background: checkeredPattern,
                                backgroundColor: teamColour 
                            }}
                        >
                            <span className="text-white text-2xl font-bold drop-shadow-lg">{teamName}</span>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Team Name Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2" htmlFor="teamName">
                            Team Name
                        </label>
                        <input
                            id="teamName"
                            type="text"
                            value={teamName}
                            onChange={e => setTeamName(e.target.value)}
                            placeholder="e.g., Lightning Racers, Speed Demons..."
                            maxLength={30}
                            className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition placeholder-gray-500"
                            required
                        />
                        <p className="text-xs text-gray-400 mt-1">{teamName.length}/30 characters</p>
                    </div>

                    {/* Team Color Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2" htmlFor="teamColour">
                            Team Color
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <input
                                    id="teamColour"
                                    type="color"
                                    value={teamColour}
                                    onChange={e => setTeamColour(e.target.value)}
                                    className="w-20 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-12 h-12 rounded-lg border-2 border-white/30 shadow-lg"
                                        style={{ backgroundColor: teamColour }}
                                    />
                                    <span className="text-white font-mono text-lg">{teamColour}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">This color will appear on your team banner</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-150"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !teamName.trim()}
                            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-150 transform hover:scale-105 disabled:transform-none"
                        >
                            {isSubmitting ? "Creating..." : "Create Team"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TeamCreationView;