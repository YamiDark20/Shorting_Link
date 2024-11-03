
import PhUserCircleBold from '../svg/PhUserCircleBold.svg';
import "../css/navigation.css"
import FluentDarkTheme20Filled from '../svg/FluentDarkTheme20Filled.svg';
import BiGithub from '../svg/BiGithub.svg';
import IlUrl from '../svg/IlUrl.svg';
import MaterialSymbolsLightMode from '../svg/MaterialSymbolsLightMode.svg';
import MaterialSymbolsDarkModeOutlineRounded from '../svg/MaterialSymbolsDarkModeOutlineRounded.svg';
import MaterialSymbolsArrowCircleRightRounded from '../svg/MaterialSymbolsArrowCircleRightRounded.svg';
import { getAuthUser } from "../api/auth_user.api";
// import FlowbiteFaceGrinSolid from '../svg/FlowbiteFaceGrinSolid.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { set_User } from "../redux/user_slice";
import { useRef, useEffect, useState } from 'react';
export const NavegationPage = ({btnTema, setBtnTema, btnUser, setBtnUser, setTheme, isToastVisible}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {users, token} = useSelector((state) => state.user);
    const [loginUrl, setLoginUrl] = useState(null);
    const divNavRef = useRef(null);
    useEffect(() => {
        async function loadURLAuth(){
            // if(tiposcoordinador.length == 0){
                const res = await getAuthUser();
                setLoginUrl(res.data.url);
                console.log(res.data)
            // }
        }
        console.log(token, "jskkdkdk")
        loadURLAuth()
    }, []);
    const handleClickOutside = (event) => {
        // Verifica si el clic fue fuera del mensaje
        if (divNavRef.current && !divNavRef.current.contains(event.target)) {
            setBtnTema(false);
        }
    };

    useEffect(() => {
        // Agregar el evento de clic al documento
        document.addEventListener('mousedown', handleClickOutside);

        // Limpiar el evento al desmontar el componente
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getUser = () => {
        dispatch(set_User({"user": {"id": 1, "name": "Marialejandra Kasmin Moya", "email": "mariale_moya2002@gmail.com"}, "access_token": "63y63687eh37tte6377te73", "token_type": "Bearer"}));
        setBtnUser(!btnUser)
        navigate('/dashboard')
    }
    return (
        <aside className={`sidebar  ${isToastVisible ? "active" : ""}`}>
            <div className='inner'>
                <header>
                    <button type="button" className='sidebar-burger'><span><span className='icon'>ShortURL64<img src={IlUrl} /></span></span></button>
                    {/* <img src={logo} alt="" /> */}
                </header>
                <nav>
                    <button type="button" onClick={() => setBtnTema(!btnTema)}>
                        {/* <span className="icon"></span> #1659df*/}
                        <img src={FluentDarkTheme20Filled} className={`icon`} />
                        <p>Tema</p>
                    </button>
                    <button type="button">
                        <img src={BiGithub} className={`icon `} />
                        <p>Git</p>
                    </button>
                    {token == "" ? <a href={loginUrl}>
                        <img src={MaterialSymbolsArrowCircleRightRounded} className={`icon `} />
                        <p>Iniciar Sesion</p>
                    </a>:<button type="button" onClick={() => getUser()}>
                        <img src={PhUserCircleBold} className={`icon `} />
                        <p>User</p>
                    </button>}
                    {/* <button type="button">
                        <img src={OcticonProject} className={`icon `} />
                        <p>Proyectos</p>
                    </button>
                    <button type="button">
                        <img src={GameIconsSkills} className={`icon `} />
                        <p>Herramientas</p>
                    </button> */}
                </nav>
            </div>
            {/* <div className={`fixed z-10 top-11 right-2 transform -translate-x-1/4 max-[600px]:w-[110px] max-[600px]:top-8 max-[600px]:-translate-x-1/4 max-[600px]:right-1 lg:top-12 lg:right-0 w-300 h-200 text-sky-100 bg-slate-700 rounded-lg min-[1250px]:rounded-xl min-[1250px]:top-16 min-[1250px]:p-2 max-[328px]:w-[85px] max-[328px]:top-6 max-[328px]:right-2`}></div> */}
            { btnTema
                ? <div className={`mensajeTema ${btnTema ? "active" : ""}`} ref={divNavRef}>

                <p className='titulo'>Temas</p>
                {/* <hr /> */}
                <div className='linea'></div>
                <p className='opciones' onClick={() => {
                    setTheme('dark')
                }}>
                <img src={MaterialSymbolsDarkModeOutlineRounded} className={`icon `} /> Oscuro</p>
                <p className='opciones' onClick={() => {
                    setTheme('light')
                }}>
                <img src={MaterialSymbolsLightMode} className={`icon `} /> Claro</p>
                </div>: null
            }
        </aside>
    )
}
