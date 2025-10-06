// src/app/home/Header.tsx
"use client";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../api/authenticationApiClient";
import { useDispatch } from "react-redux";
import { clearAccount } from "../../../store/accountSlice";
type HeaderProps = {
  onAccountClick: () => void;
};

const Header = ({ onAccountClick }: HeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const environment = import.meta.env.VITE_APP_ENV;
  const showEnvironment = environment !== 'production';

  const handleSignOut = () => {
    logout().then(() => {
      dispatch(clearAccount());
      navigate("/");
    });
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/90 border-b border-gray-800 flex items-center justify-between h-16 shadow px-4">
      <div className="flex items-center gap-2">
        <img
          src="/logo-01-no-background.png"
          alt="Formula Forecast Logo"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
        <span className="text-xl font-bold text-red-500 tracking-wide">Formula Forecast</span>
        {showEnvironment && (
          <span className="text-xs font-semibold bg-yellow-600 text-black px-2 py-1 rounded uppercase">
            {environment}
          </span>
        )}
      </div>
      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => onAccountClick()}
          className="bg-gray-700 hover:bg-gray-800 text-white text-xs font-semibold px-4 py-1 rounded-full transition-colors duration-150"
        >
          My Account
        </button>
        <button
          onClick={handleSignOut}
          className="bg-red-700 hover:bg-red-800 text-white text-xs font-semibold px-4 py-1 rounded-full transition-colors duration-150"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
