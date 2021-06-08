import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { signOutUser } from '../Helpers/Authorization';
import homeButton from '../Assets/homeButton.png';
import date from '../Assets/date.png';
import category from '../Assets/category.png';
import giftView from '../Assets/giftView.png';
import userView from '../Assets/userView.png';
import signOut from '../Assets/signInBlue.png';
import friend from '../Assets/friend.png';
import './CStyles/NavBarComponent.scss';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="NavBar">
      <Navbar id="Navbar" light expand="md" >
        <NavbarBrand>
           <Link className="nav-link" to="/"><img className="navImg" src={homeButton}></img></Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link className="nav-link" to="/myEvents"><img className="navImg" src={date}></img></Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/myCategories"><img className="navImg" src={category}></img></Link>
          </NavItem>
          <NavItem>
           <Link className="nav-link" to="/myGifts"><img className="navImg" src={giftView}></img></Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/friendView"><img className="navImg" src={friend}></img></Link>
         </NavItem>
          <NavItem>
            <Link className="nav-link" to="/userView"><img className="navImg" src={userView}></img></Link>
         </NavItem>
        </Nav>
        </Collapse>
        {
            user !== null
            && <NavItem id="authButtons">
              {
                user
                  ? <div className="loggedInRight">
                      <img className="loggedInProfilePic" src={user.profileImage}></img>
                      <div className="wordInfo">
                        <div>{user.fullName}</div>
                        <div>{user.userEmail}</div>
                      </div>
                      <button id="signOut" onClick={signOutUser}><img id="signOutButton" src={signOut}></img>  SIGN OUT</button>
                    </div>
                  : <div></div>
              }
            </NavItem>
          }
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any,
};

export default NavBar;
