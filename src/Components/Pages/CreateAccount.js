import React, { useEffect, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import style from "./Page.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { Link ,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthAction } from "../Redux/Index";

const emailReduser = (state, action) => {
  if (action.type === "input_val") {
    return { value: action.val, isValid: action.val.includes("@") };
  } else if (action.type === "input_valid") {
    return { value: state.value, isValid: action.isValid };
  }
  return { value: "", isValid: null };
};
const passwordReduser = (state, action) => {
  if (action.type === "input_val") {
    return { value: action.val, isValid: action.val.trim().length > 7 };
  } else if (action.type === "input_valid") {
    return { value: state.value, isValid: action.isValid };
  }
  return { value: "", isValid: null };
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReduser, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReduser, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
      setFormIsValid(
        emailState.isValid && passwordState.isValid && ConfirmPassword === passwordState.value
      )
  }, [emailState.isValid, passwordState, ConfirmPassword]);

  const HandleEmail = (e) => {
    dispatchEmail({ type: "input_val", val: e.target.value });
  };
  const HandlePassword = (e) => {
    dispatchPassword({ type: "input_val", val: e.target.value });
  };
  const HandleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const VarifyUser = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCs_9RzobuwW0PZiNJs2YEVEiymzw9tj_s`,
      {
        method: "POST",
        body: JSON.stringify({
          email: emailState.value,
          password:passwordState.value,
          returnSecureToken: true,
        })
      });
      const data = await VarifyUser.json();
      if (data.error) {
        throw new Error(data.error.message);
      }else{
        dispatch(AuthAction.setLogin(data))
     alert('Account created successfully');
       navigate('/')
      }
    } catch (error) {
      alert(error.message);
    }
  
  };

  return (
    <Card className={style.login}>
       <h1>Sign Up</h1>
      <form onSubmit={HandleSubmit}>
        <Input
          id="Email"
          type="text"
          isValid={emailState.isValid}
          onChange={HandleEmail}
          value={emailState.value}
        />
        <Input
          id="Password"
          type="password"
          isValid={passwordState.isValid}
          onChange={HandlePassword}
          value={passwordState.value}
        />
        <Input
          id="ConfirmPassword"
          type="password"
          state={ConfirmPassword}
          onChange={HandleConfirmPassword}
          value={ConfirmPassword}
        />

        <div className={style.actions}>
          <Button type="submit" disabled={!formIsValid}>
          Create Account
          </Button>
       
        <Link to='/login' >Already have account? Try Login</Link>
          </div>
      </form>
    </Card>
  );
}

export default Login;
