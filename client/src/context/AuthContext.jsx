import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo);
            setUser(parsedUser);
            // Set default authorization header
            api.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/users/login', { email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        setUser(data);
        return data;
    };

    const register = async (name, email, phone, password, role) => {
        const { data } = await api.post('/users/register', { name, email, phone, password, role });
        // Auto-login after successful registration
        localStorage.setItem('userInfo', JSON.stringify(data));
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        setUser(data);
        return data;
    };

    const forgotPassword = async (email) => {
        const { data } = await api.post('/users/forgot-password', { email });
        return data;
    };

    const verifyResetCode = async (email, code) => {
        const { data } = await api.post('/users/verify-reset-code', { email, code });
        return data;
    };

    const resetPassword = async (email, code, newPassword) => {
        const { data } = await api.post('/users/reset-password', { email, code, newPassword });
        return data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            forgotPassword,
            verifyResetCode,
            resetPassword,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
