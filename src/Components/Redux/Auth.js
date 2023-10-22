import { createSlice } from "@reduxjs/toolkit";


let Token = '' ;
let userLogin = false;
let username = null;
let useremail = null;
if(localStorage.idToken){
    Token = localStorage.idToken;
    userLogin = true;
    username = localStorage.UserName;
    useremail = localStorage.UserEmail;
}

const initialState = {
    idToken: Token,
    userName: username,
    userEmail: useremail,
    loginState: userLogin,
}

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers:{
     setLogin (state,action){
        const removeSpecialCharacters = (email) => {
            email = email.replace(/@/g, '');
            email = email.replace(/\./g, '');
            return email;
          };
          const cleanedEmail = removeSpecialCharacters(action.payload.email);
        state.tokenId = action.payload.idToken;
        state.userName = cleanedEmail ;
        state.userEmail=  action.payload.email
        localStorage.setItem('idToken', action.payload.idToken);
        localStorage.setItem('UserName', cleanedEmail);
        localStorage.setItem('UserEmail', action.payload.email);

        state.loginState = true;
     },
     setlogout (state){
        state.tokenId = null;
        state.userName = null;
        state.loginState = false;
        localStorage.removeItem('idToken');
        localStorage.removeItem('UserName');
        localStorage.removeItem('UserEmail');
     }
    }
})

export default AuthSlice;