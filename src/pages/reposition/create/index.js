import React, { useState, useMemo } from 'react';
import { setHours, setMinutes } from 'date-fns';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import InputWithLabel from 'components/Molecules/Form/InputWithLabel';
import InputDateWithLabel from 'components/Molecules/Form/InputDateWithLabel';
import DropZone from 'components/Molecules/DropZone';
import { useAuth } from 'context/userContex';

const CreateReposition = () => {
  const [date, setDate] = useState(null);
  const [, setFiles] = useState([]);
  const { seller } = useAuth();

  const minDate = useMemo(() => new Date(), []);

  return (
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
                  value={seller.nameSeller}
                  id="seller_name"
                  readOnly
                />
              </div>
              <div className="col-6">
                <InputWithLabel
                  label="Nombre de contacto"
                  value={seller.nameContact}
                  id="contact_name"
                  readOnly
                />
              </div>
            </div>
            <div className="row px-4">
              <div className="col-6">
                <InputWithLabel
                  label="Teléfono de contacto"
                  value={seller.phoneContact}
                  id="phone_number"
                  onChangeText={console.log}
                  readOnly
                />
              </div>
              <div className="col-6">
                <InputWithLabel
                  label="Correo de contacto"
                  value={seller.emailContact}
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
                <InputDateWithLabel
                  label="Fecha"
                  id="date"
                  format="dd/MM/yyyy h:mm aa"
                  showTimeSelect
                  selected={date}
                  onChange={setDate}
                  minDate={minDate}
                  minTime={setHours(setMinutes(minDate, 30), 8)}
                  maxTime={setHours(setMinutes(minDate, 30), 16)}
                />
              </div>
              <div className="col-6">
                <InputDateWithLabel
                  label="Hora"
                  id="hour"
                  format="h:mm aa"
                  showTimeSelect
                  selected={date}
                  onChange={setDate}
                  minDate={minDate}
                  minTime={setHours(setMinutes(minDate, 30), 8)}
                  maxTime={setHours(setMinutes(minDate, 30), 16)}
                  placeholder="--:--"
                />
              </div>
            </div>
            <div className="row px-4">
              <div className="col-6">
                <DropZone
                  setSelectedFiles={setFiles}
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
};

export default CreateReposition;
