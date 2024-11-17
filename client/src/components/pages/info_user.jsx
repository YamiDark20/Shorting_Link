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
import { updateUser, deleteUser } from '../../api/user.api';
import { generarJsonLinks } from '../../api/links.api';
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

    // useEffect(() => {
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
    // }, []);

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

    const updateInfoUser = async () => {
        try {
            // console.log(Cookies.get("token"), "ajkskdkk")
            const res = await updateUser({
                "id": Cookies.get("id_user"),
                "name": name_user,
                "email": Cookies.get("email")
            });
            Cookies.set('name', name_user, {
                secure: true,
                sameSite: 'strict',
                expires: 1
            })
            toast.success("Se ha actualizado correctamente la informacion del usuario.", {
                position: 'bottom-right',
                    style: getErrorToastStyles(window.innerWidth),
                    className: 'toast'
            })
            // dispatch(vaciar_User())
            // Elimina el token del almacenamiento local o del estado
            // localStorage.removeItem('token');
            // console.log('Logged out successfully');
            // Cookies.remove('name')
            // Cookies.remove('email')

            // Cookies.remove('id_user')
            // Cookies.remove('token')
            // setIsUserOptionVisible(false);
            // navigate('/home')
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    const deleteExistsUser = async () => {
        try {
            // console.log(Cookies.get("token"), "ajkskdkk")
            const res = await deleteUser({
                "id": Cookies.get("id_user")
            });
            toast.success("Se ha eliminado correctamente la informacion del usuario.", {
                position: 'bottom-right',
                    style: getErrorToastStyles(window.innerWidth),
                    className: 'toast'
            })
            dispatch(vaciar_User())
            // Elimina el token del almacenamiento local o del estado
            // localStorage.removeItem('token');
            // console.log('Logged out successfully');
            Cookies.remove('name')
            Cookies.remove('email')

            Cookies.remove('id_user')
            Cookies.remove('token')
            // setIsUserOptionVisible(false);
            navigate('/home')
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const exportar_links = async () => {
        try {
            // console.log(Cookies.get("token"), "ajkskdkk")
            const res = await generarJsonLinks({
                "id_user": Cookies.get("id_user")
            });
            const json = JSON.stringify(res.data);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');  

            link.href = url;
            link.setAttribute('download', 'links.json');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error for downloading the file:', error);
        }
      };
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

                <button className={`btn_update_user ${theme == 'light' ? "light": "dark"}`} onClick={() => updateInfoUser()}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none"><path stroke="currentColor" strokeLinejoin="round" strokeWidth="4" d="M6 9a3 3 0 0 1 3-3h25.281L42 13.207V39a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z"/><path d="M24.008 6L24 13.385c0 .34-.448.615-1 .615h-8c-.552 0-1-.275-1-.615V6" clipRule="evenodd"/><path stroke="currentColor" strokeLinejoin="round" strokeWidth="4" d="M24.008 6L24 13.385c0 .34-.448.615-1 .615h-8c-.552 0-1-.275-1-.615V6z"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 6h25.281M14 26h20m-20 8h10.008"/></g></svg> Guardar</button>

                {/* <button className={`btn_update_user ${theme == 'light' ? "light": "dark"}`}>Logout</button> */}
            </div>

            <div className="main_update_user">
                <h1 className="titulo_update_user">Opciones de la cuenta</h1>

                <h1 className="label_update_user">Exportar Links</h1>

                <button className={`btn_update_user ${theme == 'light' ? "light": "dark"}`} onClick={() => exportar_links()}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.877a2 2 0 0 0 1.94-1.515L22 17"/></svg> Exportar Links</button>
                <br/>

                <h1 className="label_update_user">Eliminar Cuenta</h1>

                <button className={`btn_delete_user`}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4"><path d="M9 10v34h30V10z"/><path strokeLinecap="round" d="M20 20v13m8-13v13M4 10h40"/><path d="m16 10l3.289-6h9.488L32 10z"/></g></svg> Eliminar Cuenta</button>
            </div>
            {/* <div className="btn-user_opcion"> */}
            {/* <button className={`${theme == 'light' ? "light": "dark"}`} onClick={handleLogout}>Logout</button></div> */}

        </div>
    )
}
