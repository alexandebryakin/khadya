import React from 'react';

interface Outlet {
  key: string;
  element: React.ReactNode;
}

interface Outlets {
  all: Outlet[];
  current: Outlet | undefined;
}

interface OutletActions {
  replace: (key: Outlet['key'], element: Outlet['element']) => void;
  remove: (key: Outlet['key']) => void;
  render: (key: Outlet['key']) => void;
}

interface BottomPanelContextProps {
  outlets: Outlets;
  actions: OutletActions;
}

const BottomPanelContext = React.createContext({} as BottomPanelContextProps);

export const BottomPanelContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [allOutlets, setOutelets] = React.useState<Outlet[]>([]);
  const [currentOutletKey, setCurrentOutletKey] = React.useState<string>();

  const replace: OutletActions['replace'] = (key, element) => {
    setOutelets((allOutlets) => {
      const newOutlet: Outlet = { key, element };

      return [...allOutlets.filter((outlet) => outlet.key !== key), newOutlet];
    });
  };

  const remove: OutletActions['remove'] = (key) => {
    setOutelets((allOutlets) => {
      const filtered = allOutlets.filter((outlet) => outlet.key !== key);

      return [...filtered];
    });
  };

  const render: OutletActions['render'] = (key) => setCurrentOutletKey(key);

  const outlets: Outlets = React.useMemo(() => {
    const result: Outlets = {
      all: allOutlets,
      current: allOutlets.find((outlet) => outlet.key === currentOutletKey),
    };

    return result;
  }, [allOutlets, currentOutletKey]);

  const actions: OutletActions = React.useMemo(() => {
    return {
      replace,
      remove,
      render,
    };
  }, []);

  return <BottomPanelContext.Provider value={{ outlets, actions }}>{children}</BottomPanelContext.Provider>;
};

export const useBottomPanel = () => React.useContext(BottomPanelContext);
