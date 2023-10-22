import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth";
import MailSlice from "./Mail";

const store = configureStore({
    reducer : {Auth : AuthSlice.reducer , Mail : MailSlice.reducer}
})
export const AuthAction = AuthSlice.actions;
export const MailAction = MailSlice.actions;
export default store;