import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
} from "../redux/actions/userActions";
import { getMyOrders } from "../redux/actions/orderActions";
import { USER_PROFILE_UPDATE_RESET } from "../redux/constants/userConstants";
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

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingListMy, error: errorListMy, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
        dispatch(getUserProfile("profile"));
        dispatch(getMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords must match");
    } else {
      dispatch({ type: USER_PROFILE_UPDATE_RESET });
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
        {loadingListMy ? (
          <h3>Loading...</h3>
        ) : errorListMy ? (
          <h3>{errorListMy}</h3>
        ) : (
          <div className="profile__right--orders">
            {orders.map((order, index) => (
              <div key={order.id} className="ordersItem">
                <div className="ordersItem__index">{index + 1}</div>
                <div className="ordersItem__id">{order._id}</div>
                <div className="ordersItem__createdAt">
                  {order.createdAt.substring(0, 10)}
                </div>
                <div className="ordersItem__total">${order.totalPrice}</div>
                {order.isPaid ? (
                  <div className="ordersItem__isPaid--true">Paid</div>
                ) : (
                  <div className="ordersItem__isPaid--false">Not Paid</div>
                )}
                {order.isDelivered ? (
                  <div className="ordersItem__isDelivered--true">Delivered</div>
                ) : (
                  <div className="ordersItem__isDelivered--false">
                    Not Delivered
                  </div>
                )}
                <div className="ordersItem__link">
                  <Link to={`/order/${order._id}`}>Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
