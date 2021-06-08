import React from 'react';
import PropTypes from 'prop-types';
import { signInUser } from '../Helpers/Authorization';
import gratitude from '../Assets/gratitudeLogo.png';
import signIn from '../Assets/signOut.png';
import './VStyles/HomeView.scss';

export default function HomeView({
  user,
}) {
  console.warn(user);
  return (
    <div>
      {
        user !== null
          && <div id="authButtonsHome">
            {
              user
                ? <img id="loggedInLogo" src={gratitude}></img>
                : <div id="loggedOutView">
                    <img id="loggedOutLogo" src={gratitude}></img>
                    <button id="signIn" onClick={signInUser}>SIGN IN <img id="signInButton" src={signIn}></img></button>
                  </div>
              }
            </div>
          }
    </div>
  );
}

HomeView.propTypes = {
  user: PropTypes.any,
};
