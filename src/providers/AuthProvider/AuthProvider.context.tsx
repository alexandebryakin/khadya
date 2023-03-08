import React from 'react';

import { User, useGetUserLazyQuery } from '../../api/graphql.types';
import { jwt } from '../../api/jwt';

type AuthContextType = {
  user: User;
};

export const AuthContext = React.createContext({} as AuthContextType);

const ENDPOINTS = {
  NEW_ANONYMOUS_USER: process.env.REACT_APP_API_URL + '/public/anonymous_user/new',
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User>();

  const [getUser, { data }] = useGetUserLazyQuery();

  React.useEffect(() => {
    (async () => {
      if (jwt.isExpired()) {
        const res = await fetch(ENDPOINTS.NEW_ANONYMOUS_USER);
        const { token } = await res.json();
        jwt.set(token);
      }

      const tokenDecoded = jwt.decoded();
      const userId = tokenDecoded?.data.user.id;

      if (!userId) return;

      getUser({ variables: { userId } });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!data?.user) return;

    setUser(data.user);

    if (process.env.NODE_ENV === 'development') {
      Object.assign(window, { user: data.user });
    }
  }, [data]);

  if (!user) return null;

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
