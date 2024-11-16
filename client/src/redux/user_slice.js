import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthUser, authCallbackUser } from "../api/auth_user.api";
import { updateUser } from "../api/user.api";

export const fetchAuthUser = createAsyncThunk('users/fetchAuthUser', async (info_user) => {
    try{

        const res = await getAuthUser();
        // setLoginUrl(res.data.url);
        return res.data.url;
    } catch (error) {
        console.log(error, "error")
        throw new Error("No tiene ningun link dicho usuario");
    }
});

export const fetchAuthCallbackUser = createAsyncThunk('users/fetchAuthCallbackUser', async (info_user) => {
    try{

        const res = await authCallbackUser({"located": info_user.located});
        // setLoginUrl(res.data.url);
        return res.data;
    } catch (error) {
        console.log(error, "error")
        throw new Error("No tiene ningun link dicho usuario");
    }
});

export const updateExistingUser = createAsyncThunk('users/updateExistingUser', async (info_user) => {
    try{

        const res = await updateUser({
            "id": info_user.id,
            "name": info_user.name,
            "email": info_user.email
        });
        // setLoginUrl(res.data.url);
        console.log(res.data, "lkaisioo")
        return res.data;
    } catch (error) {
        console.log(error, "error")
        throw new Error("No tiene ningun link dicho usuario");
    }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status_user: 'idle',
    error: null,
    token: "",
    loginUrl: null
  },
  reducers: {
    set_User: (state, action) => {
        // console.log(action.payload, "e73g7egjjj", action.payload["access_token"])
        state.users = [action.payload["user"]];
        state.token = action.payload["access_token"]
    },
    vaciar_User: (state, action) => {
        // console.log(action.payload, "e73g7egjjj", action.payload["access_token"])
        state.users = [];
        state.token = ""
    }
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchAuthUser.pending, (state) => {
    //     state.status_user = 'loading';
    //   })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        // state.status_user = 'succeeded';
        state.loginUrl = action.payload;
      })
      .addCase(fetchAuthUser.rejected, (state, action) => {
        // state.status_user = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchAuthCallbackUser.fulfilled, (state, action) => {
        state.status_user = 'succeeded';
        state.users = [action.payload["user"]];
        state.token = action.payload["access_token"]
      })
      .addCase(fetchAuthCallbackUser.rejected, (state, action) => {
        state.status_user = 'failed';
        state.error = action.error.message;
      })
    //   .addCase(createNewMaestria.fulfilled, (state, action) => {
    //       state.maestrias.push(action.payload);
    //   })
    //   .addCase(createNewMaestria.rejected, (state, action) => {
    //     state.error = action.error.message;
    //   })
      .addCase(updateExistingUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        state.users[index] = action.payload;
      })
      .addCase(updateExistingUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
    //   .addCase(deleteSelectedMaestria.fulfilled, (state, action) => {
    //     state.maestrias = state.maestrias.filter((maestria) => maestria.id !== action.payload);
    //   });
  },
});
export const { set_User, vaciar_User } = usersSlice.actions;
export default usersSlice.reducer;
