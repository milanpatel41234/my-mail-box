import { createSlice } from "@reduxjs/toolkit";

const MailSlice = createSlice({
    name: 'Mail',
    initialState: {
        item : null
    },
    reducers: {
        setCurrentMail (state,action){
            state.item = action.payload;
        }
    }
})

export default MailSlice;