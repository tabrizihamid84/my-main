'use client';

import { useState } from 'react';

import { logIn, logOut, toggleModerator } from '@/redux/features/auth-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState('');

  const isAuth = useAppSelector((state) => state.);

  const onClickLogIn = () => {
    dispatch(logIn(username));
  };

  const onClickToggle = () => {
    dispatch(toggleModerator());
  };

  const onClickLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <input
        className="bg-slate-800 text-violet-800"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br></br>
      <button onClick={onClickLogIn}>Log In</button>
      <br></br>
      <button onClick={onClickLogOut}>Log Out</button>
      <br></br>
      {isAuth && (
        <button onClick={onClickToggle}>Toggle Moderator Status</button>
      )}
    </div>
  );
};

export default Login;
