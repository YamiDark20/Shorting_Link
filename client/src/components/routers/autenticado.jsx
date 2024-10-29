import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { DashboardPage } from '../pages/dashboard';

export const AutenticadoRoutes = ({theme, isToastVisible, setIsToastVisible}) => {
    return (
        <Routes>
            <Route path='/dashboard' element={<DashboardPage theme={theme} isToastVisible={isToastVisible} setIsToastVisible={setIsToastVisible} />} />
            <Route path='/' element={<HomePage theme={theme} />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};
