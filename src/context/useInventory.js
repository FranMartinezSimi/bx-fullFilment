import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import Omit from 'lodash/omit';

import clientFetch from 'lib/client-fetch';

const InventoryContext = createContext({
  productsToReposition: [],
  setProductsToReposition: () => {},
  productsToRepositionKeyedBySku: {},
  updateQuantities: () => {},
  quantitiesBySku: {},
  removeSku: () => {},
  addSku: () => {},
  inventory: [],
  isGetInventory: false,
  errorGetInventory: false,
});

const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [isGetInventory, setIsGetInventory] = useState(true);
  const [errorGetInventory, setErrorGetInventory] = useState(false);
  const [productsToReposition, setProductsReposition] = useState([]);
  const [quantitiesBySku, setQuantitiesBySku] = useState({});

  const updateQuantities = useCallback(
    (sku, quantity) => {
      setQuantitiesBySku((prevState) => ({
        ...prevState,
        [sku]: quantity,
      }));
    },
    [quantitiesBySku],
  );

  const productsToRepositionKeyedBySku = useMemo(
    () => productsToReposition.reduce(
      (acum, product) => ({
        ...acum,
        [product.sku]: product,
      }),
      [],
    ),
    [productsToReposition],
  );

  const setProductsToReposition = useCallback((products) => {
    setProductsReposition(products);
  }, []);

  const addSku = useCallback((sku) => {
    setProductsToReposition((prevState) => [...prevState, ...sku]);
  }, []);

  const removeSku = useCallback((sku) => {
    setProductsToReposition((prevState) => prevState.filter((product) => product.sku !== sku));
    setQuantitiesBySku((prev) => Omit(prev, sku));
  }, []);

  useEffect(() => {
    if (!productsToReposition.length) {
      setQuantitiesBySku({});
    }
  }, [productsToReposition]);

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
        productsToReposition,
        setProductsToReposition,
        updateQuantities,
        quantitiesBySku,
        removeSku,
        productsToRepositionKeyedBySku,
        addSku,
        inventory,
        isGetInventory,
        errorGetInventory,
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
