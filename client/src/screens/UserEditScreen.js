import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUser } from "../redux/actions/userActions";
import { USER_UPDATE_RESET } from "../redux/constants/userConstants";
import "../styles/screens/userEditScreen/userEditScreen.css";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const dispatch = useDispatch();

  const userProfileDetails = useSelector((state) => state.userProfileDetails);
  const {
    loading: userDetailsLoading,
    error: userDetailsError,
    user,
  } = userProfileDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: userUpdateLoading,
    error: userUpdateError,
    success: userUpdateSuccess,
  } = userUpdate;

  useEffect(() => {
    if (userUpdateSuccess) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user._id || user._id !== userId) {
        dispatch(getUserProfile(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, user, userId, userUpdateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: userId, name, email, isAdmin }));
  };

  return (
    <div className="userUpdate">
      <h1 className="userUpdate__title">Edit User</h1>
      {userUpdateLoading || userDetailsLoading ? (
        <h3 className="userUpdate__loading">Loading...</h3>
      ) : userUpdateError || userDetailsError ? (
        <h3 className="userUpdate__error">
          {userUpdateError || userDetailsError}
        </h3>
      ) : (
        <form className="userUpdate__form" onSubmit={submitHandler}>
          <label className="userUpdate__form--label" htmlFor="name">
            Name
          </label>
          <input
            className="userUpdate__form--input"
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="userUpdate__form--label" htmlFor="email">
            Email
          </label>
          <input
            className="userUpdate__form--input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="userUpdate__form--check">
            <label htmlFor="isAdmin">Is Admin?</label>
            <input
              type="checkbox"
              name="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </div>

          <button className="userUpdate__form--submit" type="submit">
            Update your profile
          </button>
        </form>
      )}
    </div>
  );
};

export default UserEditScreen;
