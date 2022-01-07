import React from 'react';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import InputWithLabel from 'components/Molecules/Form/InputWithLabel';
import DropZone from 'components/Molecules/DropZone';

const CreateReposition = () => (
  <PageLayout title="Reposición de Inventario">
    <PageTitle title="Reposición de Inventario" />

    <Card className="my-4">
      <div className="row">
        <div className="col-6">
          <div className="row px-4 my-4">
            <div className="col-12">
              <p className="subtitle">Datos de Contacto</p>
            </div>
          </div>
          <div className="row px-4">
            <div className="col-6">
              <InputWithLabel
                label="Nombre del Seller"
                value="Casa de la Cerveza"
                id="seller_name"
                onChangeText={console.log}
                readOnly
              />
            </div>
            <div className="col-6">
              <InputWithLabel
                label="Nombre de contacto"
                value="Juan Pérez"
                id="contact_name"
                onChangeText={console.log}
                readOnly
              />
            </div>
          </div>
          <div className="row px-4">
            <div className="col-6">
              <InputWithLabel
                label="Teléfono de contacto"
                value="+569 99999999"
                id="phone_number"
                onChangeText={console.log}
                readOnly
              />
            </div>
            <div className="col-6">
              <InputWithLabel
                label="Correo de contacto"
                value="contacto@correo.cl"
                id="email_address"
                onChangeText={console.log}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row px-4 my-4">
            <div className="col-12">
              <p className="subtitle">Agenda tu reposición</p>
            </div>
          </div>
          <div className="row px-4">
            <div className="col-6">
              <InputWithLabel
                label="Fecha"
                value="01/01/2022"
                id="date"
                onChangeText={console.log}
                readOnly
              />
            </div>
            <div className="col-6">
              <InputWithLabel
                label="Hora"
                value="12:30 PM"
                id="hour"
                onChangeText={console.log}
                readOnly
              />
            </div>
          </div>
          <div className="row px-4">
            <div className="col-6">
              <DropZone
                setSelectedFiles={[]}
                size="small"
                internalTitle="Arrastra tu archivo o selecciona desde tu computadora en formato jpg - png o pdf"
                noValidation
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  </PageLayout>
);

export default CreateReposition;
