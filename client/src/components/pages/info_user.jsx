import "../../css/dashboard.css";
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

export const InfoUser = ({theme}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {etiquetas_user, status_etiquetas_user, error} = useSelector((state) => state.etiquetas_user);
    const [name_user, setNameUser] = useState(Cookies.get('name'));
    const [descripcion, setDescripcion] = useState("");
    const [link_original, setLinkOriginal] = useState("");
    const divUserRef = useRef(null);

    //   const handleClickOutside = (event) => {
    //     // Verifica si el clic fue fuera del mensaje
    //     if (divUserRef.current && !divUserRef.current.contains(event.target)) {
    //         setIsUserOptionVisible(false);
    //     }
    // };

    useEffect(() => {
        // if(etiquetas_user.length == 0 && status_etiquetas_user == 'idle'){
        //     // console.log("enttiejdkk", users)
        //     dispatch(fetchAllCategoriasUser({"user_id": id_user}));
        // }
        // console.log(theme, "jdiieeooo")

        // Agregar el evento de clic al documento
        // document.addEventListener('mousedown', handleClickOutside);

        // // Limpiar el evento al desmontar el componente
        // return () => {
        //     document.removeEventListener('mousedown', handleClickOutside);
        // };
    }, []);

    // const getErrorToastStyles = (screenWidth) => {
    //     if (screenWidth < 400) {
    //       return {
    //         fontSize: '10px',
    //         padding: '6px',
    //         background: "#101010",
    //         color: "#fff"
    //       };
    //     }else if (screenWidth > 400 && screenWidth < 590) {
    //       return {
    //         fontSize: '12px',
    //         padding: '6px',
    //         background: "#101010",
    //         color: "#fff"
    //       };
    //     } else if (screenWidth > 590 && screenWidth < 1000) {
    //       return {
    //         fontSize: '16px',
    //         padding: '6px',
    //         background: "#101010",
    //         color: "#fff"
    //       };
    //     } else if (screenWidth > 1000 && screenWidth < 1200) {
    //       return {
    //         fontSize: '18px',
    //         padding: '6px',
    //         background: "#101010",
    //         color: "#fff"
    //       };
    //     } else {
    //       return {
    //         fontSize: '20px',
    //         padding: '6px',
    //         background: "#101010",
    //         color: "#fff"
    //       };
    //     }
    //   };


    // const crear_etiqueta = () => {
    //     setIsToastVisible(true);
    //     setIsUserOptionVisible(false);
    //     return toast(
    //         (t) => (
    //             <EtiquetaCreatePage toast={toast} t={t} setIsToastVisible={setIsToastVisible} id_user={id_user} />
    //         ),
    //         {
    //             duration: Infinity,
    //             style: {
    //                 position: "relative",
    //                 top: "30vh",
    //                 // right: "30vw",
    //                 backgroundColor: '#141414',
    //                 color: "#fff",
    //                 width: "600px", // Establece el ancho deseado
    //                 maxWidth: "90%", // Asegúrate de que el toast no exceda el ancho de la pantalla
    //                 height:'0%',
    //         }}
    //     );
    // };

    // const delete_etiqueta = (info_etiqueta) => {
    //     setIsToastVisible(true);
    //     setIsUserOptionVisible(false);
    //     return toast(
    //         (t) => (
    //             <EtiquetaDeletePage toast={toast} t={t} setIsToastVisible={setIsToastVisible} info_etiqueta={info_etiqueta} />
    //         ),
    //         {
    //             duration: Infinity,
    //             style: {
    //                 position: "relative",
    //                 top: "35vh",
    //                 backgroundColor: "#101010",
    //                 color: "#fff"
    //         }}
    //     );
    // };

    // const handleLogout = async () => {
    //     try {
    //         console.log(Cookies.get("token"), "ajkskdkk")
    //         const res = await logoutUser({
    //             "token": Cookies.get("token")
    //         });
    //         dispatch(vaciar_User())
    //         // Elimina el token del almacenamiento local o del estado
    //         // localStorage.removeItem('token');
    //         console.log('Logged out successfully');
    //         Cookies.remove('name')
    //         Cookies.remove('email')

    //         Cookies.remove('id_user')
    //         Cookies.remove('token')
    //         setIsUserOptionVisible(false);
    //         navigate('/home')
    //     } catch (error) {
    //         console.error('Error logging out:', error);
    //     }
    // };
    return (
        <div className={`main_info_user ${theme == 'light' ? "light": "dark"}`}>
            <div className="main_update_user">
                <h1 className="titulo_update_user">Información General</h1>
                <h1 className="label_update_user">Nombre de Usuario</h1>
                <input type="text" className={`input_update_user ${theme == 'light' ? "light": "dark"}`} placeholder='Ingrese un nombre' value={name_user} onChange={(e) => {
                    setNameUser(e.target.value)
                }} />

                <h1 className="label_update_user">Email del Usuario</h1>
                <input type="text" className={`input_update_user ${theme == 'light' ? "light": "dark"} disable`} placeholder='Ingrese un nombre' disabled value={Cookies.get('email')} />

                <button className={`btn_update_user ${theme == 'light' ? "light": "dark"}`}>Logout</button>
            </div>
            {/* <div className="btn-user_opcion"> */}
            {/* <button className={`${theme == 'light' ? "light": "dark"}`} onClick={handleLogout}>Logout</button></div> */}

        </div>
    )
}
