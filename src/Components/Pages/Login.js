import React, { useEffect, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import style from "./Page.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { Link , useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthAction } from '../Redux/Index'

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
  const dispatch = useDispatch()
  const [formIsValid, setFormIsValid] = useState(false);
  const [ForgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate()
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
        emailState.isValid && (passwordState.isValid || ForgotPassword)
      )
  }, [emailState.isValid, passwordState.isValid, ForgotPassword]);

  const HandleEmail = (e) => {
    dispatchEmail({ type: "input_val", val: e.target.value });
  };
  const HandlePassword = (e) => {
    dispatchPassword({ type: "input_val", val: e.target.value });
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      let UserData;
      if(!ForgotPassword){
           UserData = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCs_9RzobuwW0PZiNJs2YEVEiymzw9tj_s`,
      {
        method: "POST",
        body: JSON.stringify({
          email: emailState.value,
          password:passwordState.value,
          returnSecureToken: true,
        })
      })
    } else {
      UserData = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCs_9RzobuwW0PZiNJs2YEVEiymzw9tj_s`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType	: "PASSWORD_RESET",
          email: emailState.value
        })
      })
    }
      const data = await UserData.json();
      if (data.error) {
        throw new Error(data.error.message);
      }else{
        if(ForgotPassword){
          alert('Reset Password Link has been sent successfully')
         setForgotPassword(false)
        } else{
          dispatch(AuthAction.setLogin(data));
       alert('Log in successfull')
        navigate('/')}
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const HandleForgotPassword = ()=>{
    setForgotPassword(true);
  }
  return (
    <Card className={style.login}>
       <h1>Login</h1>
      <form onSubmit={HandleSubmit}>
        <Input
          id="Email"
          type="text"
          isValid={emailState.isValid}
          onChange={HandleEmail}
          value={emailState.value}
        />
       {!ForgotPassword && <Input
          id="Password"
          type="password"
          isValid={passwordState.isValid}
          onChange={HandlePassword}
          value={passwordState.value}
        />}
        <div className={style.actions}>
          <Button type="Submit" disabled={!formIsValid}>
          {ForgotPassword ? 'Reset Password' : 'Login'}
          </Button>
          <Link to='/createaccount'>Create New Account</Link>
          </div>
      </form>
          <button onClick={HandleForgotPassword}>Forgot password</button>
    </Card>
  );
}

export default Login;
