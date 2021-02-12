import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Routes from './routes';
import { checkAuth, logout } from './store/actions/auth';


const App = () => {

  const {authUser, appLoading} = useSelector(state=>({authUser: state.authReducer.user, appLoading: state.authReducer.loading}))
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(checkAuth())
  }, [])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <BrowserRouter>
      {!appLoading && 
        <div className="App" style={{marginTop: "20px"}}>
        
          <Navbar user={authUser} logoutHandler={logoutHandler} />
          <div style={{marginLeft: '100px', marginRight: "20px"}}>
            <Routes user={authUser} />
          </div>
        </div>  
      }
    </BrowserRouter>
  );
}

export default App;
