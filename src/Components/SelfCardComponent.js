import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  Container,
} from 'reactstrap';
import { getSpecificUser } from '../Helpers/Data/UserData';
import './CStyles/SelfCardComponent.scss';

function SelfCardComponent({
  user,
}) {
  const [loggedInUser, setLoggedInUser] = useState([]);
  console.warn(loggedInUser);

  useEffect(() => {
    getSpecificUser(user.uid).then((response) => setLoggedInUser(response));
  }, []);
  return (
    <Container className="selfCardContainer">
      <Card className="selfCard" key={user.firebaseKey}>
        <CardImg className="selfProfileImage" src={user.profileImage} alt="Profile Image" />
        <CardTitle className="selfFullName">{user.fullName}</CardTitle>
        <CardText className="selfUserEmail">{user.userEmail}</CardText>
      </Card>
    </Container>

  );
}

SelfCardComponent.propTypes = {
  setUsers: PropTypes.func,
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default SelfCardComponent;
