import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllLinksOfEtiqueta } from '../api/etiqueta_links.api'

export const fetchAllCategoriaLinks = createAsyncThunk('etiqueta_links/fetchAllCategoriaLinks', async (info_user) => {
    try{
        const categoria_links = await getAllLinksOfEtiqueta({
            "id_categoria": info_user.id_categoria
        });
          console.log(categoria_links.data, "mabbinfooll")
        return {"links": categoria_links.data, "etiqueta": info_user.etiqueta};
    } catch (error) {
        // console.log(error, "error")
        throw new Error("No tiene ningun link dicha etiqueta");
    }
});

// export const addEtiquetaLink = createAsyncThunk('etiquetas_link/addEtiquetaLink', async (info_link) => {
//     try{
//         console.log(info_link, "infoollw")
//         const etiquetas_link = await createEtiquetaLink({
//             "link_id": info_user.link_id,
//             "categoria_id": info_user.categoria_id,
//         });
//         // console.log(etiquetas_link.data, "maoooall")
//         if(etiquetas_link.data.id == undefined){
//             let mensaje_error = "";
//             for (const key in etiquetas_link.data) {
//                 // console.log(etiquetas_user.data[key], "maoooall")
//                 mensaje_error += etiquetas_link.data[key][0];
//             }
//             throw new Error(mensaje_error);
//         }
//         return etiquetas_link.data;
//     } catch (error) {
//         console.log(error, "error")
//         throw new Error(error);
//     }
// });

// export const deleteSelectedEtiqueta = createAsyncThunk('etiquetas_user/deleteSelectedEtiqueta', async (info_user) => {
//     await deleteEtiquetaUser(info_user);
//     return info_user;
//   });

const etiquetaLinksSlice = createSlice({
  name: 'etiqueta_links',
  initialState: {
    etiqueta_links: [],
    etiqueta_selected: "",
    status_etiqueta_links: 'idle',
    error: null
  },
  reducers: {
    emptyEtiquetaLinks: (state, action) => {
      state.etiqueta_links = [];
      state.etiqueta_selected = ""
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchAllCategoriaLinks.pending, (state) => {
            state.status_etiqueta_links = 'loading';
        })
        .addCase(fetchAllCategoriaLinks.fulfilled, (state, action) => {
            state.status_etiqueta_links = 'succeeded';
            state.etiqueta_links = action.payload.links;
            state.etiqueta_selected = action.payload.etiqueta;
        })
        .addCase(fetchAllCategoriaLinks.rejected, (state, action) => {
            state.status_etiqueta_links = 'failed';
            state.error = action.error.message;
        })
        // .addCase(addEtiquetaLink.fulfilled, (state, action) => {
        //     state.etiqueta_links.push(action.payload);
        // })
        // .addCase(addEtiquetaLink.rejected, (state, action) => {
        //     state.error = action.error.message;
        // })
        // .addCase(deleteSelectedEtiqueta.fulfilled, (state, action) => {
        //     state.etiquetas_user = state.etiquetas_user.filter((etiqueta_user) => etiqueta_user.id !== action.payload.id);
        // });
  },
});
export const { emptyEtiquetaLinks } = etiquetaLinksSlice.actions;
// export const { set_User } = usersSlice.actions;
export default etiquetaLinksSlice.reducer;
