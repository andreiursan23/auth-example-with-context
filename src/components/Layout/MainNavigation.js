import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

import { Context } from '../../context/context';

import { useContext } from 'react';

const MainNavigation = () => {
  const context = useContext(Context);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Auth</div>
      </Link>
      <nav>
        <ul>
          {context.isAuth ? (
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={() => context.logout()}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
