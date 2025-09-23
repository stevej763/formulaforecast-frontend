import React, { useState } from "react";

interface SignUpFormProps {
  onSignUp: (firstName: string, lastName: string, email: string, password: string) => void;
  onBack: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, onBack }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    onSignUp(firstName, lastName, email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4 bg-white/90 rounded-xl shadow-lg p-6"
    >
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 text-gray-900"
        autoComplete="given-name"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 text-gray-900"
        autoComplete="family-name"
      />
      <div className="h-2" />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 text-gray-900"
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 text-gray-900"
        autoComplete="new-password"
      />
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-lg bg-red-600 text-white font-semibold text-base hover:bg-red-700 active:bg-red-800 transition-colors duration-150"
      >
        Sign Up
      </button>
      <button
        type="button"
        onClick={onBack}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-700 text-white font-semibold text-base hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150 border border-gray-600 mt-2"
      >
        Back
      </button>
    </form>
  );
};

export default SignUpForm;
