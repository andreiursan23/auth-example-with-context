import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

import { Context } from './context/context';
import { useContext } from 'react';

function App() {
  const context = useContext(Context);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile' render={() => (
          context.isAuth ? 
            <UserProfile />
            : 
            <Redirect to="/auth" />
          )}>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
