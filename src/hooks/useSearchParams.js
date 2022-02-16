import { useCallback } from 'react';

const paramsToObject = (entries) => {
  const entriesToArray = Array.from(entries);

  return entriesToArray.reduce(
    (acum, value) => ({
      ...acum,
      [value[0]]: value[1],
    }),
    {},
  );
};

const useSearchParams = (queryString) => {
  const toObject = useCallback(() => {
    if (!queryString) {
      return {};
    }

    const query = new URLSearchParams(queryString);
    const queryToObject = paramsToObject(query.entries());

    return queryToObject;
  }, [queryString]);

  return toObject();
};

export default useSearchParams;
