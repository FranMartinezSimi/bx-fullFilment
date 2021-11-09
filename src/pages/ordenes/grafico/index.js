import React from 'react';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';

const Grafico = () => {
  console.log('arrecho');
  return (
    <PageLayout title="Historico de órdenes">
      <div className="row align-items-center">
        <div className="col-md-8">
          <PageTitle title="Historico de órdenes" />
          <div className="row my-5">
            <div className="col-8">
              <Card>
                <h4>Total de órdenes y promedio diario</h4>
              </Card>
            </div>
            <div className="col-4">
              <Card>

                <h4>Total de órdenes y promedio diario</h4>

              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>

  );
};

export default Grafico;
