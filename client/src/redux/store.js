import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user_slice';
import linksUserReducer from './links_user_slice';
import etiquetasUserReducer from './etiquetas_user_slice';
import etiquetaLinksReducer from './etiqueta_links_slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    links_user: linksUserReducer,
    etiquetas_user: etiquetasUserReducer,
    etiqueta_links: etiquetaLinksReducer,
  },
});
