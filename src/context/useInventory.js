import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

import clientFetch from 'lib/client-fetch';

const InventoryContext = createContext({
  inventory: [],
  isGetInventory: false,
  errorGetInventory: false,
  invetoryKeyedBySku: [],
});

const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [isGetInventory, setIsGetInventory] = useState(true);
  const [errorGetInventory, setErrorGetInventory] = useState(false);

  const invetoryKeyedBySku = useMemo(() => {
    if (!inventory.length) {
      return {};
    }

    return inventory.reduce((acum, product) => ({
      ...acum,
      [product.sku]: product,
    }), {});
  }, [inventory]);

  useEffect(() => {
    clientFetch('bff/v1/inventory/getProductsList', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        page: 1,
        warehouse: 'bx1',
        status: 'all',
      },
    }).then((products) => {
      setInventory(products.products);
      setIsGetInventory(false);
    }).catch(() => {
      setIsGetInventory(false);
      setErrorGetInventory(true);
    });
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        isGetInventory,
        errorGetInventory,
        invetoryKeyedBySku,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within a InventoryProvider');
  }
  return context;
};

export { InventoryProvider, useInventory };
