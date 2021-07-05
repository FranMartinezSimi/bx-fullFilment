import React, { useState, useEffect } from 'react';

import clientFetch from 'lib/client-fetch';
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import Button from 'components/Atoms/Button';
import OrderCorrection from 'components/Molecules/OrderCorrection';
import SetUpArchive from './SetUpArchive';
import UpdatingOrders from './UpdatingOrders';
import UpdateResult from './UpdateResult';
import UpdatedWidthErrors from './UpdatedWidthErrors';

const UploadOrders = () => {
  const [dataToValidate, setDataToValidate] = useState([]);
  const [dataWhitErrors, setDataWhitErrors] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [errorList, setErrorList] = useState([]);
  const [dataToUpload, setDataToUpload] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isProccesing, setIsProccesing] = useState(false);
  const [errorScreen, setErrorScreen] = useState(false);

  const sendData = () => {
    setIsLoadingData(true);

    clientFetch('order/v1/orders/addOrders', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: dataToUpload,
    })
      .then((data) => {
        setUpdatedData([data]);
        setDataWhitErrors([]);
        setIsLoadingData(false);
      })
      .catch((error) => {
        setUpdatedData([error]);
        setDataWhitErrors([]);
        setIsLoadingData(false);
      });
  };
  const validateData = () => {
    setIsProccesing(true);

    let itemsWhitErrors = [];
    let count = 0;
    const DATA_TO_VALIDATE = dataToValidate.map((item, key) => {
      let errors = [];
      const itemData = Object.keys(item);
      itemData.map((property) => {
        if (item[property].length === 0) {
          errors = [...errors, property];
          count = 1;
        }

        return property;
      });
      if (errors.length) {
        itemsWhitErrors = [
          ...itemsWhitErrors,
          {
            ...item,
            key,
            errors,
          },
        ];
      } else {
        itemsWhitErrors = [
          ...itemsWhitErrors,
          {
            ...item,
            key,
          },
        ];
      }
      return item;
    });
    if (count > 0) {
      setDataWhitErrors(itemsWhitErrors);
    }
    if (count === 0 && dataToValidate.length) {
      const dataToSendFormat = DATA_TO_VALIDATE.map((item) => ({
        order_number: item.NUMERO_ORDEN,
        shipping: {
          method: item.METODO_ENVIO.toUpperCase(),
        },
        customer: {
          first_name: item.NOMBRE_CLIENTE.toUpperCase(),
          last_name: item.APELLIDO_CLIENTE.toUpperCase(),
          address1: item.DIRECCION.toUpperCase(),
          city: item.COMUNA.toUpperCase(),
          state: item.REGION.toUpperCase(),
          zip: item.CODIGO_IATA.toUpperCase(),
          country: 'CHILE',
        },
        items: [
          {
            sku: item.SKU,
            quantity: item.CANTIDAD,
          },
        ],
      }));
      const dataToSend = {
        warehouse: 'bx1',
        orders: dataToSendFormat,
      };
      setDataWhitErrors([]);
      setDataToUpload(dataToSend);
    }
    setIsProccesing(false);
  };
  useEffect(() => {
    validateData();
  }, [dataToValidate]);
  return (
    <PageLayout title="Subir órdenes">
      <PageTitle title="Subir órdenes" />
      <p>(Puedes importar un archivo .csv separado por comas)</p>
      <Card>
        {!isLoadingData && !isProccesing && updatedData.length === 0 && (
          <SetUpArchive
            dataToValidate={dataToValidate}
            dataToUpload={dataToUpload}
            dataWhitErrors={dataWhitErrors}
            setDataToValidate={setDataToValidate}
            setDataToUpload={setDataToUpload}
            setDataWhitErrors={setDataWhitErrors}
            sendData={sendData}
          />
        )}

        {!isLoadingData && dataWhitErrors.length > 0 && (
          <OrderCorrection
            dataWhitErrors={dataWhitErrors}
            setDataToValidate={setDataToValidate}
          />
        )}

        {isLoadingData && <UpdatingOrders />}

        {!isLoadingData
        && updatedData.length > 0
        && !errorScreen
        && (
          <UpdateResult
            updatedData={updatedData}
            setErrorList={setErrorList}
            setErrorScreen={setErrorScreen}
          />
        )}

        {errorList.length > 0 && errorScreen && <UpdatedWidthErrors errorList={errorList} />}

      </Card>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex w-100 my-5">
              {!isLoadingData && dataToUpload && updatedData.length === 0 && (
                <Button
                  text="Enviar órdenes"
                  className="btn btn-secondary ms-auto"
                  onClick={sendData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UploadOrders;
