import React, { useEffect, useState, useRef } from 'react';
import auth_api from '../api/auth_api';
import { decodeError } from '../utilities/exception-handler';
import { useNavigate, useLocation } from "react-router-dom";
import permission_api from '../api/permission_api';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isServerAvailable, setIsServerAvailable] = useState(false);
  const [isAuthWaiting, setIsAuthWaiting] = useState(true);
  const [isPingingServer, setIsPingingServer] = useState(true);
  const [user, setUser] = useState();
  const [permissions, setPermissions] = useState();
  const [authError, setAuthError] = useState("");
  const heartBeatHandleRef = useRef();

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const login = async (email, password) => {
    try {
      setIsAuthWaiting(true)
      let res = await auth_api.login(email, password);
      let user_res = await auth_api.user();
      let perm_res = await permission_api.index();
      setPermissions(perm_res.data.data);
      setUser(user_res.data)
      setIsAuthed(true)
      setAuthError("");
      navigate(from, { replace: true });
    } catch (err) {
      setAuthError(decodeError(err))
    } finally {
      setIsAuthWaiting(false)
    }
  }

  const register = async (name, email, password) => {
    try {
      setIsAuthWaiting(true)
      await auth_api.register(name, email, password);
      setAuthError("");
      navigate("/login");
    } catch (err) {
      setAuthError(decodeError(err))
    } finally {
      setIsAuthWaiting(false)
    }
  }

  const logout = async () => {
    try {
      setIsAuthWaiting(true)
      await auth_api.logout();
      setUser()
      setIsAuthed(false)
      setAuthError("");
      clearInterval(heartBeatHandleRef.current);
      navigate("/login");
    } catch (err) {
      setAuthError(decodeError(err).message)
    }
    finally {
      setIsAuthWaiting(false)
    }
  }

  const checkHeartBeat = async (location, auth_api) => {
    if ((typeof location.pathname !== 'undefined') && (location.pathname !== '/login')) {
      try {
        let res = await auth_api.userInquire();
      } catch (e) {
        setIsAuthed(false);
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    heartBeatHandleRef.current = setInterval(checkHeartBeat, 50000, location, auth_api);

    (async () => {
      try {
        setIsPingingServer(true)
        await auth_api.csrf()
        setIsPingingServer(false)
        setIsServerAvailable(true)
        setIsAuthWaiting(true)
        let res = await auth_api.user();
        let perm_res = await permission_api.index();
        setPermissions(perm_res.data.data);
        setUser(res.data)
        setIsAuthed(true)
        setAuthError("");
        setIsAuthWaiting(false)
      } catch (err) {
        setIsAuthed(false)
        setAuthError(decodeError(err))
        setIsAuthWaiting(false)
        setIsPingingServer(false)
        navigate("/login");
      }
    })();
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isPingingServer: isPingingServer,
        isServerAvailable: isServerAvailable,
        isAuthWaiting: isAuthWaiting,
        authError: authError,
        isAuthed: isAuthed,
        user: user,
        permissions: permissions,
        register: (name, email, password) => register(name, email, password),
        login: (email, password) => login(email, password),
        logout: () => logout()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;