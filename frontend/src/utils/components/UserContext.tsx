import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppUser } from '../../models/appUser/AppUser.ts';

// Erstelle den Context für den Benutzer
const UserContext = createContext<{ user: AppUser | null }>({
    user: null,
});

// Erstelle einen Provider für den Context
export const UserProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
    const [user, setUser] = useState<AppUser | null>(null);

    useEffect(() => {
        axios.get("/api/auth/me")
            .then(r => setUser(r.data))
            .catch(() => setUser(null));
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

// Erstelle einen Custom Hook, um den UserContext in anderen Komponenten zu verwenden
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
    return useContext(UserContext);
};
