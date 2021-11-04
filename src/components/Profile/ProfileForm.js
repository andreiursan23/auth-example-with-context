 import classes from './ProfileForm.module.css';

import { useRef } from 'react';

import axios from 'axios';

import { Context } from '../../context/context';

import { useContext } from 'react';

const ProfileForm = () => {
  const newPassword = useRef();
  const context = useContext(Context);

  const changePassword = (e) => {
    e.preventDefault();

    axios
      .post('https://apps.loopevo.com/apis/shop/change-password.php', {password: newPassword.current.value, token: context.token, id: context.id})
      .then(response => {
        console.log(response.data);
        context.incrementReqNumber();
      })
      .catch(err => console.log(err))
  }

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassword} />
      </div>
      <div className={classes.action}>
        <button onClick={changePassword}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
