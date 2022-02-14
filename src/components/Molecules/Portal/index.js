import { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ container, children }) => {
  const rootElement = document.body;

  const getContainer = (containerArg) => containerArg || document.body;

  const renderContainer = () => {
    getContainer(container).appendChild(rootElement);
  };

  const unrenderContainer = () => {
    getContainer(container).removeChild(rootElement);
  };

  useLayoutEffect(() => {
    if (container) {
      renderContainer();
      return () => unrenderContainer();
    }

    return () => {};
  });

  return createPortal(children, rootElement);
};

export default Portal;
