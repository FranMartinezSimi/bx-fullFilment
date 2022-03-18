import React from 'react';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';

import WithForm from './withForm';
import WithFile from './withFile';

const CreateSku = () => (
  <PageLayout title="Nuevos Productos">
    <PageTitle title="Nuevos Productos" />
    <div className="row mt-4">
      <div className="col-12 col-md-6 mb-4">
        <WithForm />
      </div>
      <div className="col-12 col-md-6 mb-4">
        <WithFile />
      </div>
    </div>
  </PageLayout>
);

export default CreateSku;
