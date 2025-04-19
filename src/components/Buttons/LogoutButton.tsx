import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/login/authSlice";

interface LogoutButtonProps {
}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    (dispatch as AppDispatch)(logout());
  };
  return (
    <button onClick={onLogout} style={buttonStyle}>
      Logout
    </button>
  );
};

export default LogoutButton;

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#f00",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: "16px",
};