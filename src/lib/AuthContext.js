import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    user: {
        name:'',
        last_name:'',
        email:'',
        roles:[],
        uid:'',
        _id:'',
        is_disabled:false
    },
    login: () => {},
    logout: () => {}
});
