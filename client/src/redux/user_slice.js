import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status_user: 'idle',
    error: null,
    token: ""
  },
  reducers: {
    set_User: (state, action) => {
        console.log(action.payload, "e73g7egjjj")
        state.users = [action.payload];
        state.token = action.payload["token"]
    }
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchAllTipoMaestria.pending, (state) => {
    //     state.status_user = 'loading';
    //   })
    //   .addCase(fetchAllTipoMaestria.fulfilled, (state, action) => {
    //     state.status_user = 'succeeded';
    //     state.users = action.payload;
    //   })
    //   .addCase(fetchAllTipoMaestria.rejected, (state, action) => {
    //     state.status_user = 'failed';
    //     state.error = action.error.message;
    //   })
    //   .addCase(createNewMaestria.fulfilled, (state, action) => {
    //       state.maestrias.push(action.payload);
    //   })
    //   .addCase(createNewMaestria.rejected, (state, action) => {
    //     state.error = action.error.message;
    //   })
    //   .addCase(updateExistingMaestria.fulfilled, (state, action) => {
    //     const index = state.maestrias.findIndex((maestria) => maestria.codmaestria === action.payload.codmaestria);
    //     state.maestrias[index] = action.payload;
    //   })
    //   .addCase(updateExistingMaestria.rejected, (state, action) => {
    //     state.error = action.error.message;
    //   })
    //   .addCase(deleteSelectedMaestria.fulfilled, (state, action) => {
    //     state.maestrias = state.maestrias.filter((maestria) => maestria.id !== action.payload);
    //   });
  },
});
export const { set_User } = usersSlice.actions;
export default usersSlice.reducer;
