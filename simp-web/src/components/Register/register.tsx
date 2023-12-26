import { useAuth } from '../../context/AuthContext';
import { SUPPORTED_COUNTRIES } from '../../config/constants';
import './register.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateRegex } from '../../utils/validateRegex';
import NotificationService from '../../services/NotificationService';

const Register: React.FC<RegisterProps> = () => {
  const navigate = useNavigate();
  const { onLogin, onRegister } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [errorText, setErrorText] = useState('');

  const onOptionChangeHandler = (event: { target: { value: React.SetStateAction<string> } }) => {
    setCountry(event.target.value);
    console.log('User Selected Value - ', event.target.value);
  };

  const login = async (usrnm: string, pwd: string) => {
    const result = await onLogin!(usrnm, pwd);

    if (result && result.error) {
      alert(`Error ${result.msg}`);
    }
  };

  const register = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (country) {
      const validationRules = SUPPORTED_COUNTRIES.find((c) => c.value === country);

      if (validationRules) {
        const isValidUsername = validateRegex(username, validationRules.validations.patternMatch);

        if (!isValidUsername) {
          setErrorText(validationRules.validations.errorText);
          return;
        }

        if (!validateRegex(email, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')) {
          setErrorText('Please enter a valid email');
          return;
        }

        if (!password) {
          setErrorText('Please enter a password');
          return;
        }

        const deviceToken = (await NotificationService.requestForToken()) as string;
        // const deviceToken = 'dummytoken';
        const result = await onRegister!({
          country,
          username,
          email,
          password,
          deviceToken,
        });

        if (result && result.error) {
          alert(`Error ${result.msg}`);
        } else {
          login(username, password);
          navigate('/home');
        }
      }
    } else {
      setErrorText('Please select a country');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <div className='fieldgroup'>
          <label>
            <span className='formlabel'>Country:</span>
            <select onChange={onOptionChangeHandler} className='fieldselect'>
              <option>Select a country</option>
              {SUPPORTED_COUNTRIES.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div className='fieldgroup'>
          <label>
            <span className='formlabel'>Username:</span>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>

        <div className='fieldgroup'>
          <label>
            <span className='formlabel'>Email:</span>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>

        <div className='fieldgroup'>
          <label>
            <span className='formlabel'>Password:</span>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>

        <div>{errorText ? <span className='errorText'>{errorText}</span> : <></>}</div>

        <button type='button' onClick={register}>
          Create an account
        </button>

        <Link to='/' className='link'>{`< Back to login`}</Link>
      </form>
    </div>
  );
};

export default Register;
