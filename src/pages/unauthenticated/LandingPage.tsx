import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/userSlice';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { createAccount, login } from '../../api/authenticationApiClient';
import { getAccountDetails } from '../../api/accountDetailsApiClient';
import type { AccountLoginResponse }  from '../../api/authenticationApiClient';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {

  const [formType, setFormType] = useState<'login' | 'signup' | null>(null);
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response: AccountLoginResponse = await login({ email, password });
      console.log('Login successful:', response.ok);
      const userDetails = await getAccountDetails();
      dispatch(setUser({ user: userDetails }));
      navigate('/home');
    } catch (error) {
      console.error('Login or fetching user details failed:', error);
    }
  };

  const handleSignUp = (firstName: string, lastName: string, email: string, password: string) => {
    createAccount({ firstName, lastName, email, password })
    .then(() => {
      console.log('Account created successfully');
      setFormType('login');
      setAccountCreated(true);
    })
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-red-900 px-4">
      <div className="w-full max-w-sm bg-white/5 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <img src="/logo-01-no-background.png" alt="Formula Forecast Logo" width={150} height={150} className="h-[150px] w-[150px] object-contain mb-4" />
        <div className="w-full flex flex-col gap-4">
          {formType === 'login' && <LoginForm onLogin={handleLogin} onBack={() => setFormType(null)} accountCreated={accountCreated}/>}
          {formType === 'signup' && <SignUpForm onSignUp={handleSignUp} onBack={() => setFormType(null)} />}
          {formType === null && (
            <>
              <button
                onClick={() => setFormType('login')}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-600 text-white font-semibold text-base hover:bg-red-700 active:bg-red-800 transition-colors duration-150"
              >
                Login
              </button>
              <button
                onClick={() => setFormType('signup')}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-black text-white font-semibold text-base hover:bg-gray-900 active:bg-gray-950 transition-colors duration-150 border border-gray-700"
              >
                Sign Up
              </button>
            </>
          )}
          {/* Back button now handled inside form components */}
        </div>
      </div>
      <div className="mt-8 text-gray-300 text-center text-xs opacity-80">
        &copy; {new Date().getFullYear()} Formula Forecast. All rights reserved.
      </div>
    </div>
  );
}

export default LandingPage;