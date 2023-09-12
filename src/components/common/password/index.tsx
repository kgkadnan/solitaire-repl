import React, { useState } from 'react';
import './password.module.scss'
import EyeSlash from '@public/assets/icons/eye-off-outline.svg?url'
import Eye from '@public/assets/icons/eye-outline.svg?url'

function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor="password">Password:</label>
      <div className="password-input">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
            {showPassword ? <EyeSlash alt="eye-slash"/> : <Eye alt="eye"/>}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
