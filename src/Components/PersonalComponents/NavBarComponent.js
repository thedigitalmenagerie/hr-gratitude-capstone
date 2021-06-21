import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimationWrapper } from 'react-hover-animation';
import { Link } from 'react-router-dom';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { signOutUser } from '../../helpers/Authorization';
import whiteHomeButton from '../../Assets/whiteHomeButton.png';
import whiteEvents from '../../Assets/whiteEvents.png';
import whiteCategory from '../../Assets/whiteCategory.png';
import whiteItems from '../../Assets/whiteItems.png';
import whiteUser from '../../Assets/whiteUser.png';
import whiteSignOut from '../../Assets/whiteSignOut.png';
import whiteFriend from '../../Assets/whiteFriend.png';
import './CStyles/NavBarComponent.scss';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="NavBar">
      <Navbar id="Navbar" expand="md" >
        <NavbarBrand>
        {
            user !== null
            && <div id="authButtons">
              {
                user
                  ? <div className="loggedIn">
                      <div className="loggedInRight">
                        <img className="loggedInProfilePic" src={user.profileImage}></img>
                        <div className="wordInfo">
                          <div>{user.fullName}</div>
                          <AnimationWrapper><Button id="signOut" onClick={signOutUser}><img id="signOutButton" src={whiteSignOut}></img></Button></AnimationWrapper>
                        </div>
                      </div>
                    </div>
                  : <div></div>
              }
            </div>
          }
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse className="collapse" isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
        <NavItem>
        <AnimationWrapper><Link className="nav-link" to="/"><img className="navImg" src={whiteHomeButton}></img></Link></AnimationWrapper>
          </NavItem>
          <NavItem>
            <AnimationWrapper><Link className="nav-link" to="/myEvents"><img className="navImg" src={whiteEvents}></img>Events</Link></AnimationWrapper>
          </NavItem>
          <NavItem>
            <AnimationWrapper><Link className="nav-link" to="/myCategories"><img className="navImg" src={whiteCategory}></img>Categories</Link></AnimationWrapper>
          </NavItem>
          <NavItem>
           <AnimationWrapper><Link className="nav-link" to="/myItems"><img className="navImg" src={whiteItems}></img>Items</Link></AnimationWrapper>
          </NavItem>
          <NavItem>
            <AnimationWrapper><Link className="nav-link" to="/friendView"><img className="navImg" src={whiteFriend}></img>Friends</Link></AnimationWrapper>
         </NavItem>
          <NavItem>
            <AnimationWrapper><Link className="nav-link" to="/userView"><img className="navImg" src={whiteUser}></img>Other Users</Link></AnimationWrapper>
         </NavItem>
        </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any,
};

export default NavBar;
