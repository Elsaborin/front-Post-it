import { useContext, createContext } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext({
<<<<<<< HEAD
  signIn: (email) => null,
  signOut: () => null,
  myToken: null,
=======
  signIn: (userData) => null,
  signOut: () => null,
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
  session: null,
  isLoading: false,
});

export function useSession() {
  return useContext(AuthContext);
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState("session");
<<<<<<< HEAD
  const [token, setToken] = useStorageState("myToken");

  const createToken = (email) => {
    const payload = { email, timestamp: Date.now() };

    const stringPayload = JSON.stringify(payload);

    const base64Encode = (str) => {
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(str);
      const base64String = btoa(String.fromCharCode(...uint8Array));
      return base64String;
    };

    const tokenAuth = base64Encode(stringPayload);

    setToken(tokenAuth)
    return tokenAuth;
  };
=======
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf

  return (
    <AuthContext.Provider
      value={{
<<<<<<< HEAD
        signIn: (correo) => {
          if (session) return;
          setSession({ correo: correo });
=======
        signIn: (userData) => {
          if (session) return;
          setSession(userData);
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
        },
        signOut: () => {
          if (!session) return;
          setSession(null);
<<<<<<< HEAD
          setToken(null);
        },
        session,
        isLoading,
        token
=======
        },
        session,
        isLoading,
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
      }}
    >
      {children}
    </AuthContext.Provider>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
