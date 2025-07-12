import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import useThemeMode from '../Hooks/useThemeMode';

const AuthProvider = ({children}) => {
    const [user,SetUser]=useState(null);
    const {theme,toggleTheme}=useThemeMode();

    const userInfo={
        user,
        theme,
        toggleTheme
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;