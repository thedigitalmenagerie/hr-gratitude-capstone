import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { addUser, getLoggedInUser, getSpecificUser } from '../Helpers/Data/UserData';
import { getCategory } from '../Helpers/Data/CategoryData';
import { getItem } from '../Helpers/Data/ItemData';
import NavBar from '../Components/NavBarComponent';
import Routes from '../Helpers/Routes';
import './App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

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
        getItem(authed.uid).then((itemArray) => setItems(itemArray));
        setUser(userInfoObj);
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
        categories={categories}
        setCategories={setCategories}
        items={items}
        setItems={setItems}
        />
      </Router>
    </div>
  );
}

export default App;
