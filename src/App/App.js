import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { addUser, getSpecificUser } from '../Helpers/Data/UserData';
import NavBar from '../Components/NavBarComponent';
import Routes from '../Helpers/Routes';
import './App.scss';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
        };
        setUser(userInfoObj);
        getSpecificUser(userInfoObj).then((response) => {
          if (Object.values(response.data).length === 0) {
            addUser(userInfoObj);
          }
        });
      } else if ((user || user === null)) {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className='App'>
    <Router>
    {
            user !== null
            && <div>
              {
                user
                  ? <NavBar user={user}/>
                  : <></>
              }
            </div>
          }
        <Routes
        user={user}
        />
      </Router>
    </div>
  );
}

export default App;
