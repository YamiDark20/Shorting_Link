import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLinksUser, createLinksUser, updateLinksUser, deleteLinksUser, getInfoLinkUser } from '../api/links_user.api'
import { createEtiquetaLink } from '../api/etiqueta_links.api'

export const fetchAllLinksUser = createAsyncThunk('links_user/fetchAllLinksUser', async (info_user) => {
    try{
        // console.log(info_user, "infooll")
        const links_user = await getLinksUser({
            "id_user": info_user.id_user
        });
          console.log(links_user.data, "infooll")
        return links_user.data;
    } catch (error) {
        console.log(error, "error")
        throw new Error("No tiene ningun link dicho usuario");
    }
});

export const addLinkUser = createAsyncThunk('links_user/addLinkUser', async (info_user) => {
    try{
        console.log(info_user, "infooll")
        const links_user = await createLinksUser({
            "user_id": info_user.user_id,
            "short_link": info_user.short_link,
            "descripcion": info_user.descripcion,
            "link_original": info_user.link_original,
        });
          console.log(links_user, "infooll")
        if(links_user.data.id == undefined){
            let mensaje_error = "";
            for (const key in links_user.data) {
                console.log(links_user.data[key], "maoooall")
                mensaje_error += links_user.data[key][0];
            }
            throw new Error(mensaje_error);
        }

        if(info_user.categoria_id != -1){
            const etiquetas_link = await createEtiquetaLink({
            "link_id": links_user.data.id,
            "categoria_id": info_user.categoria_id,
            });
            // console.log(etiquetas_link.data, "maoooall")
            if(etiquetas_link.data.id == undefined){
                let mensaje_error = "";
                for (const key in etiquetas_link.data) {
                    // console.log(etiquetas_user.data[key], "maoooall")
                    mensaje_error += etiquetas_link.data[key][0];
                }
                throw new Error(mensaje_error);
            }
        }
        return links_user.data;
    } catch (error) {
        console.log(error, "error")
        throw new Error(error);
    }
});

export const updatingLinkUser = createAsyncThunk('links_user/updatingLinkUser', async (info_user) => {
    try{
        const links_user = await updateLinksUser({
            "id": info_user.id,
            "short_link_anterior": info_user.short_link_anterior,
            "user_id": info_user.user_id,
            "short_link": info_user.short_link,
            "descripcion": info_user.descripcion,
            "link_original": info_user.link_original,
        });
        if(Object.keys(links_user.data).length != 4){
            let mensaje_error = "";
            for (const key in links_user.data) {
                mensaje_error += links_user.data[key][0];
            }
            throw new Error(mensaje_error);
        }

        const res = await getInfoLinkUser({
            "id_user": info_user.user_id,
            "short_link": info_user.short_link,
        });
        return res.data;
    } catch (error) {
        console.log(error, "error")
        throw new Error(error);
    }
});

export const deleteSelectedLink = createAsyncThunk('links_user/deleteSelectedLink', async (info_user) => {
    await deleteLinksUser(info_user);
    return info_user;
  });

const linksUserSlice = createSlice({
  name: 'links_user',
  initialState: {
    links_user: [],
    status_links_user: 'idle',
    error: null,
    // id_link_create: -1
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
        .addCase(fetchAllLinksUser.pending, (state) => {
            state.status_links_user = 'loading';
        })
        .addCase(fetchAllLinksUser.fulfilled, (state, action) => {
            state.status_links_user = 'succeeded';
            state.links_user = action.payload;
        })
        .addCase(fetchAllLinksUser.rejected, (state, action) => {
            state.status_links_user = 'failed';
            state.error = action.error.message;
        })
        .addCase(addLinkUser.fulfilled, (state, action) => {
            state.links_user.push(action.payload);
        })
        .addCase(addLinkUser.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(updatingLinkUser.fulfilled, (state, action) => {
            const index = state.links_user.findIndex((link) => link.id == action.payload.id);
            console.log(state.links_user[index], action.payload, index, state.links_user)

            state.links_user[index] = action.payload;
        })
        .addCase(updatingLinkUser.rejected, (state, action) => {
            state.error = action.error.message;
        })
        .addCase(deleteSelectedLink.fulfilled, (state, action) => {
            state.links_user = state.links_user.filter((link_user) => link_user.id !== action.payload.id);
        });
  },
});
// export const { set_User } = usersSlice.actions;
export default linksUserSlice.reducer;
