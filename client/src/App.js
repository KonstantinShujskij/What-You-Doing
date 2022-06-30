import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import 'materialize-css';

import useAuth from './hooks/auth.hook';
import AuthContext from './context/AuthContext';
import Loader from './components/Loader';
import useRoutes from './routes';
import Navbar from './components/Navbar';


function App() {
  const auth = useAuth();
  const isAuthenticated = !!auth.token;
  const routes = useRoutes(isAuthenticated);

  if (!auth.ready) { return <Loader /> }

  return (
      <BrowserRouter>
        <AuthContext.Provider value={{...auth, isAuthenticated}}>
          <>
            {(isAuthenticated && <Navbar />)}
            <div className="container">
              {routes}
            </div>
          </>          
        </AuthContext.Provider>  
      </BrowserRouter>
  );
}

export default App;
