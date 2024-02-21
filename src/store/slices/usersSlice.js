import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    extraReducers(builder) { // watches for actions not tied to this reducer
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
    },
});

export const usersReducer = usersSlice.reducer;

