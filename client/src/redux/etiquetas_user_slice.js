import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEtiquetasUser, createEtiquetaUser, deleteEtiquetaUser } from '../api/etiquetas_user.api'

export const fetchAllCategoriasUser = createAsyncThunk('etiquetas_user/fetchAllCategoriasUser', async (info_user) => {
    try{
        // console.log(info_user, "infooll")
        const categorias_user = await getEtiquetasUser({
            "user_id": info_user.user_id
        });
          console.log(categorias_user.data, "infooll")
        return categorias_user.data;
    } catch (error) {
        console.log(error, "error")
        throw new Error("No tiene ningun link dicho usuario");
    }
});

export const addEtiquetaUser = createAsyncThunk('etiquetas_user/addEtiquetaUser', async (info_user) => {
    try{
        console.log(info_user, "infooll")
        const etiquetas_user = await createEtiquetaUser({
            "user_id": info_user.user_id,
            "etiqueta": info_user.etiqueta,
        });
        //   console.log(etiquetas_user, "infooll")
        if(etiquetas_user.data.id == undefined){
            let mensaje_error = "";
            for (const key in etiquetas_user.data) {
                // console.log(etiquetas_user.data[key], "maoooall")
                mensaje_error += etiquetas_user.data[key][0];
            }
            throw new Error(mensaje_error);
        }
        return etiquetas_user.data;
    } catch (error) {
        console.log(error, "error")
        throw new Error(error);
    }
});

export const deleteSelectedEtiqueta = createAsyncThunk('etiquetas_user/deleteSelectedEtiqueta', async (info_user) => {
    await deleteEtiquetaUser(info_user);
    return info_user;
  });

const etiquetasUserSlice = createSlice({
  name: 'etiquetas_user',
  initialState: {
    etiquetas_user: [],
    status_etiquetas_user: 'idle',
    error: null
  },
  reducers: {
    // set_User: (state, action) => {
    //     console.log(action.payload, "e73g7egjjj")
    //     state.users = [action.payload];
    //     state.token = action.payload["token"]
    // }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchAllCategoriasUser.pending, (state) => {
            state.status_etiquetas_user = 'loading';
        })
        .addCase(fetchAllCategoriasUser.fulfilled, (state, action) => {
            state.status_etiquetas_user = 'succeeded';
            state.etiquetas_user = action.payload;
        })
        .addCase(fetchAllCategoriasUser.rejected, (state, action) => {
            state.status_etiquetas_user = 'failed';
            state.error = action.error.message;
        })
        .addCase(addEtiquetaUser.fulfilled, (state, action) => {
            state.etiquetas_user.push(action.payload);
        })
        .addCase(addEtiquetaUser.rejected, (state, action) => {
            state.error = action.error.message;
        })
    //   .addCase(updateExistingMaestria.fulfilled, (state, action) => {
    //     const index = state.maestrias.findIndex((maestria) => maestria.codmaestria === action.payload.codmaestria);
    //     state.maestrias[index] = action.payload;
    //   })
    //   .addCase(updateExistingMaestria.rejected, (state, action) => {
    //     state.error = action.error.message;
    //   })
        .addCase(deleteSelectedEtiqueta.fulfilled, (state, action) => {
            state.etiquetas_user = state.etiquetas_user.filter((etiqueta_user) => etiqueta_user.id !== action.payload.id);
        });
  },
});
// export const { set_User } = usersSlice.actions;
export default etiquetasUserSlice.reducer;
