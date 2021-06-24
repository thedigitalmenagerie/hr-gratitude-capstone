import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { addUser, getLoggedInUser, getSpecificUser } from '../helpers/data/UserData';
import { getCategory } from '../helpers/data/CategoryData';
import NavBar from '../Components/PersonalComponents/NavBarComponent';
import background from '../Assets/background2.gif';
import Routes from '../helpers/Routes';
import './App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
          userEmail: authed.email,
        };
        setUser(userInfoObj);
        getSpecificUser(userInfoObj).then((response) => {
          if (Object.values(response.data).length === 0) {
            addUser(userInfoObj);
            getLoggedInUser(userInfoObj);
          }
        });
        getCategory(authed.uid).then((categoryArray) => setCategories(categoryArray));
        setUser(userInfoObj);
      } else if ((user || user === null)) {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className='App' style={{ backgroundImage: `url(${background})` }}>
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
        categories={categories}
        setCategories={setCategories}
        />
      </Router>
    </div>
  );
}

export default App;
