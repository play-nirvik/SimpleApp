import UserService from '../../../services/UserService';
import { useAuth } from '../../../context/AuthContext';
import './header.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const { onLogout } = useAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userInfo = UserService.get();
    if (userInfo && userInfo !== undefined) {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const onSignOut = () => {
    setIsAuthenticated(false);
    onLogout?.();
    navigate('/');
  };

  return (
    <header>
      <div className='header-container'>
        <div>
          <h2>Simple Web App</h2>
        </div>
        {isAuthenticated ? (
          <div className='signout-conatiner'>
            <button onClick={onSignOut}>Sign Out</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

export default Header;
