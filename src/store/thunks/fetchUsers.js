// Steps for data fetching with Async Thunk Function:
// 1. create new file for your thunk and name it after the purpose of the request - fetchUsers.js
// 2. create the thunk, give it a base type that describes the purpose of the request - "users/fetch"
// 3. in the thunk make the request, return the data that you want to use in the reducer
// 4. in the slice, add `extraReducers`, watching for the action types made by the thunk - usersSlice.js, fetchUsers.pending, fetchUsers.fulfilled, fetchUsers.rejected
// 5. export the thunk from the store/index.js file - `export * from "./thunks/fetchUsers";`
// 6. when a user does something, dispatch the thunk function to run it

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  return response.data;
});

export { fetchUsers };
