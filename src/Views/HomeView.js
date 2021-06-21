import React from 'react';
import PropTypes from 'prop-types';
import { animations } from 'react-animation';
import { AnimationWrapper } from 'react-hover-animation';
import Typing from 'react-typing-animation';
import { signInUser } from '../helpers/Authorization';
import gratitude from '../Assets/gratitudeLogo.png';
import whiteSignIn from '../Assets/whiteSignIn.png';
import './HomeView.scss';

export default function HomeView({
  user,
}) {
  return (
    <div>
      {
        user !== null
          && <div id="authButtonsHome">
            {
              user
                ? <div className="loggedInView">
                  <Typing><span><div className="welcomeMessage">Welcome, {user.fullName}!</div></span></Typing>
                  <img style={{ animation: animations.fadeIn }} id="loggedInLogo" src={gratitude}></img>
                  </div>
                : <AnimationWrapper>
                  <div id="loggedOutView">
                    <img id="loggedOutLogo" src={gratitude}></img>
                    <button id="signIn" onClick={signInUser}>SIGN IN <img id="signInButton" src={whiteSignIn}></img></button>
                  </div>
                  </AnimationWrapper>
              }
            </div>
          }
    </div>
  );
}

HomeView.propTypes = {
  user: PropTypes.any,
};
