import { useAuth } from '../../context/AuthContext';
import './login.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner/loading-spinner';
import UserService from '../../services/UserService';

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const { onLogin, isLoading } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const userInfo = UserService.get();
    if (userInfo && userInfo !== undefined) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const result = await onLogin!(username.trim(), password);

    console.log('login>>>', result);

    if (result && result.error) {
      alert(`Error: ${result.msg}`);
    } else {
      navigate('/home');
    }
  };

  const handleSignUp = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/signup');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div className='fieldgroup'>
          <label>
            <span className='formlabel'>Username:</span>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>

        <div className='fieldgroup'>
          <label>
            <span className='formlabel'>Password:</span>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>

        <button type='button' onClick={handleLogin}>
          Login
        </button>

        <div>
          <button onClick={handleSignUp}>Create an account</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
