import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import Omit from 'lodash/omit';

const RepositionContext = createContext({
  repositionSelected: null,
  setRepositionSelected: () => {},

  step: 0,
  setStep: () => {},

  formToReposition: {
    date: null,
    files: [],
    selectedMode: null,
  },
  setDateToReposition: () => {},
  setFilesToReposition: () => {},
  setSelectedModeToReposition: () => {},

  productsToReposition: [],
  setProductsToReposition: () => {},
  productsToRepositionKeyedBySku: {},

  productsWithErrorToReposition: [],
  setProductsWithErrorToReposition: () => {},

  updateQuantitiesToRepositionBySku: () => {},
  quantitiesToRepositionBySku: {},

  addProductToReposition: () => {},
  removeProductToReposition: () => {},

  resetReposition: () => {},
});

const RepositionProvider = ({ children }) => {
  const [repositionSelected, setRepositionSelected] = useState(null);
  const [step, setStep] = useState(0);
  const [formToReposition, setFormToReposition] = useState({
    date: null,
    files: [],
    selectedMode: null,
  });
  const [productsToReposition, setProductsToReposition] = useState([]);
  const [productsWithErrorToReposition, setProductsWithErrorToReposition] = useState([]);
  const [quantitiesToRepositionBySku, setQuantitiesToRepositionBySku] = useState({});

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

  const setDateToReposition = useCallback(
    (date) => setFormToReposition((prevState) => ({
      ...prevState,
      date,
    })),
    [formToReposition],
  );

  const setFilesToReposition = useCallback(
    (files) => setFormToReposition((prevState) => ({
      ...prevState,
      files,
    })),
    [formToReposition],
  );

  const setSelectedModeToReposition = useCallback(
    (selectedMode) => setFormToReposition((prevState) => ({
      ...prevState,
      selectedMode,
    })),
    [formToReposition],
  );

  const updateQuantitiesToRepositionBySku = useCallback(
    (sku, quantity) => {
      setQuantitiesToRepositionBySku((prevState) => ({
        ...prevState,
        [sku]: quantity,
      }));
    },
    [quantitiesToRepositionBySku],
  );

  const addProductToReposition = useCallback((sku) => {
    setProductsToReposition((prevState) => [...prevState, ...sku]);
  }, []);

  const removeProductToReposition = useCallback((sku) => {
    setProductsToReposition((prevState) => prevState.filter((product) => product.sku !== sku));
    setQuantitiesToRepositionBySku((prev) => Omit(prev, sku));
  }, []);

  const resetReposition = useCallback(() => {
    setStep(0);
    setFormToReposition({
      date: null,
      files: [],
      selectedMode: null,
    });
    setProductsToReposition([]);
    setQuantitiesToRepositionBySku({});
  }, []);

  useEffect(() => {
    if (!productsToReposition.length) {
      setQuantitiesToRepositionBySku({});
    }
  }, [productsToReposition]);

  return (
    <RepositionContext.Provider
      value={{
        step,
        setStep,
        productsToReposition,
        setProductsToReposition,
        productsToRepositionKeyedBySku,
        formToReposition,
        setDateToReposition,
        setFilesToReposition,
        setSelectedModeToReposition,
        quantitiesToRepositionBySku,
        updateQuantitiesToRepositionBySku,
        addProductToReposition,
        removeProductToReposition,
        resetReposition,
        productsWithErrorToReposition,
        setProductsWithErrorToReposition,
        repositionSelected,
        setRepositionSelected,
      }}
    >
      {children}
    </RepositionContext.Provider>
  );
};

const useReposition = () => {
  const context = useContext(RepositionContext);
  if (!context) {
    throw new Error('useReposition must be used within a RepositionProvider');
  }
  return context;
};

export { RepositionProvider, useReposition };
