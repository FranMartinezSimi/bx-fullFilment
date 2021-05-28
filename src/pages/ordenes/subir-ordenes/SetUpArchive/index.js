import React from "react";

import Card from 'components/Molecules/Card';
import UploadCsv from 'components/Molecules/UploadCsv';
import AlerMessage from 'components/Atoms/AlertMessage';
import orderList from 'assets/brand/orderList.svg';
import loadArrowOrange from 'assets/brand/loadarrowOrange.svg';
import infoTriangle from 'assets/brand/infoTriangle.svg';
import listPencil from 'assets/brand/listPencil.svg';
import plantilla from 'assets/PLANTILLA-FULFILLMENT.csv';
import iata from 'assets/IATAComunas.xlsx';

const SetUpArchive = ({ setDataToValidate, dataToUpload, dataWhitErrors, setDataToUpload, setDataWhitErrors}) => {

  let component;
  if (dataToUpload) {
      component = (
        <div className="mb-2">
          <h2>Carga completa</h2>
          <img src="/bgsuccess.jpg" alt="Proceso completado" width="80" />
        </div>
      );
  } else {
      component = (
        <div className="mb-2">
          <h2>Carga tu archivo</h2>
          <p>Carga o arrastra el archivo .cvs</p>
        </div>
      )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-5 display-font">Para subir tus órdenes debes:</h2>
          <ul className="d-flex mb-4">
            <li className="me-4"><img src={orderList}alt="" width="30"/></li>
            <li><p>Descarga la plantilla de órdenes, llena los campos, en especial los obligatorios, luego súbelo en formato .cvs y estará listo para ser procesado.</p></li>
          </ul>
          <ul className="d-flex mb-4">
            <li className="me-4"><img src={infoTriangle} alt="" width="30"/></li>
            <li><p>Los SKUs que no estén registrados previamente no serán procesados, comunícate con nosotros <a href="#!">aquí</a> para ingresarlos.</p></li>
          </ul>
          <ul className="d-flex mb-4">
            <li className="me-4"><img src={listPencil} alt="" width="30"/></li>
            <li><p>En la plantilla de órdenes te pediremos el código IATA de tu localidad. Si no lo conoces, puedes descargar nuestro documento de códigos.</p></li>
          </ul>
          <div className="py-3">
            <a
              href={plantilla}
              className="btn btn-complementary me-3"
              download
            >
              <img src={loadArrowOrange} alt="Download" width="16" />
              <span className="ps-2">Descarga plantilla de órdenes</span>
            </a>
            <a
              href={iata}
              className="btn btn-complementary"
              download
            >
              <img src={loadArrowOrange} alt="Download" width="16" />
              <span className="ps-2">Descarga cógidos IATA</span>
            </a>
          </div>
        </div>
        <div className="col-md-6">
          {dataWhitErrors.length > 0 && (
            <AlerMessage type="danger" message="Algo salió mal, verifica el formato de tu archivo y los campos obligatorios" />
          )}
          <Card className="shadow text-center my-5">
            { component }
            <div className="mx-5">
              <UploadCsv
                setDataToValidate={setDataToValidate}
                setDataToUpload={setDataToUpload}
                setDataWhitErrors={setDataWhitErrors}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SetUpArchive;
