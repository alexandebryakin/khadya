import React from 'react';

import { GetUserQueryVariables, User, UserKind, useGetUserLazyQuery } from '../../api/graphql.types';
import { jwt } from '../../api/jwt';

type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  saveJWT: (token: string) => void;
  logout: () => void;
  isUserReal: () => boolean;
  isUserAnonymous: () => boolean;
};

export const AuthContext = React.createContext({} as AuthContextType);

const ENDPOINTS = {
  NEW_ANONYMOUS_USER: process.env.REACT_APP_API_URL + '/public/anonymous_user/new',
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User>();
  const [getUser] = useGetUserLazyQuery();

  const refetchUser = async (userId: GetUserQueryVariables['userId'] | undefined) => {
    if (!userId) return;

    const response = await getUser({ variables: { userId } });
    const user = response.data?.user;

    // if (!user) return jwt.forget();
    if (!user) return alert('no user returned by the API');

    setUser(user);
  };

  const generateAnonymousUser = async () => {
    if (jwt.isExpired()) {
      const res = await fetch(ENDPOINTS.NEW_ANONYMOUS_USER);
      const { token } = await res.json();
      jwt.set(token);
    }

    const tokenDecoded = jwt.decoded();
    const userId = tokenDecoded?.data.user.id;

    refetchUser(userId);
  };

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      Object.assign(window, { user });
    }
  }, [user]);

  React.useEffect(() => {
    generateAnonymousUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveJWT: AuthContextType['saveJWT'] = (token) => {
    jwt.set(token);
  };
  const logout: AuthContextType['logout'] = () => {
    jwt.forget();
    generateAnonymousUser();
  };
  const isUserReal: AuthContextType['isUserReal'] = () => user?.kind === UserKind.Real;
  const isUserAnonymous: AuthContextType['isUserAnonymous'] = () => !isUserReal();

  if (!user) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        saveJWT,
        logout,
        isUserReal,
        isUserAnonymous,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
