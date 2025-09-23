import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onBack: () => void;
  accountCreated: boolean;
}

const LoginForm = ({ onLogin, onBack, accountCreated }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError(null);
    onLogin(email, password);
  };

  return (
  <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 bg-white/90 rounded-xl shadow-lg p-6">
      {accountCreated && (
        <div className="mb-2 p-3 rounded-lg bg-green-100 border border-green-300 text-green-800 text-center text-sm font-semibold shadow">
          Account created successfully! Please log in.
        </div>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 text-gray-900"
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 text-gray-900"
        autoComplete="current-password"
      />
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-lg bg-red-600 text-white font-semibold text-base hover:bg-red-700 active:bg-red-800 transition-colors duration-150"
      >
        Login
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

export default LoginForm;
