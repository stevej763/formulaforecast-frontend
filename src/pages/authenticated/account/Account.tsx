import { useNavigate } from "react-router-dom";
import { useUser } from "../../../features/auth/userSlice";

const Account = () => {
  const user = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-2xl shadow-2xl p-12 mt-4 border-2 border-red-700">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow">
        My Account
      </h2>
      <div className="flex flex-col gap-6 text-lg text-gray-100">
        <div>
          <span className="font-semibold text-red-400">First Name:</span> {user.firstName}
        </div>
        <div>
          <span className="font-semibold text-red-400">Last Name:</span> {user.lastName}
        </div>
        <div>
          <span className="font-semibold text-red-400">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold text-red-400">Account UID:</span> {user.accountUid}
        </div>
      </div>
    </div>
  );
};

export default Account;
