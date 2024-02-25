// Steps for data fetching with Redux Toolkit Query:
// 1. identify a group of related requests that your app needs to make
// 2. make a new file that will create the api - albumsApi.js
// 3. the api needs to store a ton of state related data, request, status, errors. Add a `reducerPath`
// 4. the api needs to know how and where to send requests. Add a `baseQuery`
// 5. add `endpoints`, one for each kind of request you want to make. Reqs that read data are queries, write data are mutations.
// 3. export all the auto generated hooks - `useFetchAlbumsQuery`
// 4. connect the api to the store. Reducer, Middleware and Listeners
// 5. export the hooks from the store/index.js
// 6. use the generated hooks in a component

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // If we miss `/react` the createApi will NOT create the custom hooks!!!
import { faker } from "@faker-js/faker";

// const pause = (duration) => { // used for artificially introducing a pause while fetching data
//     return new Promise((resolve) => {
//         setTimeout(resolve, duration);
//     })
// }

const albumsApi = createApi({
  reducerPath: "albums", // where the data associated to this api appears in the top level state object
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005", // the api server
    // fetchFn: async (...args) => { // used to override the default fetch function used by Redux Toolkit Query
    //     await pause(1000);
    //     return fetch(...args);
    // }
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          // works with `providesTags`;
          return [{ type: "Album", id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          // works with `providesTags`;
          return [{ type: "UsersAlbums", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              title: faker.commerce.productName(),
              userId: user.id,
            },
          };
        },
      }),
      fetchAlbums: builder.query({
        // fetchAlbums is used to auto create the hook `useFetchAlbumsQuery`
        // query means we are going to read data;
        providesTags: (result, error, user) => {
          // works with `invalidatesTags`; `fetchAlbums` will auto run after the `addAlbum` OR `removeAlbum` request finishes
          const albumsTags = result.map((album) => ({
            type: "Album",
            id: album.id,
          }));
          // assigning multiple different Tags to the endpoint gives us more flexibility as to when to re-run the request!!!
          return [{ type: "UsersAlbums", id: user.id }, ...albumsTags]; // `type` + `id` is what uniquely ifentifies the `fetchAlbums` for which user or album should be run
        },
        query: (user) => {
          // means to pass `user` when using the hook - useFetchAlbumsQuery(user)
          return {
            url: "/albums", // path relative to the baseUrl
            params: {
              userId: user.id, // query string for the request
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
