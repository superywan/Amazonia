import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/orderActions";
import "../../styles/screens/orderListScreen/orderListScreen.css";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const {
    loading: orderListLoading,
    error: orderListError,
    orders,
  } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <div className="orderList">
      <h1 className="orderList__title">Orders</h1>
      {orderListLoading ? (
        <h3 className="orderList__loading">Loading...</h3>
      ) : orderListError ? (
        <h3 className="orderList__error">{orderListError}</h3>
      ) : (
        <div className="orderList__orders">
          {orders.map((order, index) => (
            <div key={order._id} className="orderList__orders--order">
              <div className="index">{index + 1}</div>
              <div className="id">{order._id}</div>
              <div className="name">{order.user && order.user.name}</div>
              <div className="createdAt">
                {order.createdAt.substring(0, 10)}
              </div>
              <div className="totalPrice">${order.totalPrice}</div>
              {order.isPaid ? (
                <div className="paidAt--true">
                  {order.paidAt.substring(0, 10)}
                </div>
              ) : (
                <div className="paidAt--false">Not Delivered</div>
              )}
              {order.isDelivered ? (
                <div className="deliveredAt--true">
                  {order.deliveredAt.substring(0, 10)}
                </div>
              ) : (
                <div className="deliveredAt--false">Not Delivered</div>
              )}

              <Link className="update" to={`/order/${order._id}/`}>
                🛠
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;
