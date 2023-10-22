import React from "react";
import { Link , useNavigate} from "react-router-dom";
import Button from "../UI/Button/Button";
import Style from "./NavBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AuthAction } from "../Redux/Index";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const HandleLogout = () => {
    dispatch(AuthAction.setlogout());
    navigate("/login");
  };
  return (
    <div className={Style.navbar}>
      <h2>MailBox</h2>

      {!Auth.loginState && (
        <Link to="./login">
          <h4>Login</h4>
        </Link>
      )}
      {Auth.loginState && <Button onClick={HandleLogout}>Logout</Button>}
    </div>
  );
}

export default NavBar;
