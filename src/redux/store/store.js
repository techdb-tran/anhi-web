import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../feature/users/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
},
});

export default store;