import "../../css/user_opciones.css";
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEtiquetaUser, fetchAllCategoriasUser } from "../../redux/etiquetas_user_slice";
import { fetchAllCategoriaLinks, emptyEtiquetaLinks } from "../../redux/etiqueta_links_slice";
import {EtiquetaCreatePage} from './etiqueta_create'
import {EtiquetaDeletePage} from './etiqueta_delete'
import {toast} from 'react-hot-toast'
import Cookies from 'js-cookie';
import { logoutUser } from "../../api/auth_user.api";
import { vaciar_User } from "../../redux/user_slice";
import { useNavigate } from "react-router-dom";

export const UserOptions = ({setIsUserOptionVisible, isUserOptionVisible, theme, setIsToastVisible}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {etiquetas_user, status_etiquetas_user, error} = useSelector((state) => state.etiquetas_user);
    const [short_link, setShortLink] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [link_original, setLinkOriginal] = useState("");
    const divUserRef = useRef(null);

      const handleClickOutside = (event) => {
        // Verifica si el clic fue fuera del mensaje
        if (divUserRef.current && !divUserRef.current.contains(event.target)) {
            setIsUserOptionVisible(false);
        }
    };

    useEffect(() => {
        // if(etiquetas_user.length == 0 && status_etiquetas_user == 'idle'){
        //     // console.log("enttiejdkk", users)
        //     dispatch(fetchAllCategoriasUser({"user_id": id_user}));
        // }
        console.log(theme, "jdiieeooo")

        // Agregar el evento de clic al documento
        document.addEventListener('mousedown', handleClickOutside);

        // Limpiar el evento al desmontar el componente
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getErrorToastStyles = (screenWidth) => {
        if (screenWidth < 400) {
          return {
            fontSize: '10px',
            padding: '6px',
            background: "#101010",
            color: "#fff"
          };
        }else if (screenWidth > 400 && screenWidth < 590) {
          return {
            fontSize: '12px',
            padding: '6px',
            background: "#101010",
            color: "#fff"
          };
        } else if (screenWidth > 590 && screenWidth < 1000) {
          return {
            fontSize: '16px',
            padding: '6px',
            background: "#101010",
            color: "#fff"
          };
        } else if (screenWidth > 1000 && screenWidth < 1200) {
          return {
            fontSize: '18px',
            padding: '6px',
            background: "#101010",
            color: "#fff"
          };
        } else {
          return {
            fontSize: '20px',
            padding: '6px',
            background: "#101010",
            color: "#fff"
          };
        }
      };


    const crear_etiqueta = () => {
        setIsToastVisible(true);
        setIsUserOptionVisible(false);
        return toast(
            (t) => (
                <EtiquetaCreatePage toast={toast} t={t} setIsToastVisible={setIsToastVisible} id_user={id_user} />
            ),
            {
                duration: Infinity,
                style: {
                    position: "relative",
                    top: "30vh",
                    // right: "30vw",
                    backgroundColor: '#141414',
                    color: "#fff",
                    width: "600px", // Establece el ancho deseado
                    maxWidth: "90%", // Asegúrate de que el toast no exceda el ancho de la pantalla
                    height:'0%',
            }}
        );
    };

    const delete_etiqueta = (info_etiqueta) => {
        setIsToastVisible(true);
        setIsUserOptionVisible(false);
        return toast(
            (t) => (
                <EtiquetaDeletePage toast={toast} t={t} setIsToastVisible={setIsToastVisible} info_etiqueta={info_etiqueta} />
            ),
            {
                duration: Infinity,
                style: {
                    position: "relative",
                    top: "35vh",
                    backgroundColor: "#101010",
                    color: "#fff"
            }}
        );
    };

    const handleLogout = async () => {
        try {
            console.log(Cookies.get("token"), "ajkskdkk")
            const res = await logoutUser({
                "token": Cookies.get("token")
            });
            dispatch(vaciar_User())
            // Elimina el token del almacenamiento local o del estado
            // localStorage.removeItem('token');
            console.log('Logged out successfully');
            Cookies.remove('name')
            Cookies.remove('email')

            Cookies.remove('id_user')
            Cookies.remove('token')
            setIsUserOptionVisible(false);
            navigate('/home')
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <div className={`main_user_opcion ${theme == 'light' ? "light": "dark"}`} id="div_user_opcion" ref={divUserRef}>
            <h1 className="titulo_user_opcion">{Cookies.get("name")}</h1>
            <h1 className="titulo_user_opcion">{Cookies.get("email")}</h1>
            <div className="btn-user_opcion">
            <button className={`${theme == 'light' ? "light": "dark"}`} onClick={handleLogout}>Logout</button></div>
            {/* <div className="list-etiquetas">
                {etiquetas_user.map(etiqueta_user => (
                    <div className="row-etiquetas" key={etiqueta_user.id}>
                        <p onClick={() =>{
                            dispatch(fetchAllCategoriaLinks({
                                "id_categoria": etiqueta_user.id,
                                "etiqueta": etiqueta_user.etiqueta
                            })).unwrap()
                            .catch((error) => {
                                // console.log(error)
                                toast.error(error.message, {
                                    duration: 600,
                                    position: 'bottom-right',
                                    style: getErrorToastStyles(window.innerWidth)
                                })
                            });
                        }}>{etiqueta_user.etiqueta}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => {
                            delete_etiqueta({"id": etiqueta_user.id})
                        }}><path fill="currentColor" fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-1.2a8.8 8.8 0 1 0 0-17.6a8.8 8.8 0 0 0 0 17.6m.849-8.8l3.11 3.111l-.848.849L12 12.849l-3.111 3.11l-.849-.848L11.151 12l-3.11-3.111l.848-.849L12 11.151l3.111-3.11l.849.848z"/></svg>
                    </div>
                ))}

                {etiquetas_user.length == 0 && status_etiquetas_user == 'idle' ?<div className="sin_etiquetas">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M4 4h3v1H4v3H3V5H0V4h3V1h1zM1 14.5V9h1v5h12V7H8V6h6V4H8V3h6.5l.5.5v11l-.5.5h-13z" clipRule="evenodd"/></svg>
                    <p>No hay etiquetas</p>
                </div>: null}
            </div>

            <div className="btn-etiquetas">
                <button type="button" className={` ${theme == 'light' ? "light": "dark"}`} onClick={() => dispatch(emptyEtiquetaLinks())}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none"><g clipPath="url(#IconifyId191b9645b08e07dfa0)"><path fill="currentColor" fillRule="evenodd" d="M11.995.667a.75.75 0 1 0-1.49.166L11.19 7h-.867c-1.64 0-2.896 1.449-3.197 3.06a12.6 12.6 0 0 1-1.2 3.44C5.434 14.448 5 15 5 15h8.5s2.08-1.734 2.488-5.49C16.14 8.094 14.91 7 13.488 7H12.7zM3.75 2.5a.75.75 0 1 0 0 1.5h4.5a.75.75 0 0 0 0-1.5zM.75 6a.75.75 0 1 0 0 1.5h5.5a.75.75 0 0 0 0-1.5zM1 10.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75m6.593 3.25c.393-.866.78-1.94 1.008-3.165C8.819 9.167 9.646 8.5 10.322 8.5h3.167c.332 0 .618.13.797.303a.63.63 0 0 1 .21.545c-.175 1.622-.708 2.779-1.173 3.514a6 6 0 0 1-.461.638h-.999c.539-.706.887-1.728.887-2.75H12c-.351 1.229-1.072 2.088-2.162 2.75z" clipRule="evenodd"/></g><defs><clipPath id="IconifyId191b9645b08e07dfa0"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs></g></svg> Limpiar Etiquetas</button>
                <button type="button" className={` ${theme == 'light' ? "light": "dark"}`} onClick={() => {
                    crear_etiqueta()
                }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z"/><path fill="currentColor" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z"/></svg> Crear Etiqueta</button> */}
            {/* </div> */}
        </div>
    )
}
