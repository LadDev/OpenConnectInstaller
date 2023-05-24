import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";

import { logoutUser } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

const Logout = (props) => {
  const dispatch = useDispatch();

  const { isUserLogout } = useSelector((state) => ({
    isUserLogout: state.Login.isUserLogout,
  }));

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  if (isUserLogout) {
    return <Redirect to="/login" />;
  }

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);