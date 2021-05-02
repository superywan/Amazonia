import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, deleteUser } from "../../redux/actions/userActions";
import "../../styles/screens/userListScreen/userListScreen.css";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading: userListLoading, error: userListError, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: deleteSuccess } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, deleteSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm(`Are you sure want to delete user?`)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="userList">
      <h1 className="userList__title">Users</h1>
      {userListLoading ? (
        <h3 className="userList__loading">Loading...</h3>
      ) : userListError ? (
        <h3 className="userList__error">{userListError}</h3>
      ) : (
        <div className="userList__users">
          {users.map((user, index) => (
            <div key={user._id} className="userList__users--user">
              <div className="user__index">{index + 1}</div>
              <div className="user__id">{user._id}</div>
              <div className="user__name">{user.name}</div>
              <div className="user__email">{user.email}</div>
              {user.isAdmin ? (
                <div className="user__isAdmin">Admin</div>
              ) : (
                <div className="user__isAdmin">User</div>
              )}
              <Link
                className="user__update"
                to={`/admin/user/${user._id}/edit`}
              >
                🛠
              </Link>
              <button
                className="user__delete"
                onClick={() => deleteHandler(user._id)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserListScreen;
