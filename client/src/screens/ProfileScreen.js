import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  updateUserProfile,
} from "../redux/actions/userActions";
import "../styles/screens/profileScreen/profileScreen.css";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileDetails = useSelector((state) => state.userProfileDetails);
  const { loading, error, user } = userProfileDetails;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success } = userProfileUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserProfile("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords must match");
    } else {
      dispatch(updateUserProfile({ id: user.id, name, email, password }));
    }
  };

  return (
    <div className="profile">
      <div className="profile__left">
        <h2 className="profile__left--title">Your Profile</h2>
        {error && <h3 className="profile__left--error">{error}</h3>}
        {loading && <h3 className="profile__left--loading">Loading...</h3>}
        {success && <h3 className="profile__left--success">Profile Updated</h3>}

        <form className="profile__left--form" onSubmit={submitHandler}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={message ? { border: "2px solid red" } : {}}
          />
          <label htmlFor="confirmPassword">Re-enter password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={
              message ? { border: "2px solid red", marginBottom: "0" } : {}
            }
          />
          {message && <div className="register__message">{message}</div>}
          <button type="submit">Update</button>
        </form>
      </div>
      <div className="profile__right">
        <h2 className="profile__right--title">Your Orders</h2>
      </div>
    </div>
  );
};

export default ProfileScreen;
