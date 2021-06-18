// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';
// import StackGrid from 'react-stack-grid';
// import { getCategory } from '../../helpers/data/CategoryData';
// import { mergedUserFriendData } from '../../helpers/data/FriendData';
// import SpecificFriendCategoryCards from '../../Components/FriendComponents/SpecificFriendCategoryCardComponent';

// export default function SpecificFriendCategoryView({
//   user,
//   setUser,
// }) {
//   const [friendsForCategories, setFriendsForCategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const { uid } = useParams();

//   useEffect(() => {
//     mergedUserFriendData(friendsForCategories.friendKey).then((response) => setFriendsForCategories(response));
//     getCategory(uid).then((response) => setCategories(response));
//   }, []);

//   return (
//     <div className="categoryView">
//         <StackGrid className="stackGridCategories" gutterHeight={10}>
//               {categories?.map((friendCategoryInfo) => (
//               <SpecificFriendCategoryCards
//                 key={friendCategoryInfo.firebaseKey}
//                 {...friendCategoryInfo}
//                 user={user}
//                 setUser={setUser}
//                 setFriendsForCategories={setFriendsForCategories}
//                 friendKey={friendCategoryInfo.friendKey}
//                 friendsForCategories={friendsForCategories}
//               />
//               ))}
//           </StackGrid>
//             </div>
//   );
// }

// SpecificFriendCategoryView.propTypes = {
//   user: PropTypes.any,
//   setUser: PropTypes.func,
//   categories: PropTypes.any,
//   setCategories: PropTypes.func,
//   friendKey: PropTypes.string,
// };
