import {createContext, useState, useContext, useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({childern}) =>{
    const[auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: !!localStorage.getItem('token'),
    });

    const login = (token) =>{
        localStorage.setItem('token', token);
        setAuth({ token, isAuthenticated: true});

    };

    const logout = () =>{
        localStorage.removeItem('token');
        setAuth({token: null, isAuthenticated: false});
    };

    useEffect(()=>{
        setAuth({
            token: localStorage.getItem('token'),
            isAuthenticated: !!localStorage.getItem('token'),
        });
    }, []);

    return(
        <AuthContext.Provider value={{auth, login, logout}}>
            {childern}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);