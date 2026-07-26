import React, { createContext, useContext, useEffect, useState } from "react";
import { authentication } from "@/better-auth/api";

type Session = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;

};

type AuthContextType = {
    session: Session | null;
    loading: boolean;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await authentication();

                if (!response) {
                    setSession(null);
                    return;
                }

                setSession(response.data);
            } catch (error) {
                setSession(null);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                session,
                loading,
                setSession
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
