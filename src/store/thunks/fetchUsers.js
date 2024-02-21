import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await axios.get("http://localhost:3005/users");

    // // DEV ONLY!!! DELETE ONCE DONE WITH THE REQUEST
    // await pause(10000);

    return response.data;
});

// // DEV ONLY!!! DELETE ONCE DONE WITH THE REQUEST
// const pause = (duration) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, duration);
//     });
// }

export { fetchUsers };
