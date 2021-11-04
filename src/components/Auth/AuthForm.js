import { useState, useRef, useContext } from 'react';

import axios from 'axios';

import classes from './AuthForm.module.css';

import { Context } from '../../context/context';

import { useHistory } from 'react-router';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const context = useContext(Context);
  const history = useHistory();

  const authUser = (e) => {
    e.preventDefault();

    const baseUrl="http://apps.loopevo.com/apis/shop";
    let url = '';

    if (isLogin) {
      url = `${baseUrl}/login.php`;
    } else {
      url = `${baseUrl}/signup.php`;
    }

    axios
      .post(url, {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      .then(response => {
        console.log(response.data);
        context.login(response.data.token, response.data.id);
        context.incrementReqNumber();
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='username'>Your Username</label>
          <input type='text' id='username' required ref={usernameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button onClick={authUser}>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;