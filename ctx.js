import { useContext, createContext } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext({
  signIn: (userData) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  return useContext(AuthContext);
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (userData) => {
          if (session) return;
          setSession(userData);
        },
        signOut: () => {
          if (!session) return;
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}