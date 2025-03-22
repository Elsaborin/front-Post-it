import { useContext, createContext } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext({
  signIn: (email) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  setWeights: (weights) => null,
});

export function useSession() {
  return useContext(AuthContext);
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const updateSession = (data) => {
    setSession(current => ({
      ...current,
      ...data
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: (correo) => {
          setSession({ correo });
        },
        signOut: () => {
          setSession(null);
        },
        setWeights: (weights) => {
          updateSession({ weights });
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}