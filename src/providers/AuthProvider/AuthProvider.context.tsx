import React from 'react';

import { GetUserQueryVariables, User, useGetUserLazyQuery } from '../../api/graphql.types';
import { jwt } from '../../api/jwt';

type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const AuthContext = React.createContext({} as AuthContextType);

const ENDPOINTS = {
  NEW_ANONYMOUS_USER: process.env.REACT_APP_API_URL + '/public/anonymous_user/new',
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      Object.assign(window, { user });
    }
  }, [user]);

  const [getUser] = useGetUserLazyQuery();

  const refetchUser = async (userId: GetUserQueryVariables['userId'] | undefined) => {
    if (!userId) return;

    const response = await getUser({ variables: { userId } });
    const user = response.data?.user;

    if (!user) return;

    setUser(user);
  };

  React.useEffect(() => {
    (async () => {
      if (jwt.isExpired()) {
        const res = await fetch(ENDPOINTS.NEW_ANONYMOUS_USER);
        const { token } = await res.json();
        jwt.set(token);
      }

      const tokenDecoded = jwt.decoded();
      const userId = tokenDecoded?.data.user.id;

      refetchUser(userId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
