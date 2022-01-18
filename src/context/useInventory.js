import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import Omit from 'lodash/omit';

const InventoryContext = createContext({
  productsToReposition: [],
  setProductsToReposition: () => {},
  productsToRepositionKeyedBySku: {},
  updateQuantities: () => {},
  quantitiesBySku: {},
  removeSku: () => {},
  addSku: () => {},
});

const InventoryProvider = ({ children }) => {
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
