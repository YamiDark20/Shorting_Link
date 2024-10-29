import "../../css/etiqueta_create.css";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLinkUser } from "../../redux/links_user_slice";
import {toast} from 'react-hot-toast'
import { addEtiquetaUser } from "../../redux/etiquetas_user_slice";

export const EtiquetaCreatePage = ({toast, t, setIsToastVisible, id_user}) => {
    const dispatch = useDispatch();
    const {links_user, status_links_user, error} = useSelector((state) => state.links_user);
    const [short_link, setShortLink] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [link_original, setLinkOriginal] = useState("");
    const [nombreEtiqueta, setNombreEtiqueta] = useState("");

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

    const crearEtiqueta = () => {
        if(nombreEtiqueta == ""){
            toast.error(`El campo nombreEtiqueta esta vacia.`, {
                duration: 600,
                position: 'bottom-right',
                style: getErrorToastStyles(window.innerWidth)
            })
        }else{
            dispatch(addEtiquetaUser({
                "etiqueta": nombreEtiqueta,
                "user_id": id_user,
            })).unwrap()
            .then(() => {
                toast.success("Se ha creado correctamente la etiqueta.", {
                position: 'bottom-right',
                    style: getErrorToastStyles(window.innerWidth),
                    className: 'toast'
                })
                setIsToastVisible(false)
                toast.dismiss(t.id)
            })
            .catch((error) => {
                // console.log(error)
                toast.error(error.message, {
                    duration: 600,
                    position: 'bottom-right',
                    style: getErrorToastStyles(window.innerWidth)
                })
            });
        }
    }
    return (
        <div className='main_etiqueta_create'>
            <div className="div_titulo_etiqueta_create">
                <h1 className='titulo_etiqueta_create'>Crear Etiqueta</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => {
                    setIsToastVisible(false)
                    toast.dismiss(t.id)
                }}><path fill="currentColor" fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-1.2a8.8 8.8 0 1 0 0-17.6a8.8 8.8 0 0 0 0 17.6m.849-8.8l3.11 3.111l-.848.849L12 12.849l-3.111 3.11l-.849-.848L11.151 12l-3.11-3.111l.848-.849L12 11.151l3.111-3.11l.849.848z"/></svg>
            </div>
            <p className='label_nombre_etiqueta_create'>Nombre de Etiqueta</p>
            <input type="text" className="nombre_etiqueta_create" placeholder='Ingrese un nombre' value={nombreEtiqueta} onChange={(e) => {
                const regex_short_link = /^[a-zA-Z0-9-_]+$/;
                if(regex_short_link.test(e.target.value)){
                    setNombreEtiqueta(e.target.value)
                }
            }} />
            <div className='opciones_etiqueta_create'>
                <button className='' onClick={() => crearEtiqueta()}>Guardar</button>
                <button className=''  onClick={() => {
                    setIsToastVisible(false)
                    toast.dismiss(t.id)
                }}>Salir</button>
            </div>
        </div>
    )
}
