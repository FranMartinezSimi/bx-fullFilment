import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageLayout = ({title, description, children}) => (
  <>
    <Helmet>
        <title>{`${title ? title+' | ' : ''} Fulfillment By BlueExpress`}</title>
        <meta
        name='description'
        content={`${description ? description+' | ' : ''} Fulfillment By BlueExpress'`}
        />
    </Helmet>
    {children}
  </>
)
 
export default PageLayout;