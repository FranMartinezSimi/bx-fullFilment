import React, { useState, useEffect } from 'react';

import { clientFetch } from 'lib/client-fetch';
import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import Button from 'components/Atoms/Button';
import SetUpArchive from './SetUpArchive';
import UpdatingOrders from './UpdatingOrders';
import UpdateResult from './UpdateResult';

const UploadOrders = () => {

  const [dataToValidate, setDataToValidate] = useState([]);
  const [dataWhitErrors, setDataWhitErrors] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [dataToUpload, setDataToUpload] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isProccesing, setIsProccesing] = useState(false);

  const sendData = () => {
    console.log(dataToUpload);
    setIsLoadingData(true);

    // setTimeout(() => {
    //   setIsLoadingData(false);
    //   setUpdatedData(["asdasdsa"])
    // }, 2000);

    clientFetch('orders/addOrders', {
      body: dataToUpload
    })
      .then((data) => {
          console.log('responseDetail:', data);
          setUpdatedData([data]);
          setIsLoadingData(false);
      })
      .catch((error) => {
        console.log(error);
        // setUpdatedData(error);
        setIsLoadingData(false);
      })

    // try {
    //   // Enviar al backend

    //   // Loading false
    //   setIsLoadingData(false);

    //   // Mostrar respuesta, enviar a componente de proceso de carga
    // } catch (error) {
    //   console.log(error);
    //   // Loading false
    //   setIsLoadingData(false);

    //   // Mostrar respuesta, enviar a componente de proceso de carga
    // }
  }
  useEffect(() => {
    const validateData = () => {
      setIsProccesing(true);
  
      let itemsWhitErrors = [];
      const DATA_TO_VALIDATE = dataToValidate.map((item, key) => {
  
        let errors = [];
          for (const property in item) {
            if (item[property].length === 0) {
              errors = [
                ...errors,
                property
              ]
            }
          }
          if (errors.length) {
            itemsWhitErrors = [
              ...itemsWhitErrors,
              {
                key,
                errors
              }
            ]
          }
          setDataWhitErrors(itemsWhitErrors);
          return item;
        }
      )
      if ( !itemsWhitErrors.length && dataToValidate.length) {
        const dataToSendFormat = DATA_TO_VALIDATE.map((item) => (
          {
            order_number: item.NUMERO_ORDEN,
            shipping: {
              method: item.METODO_ENVIO
            },
            customer: {
              first_name: item.NOMBRE_CLIENTE,
              last_name: item.APELLIDO_CLIENTE,
              address1: item.DIRECCION,
              city: item.COMUNA,
              state: item.REGION,
              zip: item.CODIGO_IATA,
              country: "CHILE"
            },
            items: [
              {
                sku: item.SKU,
                quantity: item.CANTIDAD
              }
            ]
          }
          ))
        const dataToSend = {
          warehouse: "bx1",
          orders: dataToSendFormat,
        };
        setDataToUpload(dataToSend);
      }
      setIsProccesing(false);
    }
    validateData();
  }, [dataToValidate])
  return ( 
    <PageLayout title="Subir órdenes">
      <PageTitle title="Subir órdenes" />
      <p>(Puedes importar un archivo .csv separado por comas)</p>
      <Card>
        { !isLoadingData && !isProccesing && (updatedData.length === 0) && (
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


        {/* { dataWhitErrors && (
          <ul>
            <li>
              { isProccesing && <p>Procesando...</p> }
            </li>
            {dataWhitErrors.map(item => (
              <li key={item.key}>
                Fila: {item.key}
                , 
                Errores: {item.errors.map((value, key) => key > 0 ? `- ${value}` : `${value} `)}
              </li>
            ))}
          </ul>
        )} */}

        { isLoadingData && <UpdatingOrders /> }

        { !isLoadingData && (updatedData.length > 0) && <UpdateResult /> }
        
      </Card>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex w-100 my-5">
              {!isLoadingData && dataToUpload && (updatedData.length === 0) &&(
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
}
 
export default UploadOrders;