import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import {Toaster} from 'react-hot-toast'
import {AutenticadoRoutes} from './components/routers/autenticado'
import {HomePage} from './components/pages/home'
import {NavegationPage} from './components/navigation'
import './index.css';
import '../src/css/footer.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
// import GoogleCallback from './components/pages/GoogleCallback';
import { DashboardPage } from './components/pages/dashboard';

function App() {
  const [count, setCount] = useState(0)
  const [productos, setProductos] = useState([]);
  const [btnTema, setBtnTema] = useState(false);
  const [btnUser, setBtnUser] = useState(false);
//   const [modeTheme, setModeTheme] = useState(false);
  const [theme, setTheme] = useState('light');
  const {users, token} = useSelector((state) => state.user);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
}, [theme]);

//   const toggleTheme = (newtheme) => {
//     setTheme(newtheme);
//     };

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/api/categoria/links/3')
    //         .then(response => {
    //             setProductos(response.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);
    // const changeBackgroundColor = (colorClass) => {
    //     // Remover todas las clases de color de fondo
    //     document.body.classList.remove('bg-dark', 'bg-light');
    //     // Agregar la nueva clase
    //     document.body.classList.add(colorClass);
    // };

    return (
        <BrowserRouter className={``}>
            <NavegationPage btnTema={btnTema} setBtnTema={setBtnTema} btnUser={btnUser} setBtnUser={setBtnUser} setTheme={setTheme} isToastVisible={isToastVisible} theme={theme} />
            <div className="container">
                <Routes>
                    {/* {
                        token != ""
                            ? <Route path="/*" element={<AutenticadoRoutes theme={theme} isToastVisible={isToastVisible} setIsToastVisible={setIsToastVisible} />} />
                            : <Route path="/*" element={<HomePage theme={theme} />} />
                        } */}
                        <Route path="/*" element={<HomePage theme={theme} />} />
                        <Route path='*' element={<Navigate to='/' replace />} />
                        <Route path="/dashboard" element={<DashboardPage theme={theme} isToastVisible={isToastVisible} setIsToastVisible={setIsToastVisible} />}></Route>

                </Routes>
                <footer className={`${theme == 'light' ? "light": "dark"} ${isToastVisible ? "active": ""}`}>
                    <p>Hecho por leonel araujo</p>
                </footer>
            </div>
            <Toaster />
        </BrowserRouter>
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    //   <div>
    //         {productos.map(producto => (
    //             <div key={producto.id}>{producto.descripcion}</div>
    //         ))}
    //     </div>
    // </>
    )
}

export default App
