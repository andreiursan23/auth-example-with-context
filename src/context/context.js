import { createContext, useState, useEffect } from "react";

const Context = createContext({
    token: '',
    isAuth: false,
    id: '',
    login: () => {},
    logout: () => {},
    incrementReqNumber: () => {}
});

let logoutTimer = null;

const ContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);
    const [id, setId] = useState('');
    const [requestsNumber, setRequestsNumber] = useState(0);

    useEffect(() => {
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        logoutTimer = setTimeout(logoutHandler, 5000);
    }, [requestsNumber]);

    const loginHandler = (token, id) => {
        setToken(token);
        setId(id);
        localStorage.setItem('token', token);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token'); 
    }

    const incrementReqNumber = () => {
        setRequestsNumber(requestsNumber + 1);
    }

    const value = {
        token: token,
        isAuth: token ? true : false,
        id: id,
        login: loginHandler,
        logout: logoutHandler,
        incrementReqNumber: incrementReqNumber
    }

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }