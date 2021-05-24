import React, { useState, useEffect } from 'react';

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
  const [dataToUpload, setDataToUpload] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isProccesing, setIsProccesing] = useState(false);

  const sendData = async (e) => {
    setIsLoadingData(true);

    setTimeout(() => {
      setIsLoadingData(false);
      setUpdatedData(["asdasdsa"])
    }, 2000);
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
      if ( !itemsWhitErrors.length ) {
        setDataToUpload(DATA_TO_VALIDATE);
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
              {(dataToValidate.length > 0) && (dataWhitErrors.length === 0) && !isLoadingData && (updatedData.length === 0) && (dataToUpload.length > 0) && (
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