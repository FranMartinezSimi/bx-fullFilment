import TagManager from 'react-gtm-module';

export const initialize = () => {
  TagManager.initialize({
    gtmId: 'GTM-TTM6TJQ',
  });
};

export const setDataLayer = ({
  userId,
  userProject,
  page,
  dataLayerName,
}) => {
  TagManager.dataLayer({
    dataLayer: {
      userId,
      userProject,
      page,
    },
    dataLayerName,
  });
};
