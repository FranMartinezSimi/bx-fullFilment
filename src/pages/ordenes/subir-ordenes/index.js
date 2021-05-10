import React, { useState, useEffect } from 'react';

import PageLayout from 'components/Templates/PageLayout';
import PageTitle from 'components/Atoms/PageTitle';
import Card from 'components/Molecules/Card';
import UploadCsv from 'components/Molecules/UploadCsv';
import Button from 'components/Atoms/Button';
import orderList from 'assets/brand/orderList.svg';
import downloadArrow from 'assets/brand/downloadarrow.svg';
import infoTriangle from 'assets/brand/infoTriangle.svg';
import loadArrow from 'assets/brand/loadarrow.svg';
import questionMarkCircle from 'assets/brand/questionMarkCircle.svg';

const UploadOrders = () => {

  const [dataToValidate, setDataToValidate] = useState([]);
  const [dataToUpload, setDataToUpload] = useState(null);

  const validateData = (data) => {
    const SET_VALUES = data.map((item) => 
      setDataToUpload({
        key: '',
        account_id: '',
        warehouse: '',
        order_number: '',
        shipping: {
          method: item.METODO_ENVIO
        },
        customer: {
          first_name: item.first_name
        }
      })
    )
    console.log(SET_VALUES);
  }

  useEffect(() => {
    validateData(dataToValidate);
  }, [dataToValidate])

  return ( 
    <PageLayout title="Subir órdenes">
      <PageTitle title="Subir órdenes" />
      <p>(Puedes importar un archivo .csv separado por cómas)</p>
      <Card>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-5">
              <Card className="shadow text-center my-5">
                <div className="mb-2">
                  <img src={orderList} alt="Ordenes" width="50"/>
                </div>
                <UploadCsv setDataToValidate={setDataToValidate}/>
                {dataToUpload != null
                  ? (
                    <div className="my-2">
                      <Button
                        text="Procesar archivo"
                        className="btn btn-primary"
                        imgPrev={(<img src={loadArrow} alt="upload" width="14"/>)}
                      />
                    </div>
                  )
                  : null
                }
              </Card>
              <div className="py-3">
                <a 
                  href="./FBB-MARKETPLACE1088.csv"
                  className="btn btn-complementary"
                  download
                >
                  <img src={infoTriangle} alt="Download" width="16"/>
                  <span className="ps-2">
                    Descargar Plantilla para marketplace
                  </span>
                </a>
              </div>
              <div className="py-3">
                <a 
                  href="./FBB-MITIENDA1090.csv"
                  className="btn btn-complementary"
                  download
                >
                  <img src={downloadArrow} alt="Download" width="16"/>
                  <span className="ps-2">
                    Descargar Plantilla  Tu Tienda
                  </span>
                </a>
              </div>
            </div>
            <div className="col-md-5">
              <ul className="d-flex align-items-center">
                <li>
                  <img src={questionMarkCircle} alt=""/>
                </li>
                <li className="px-4">
                  <p className="mb-0">
                    ¿Cómo importar un archivo?
                  </p>
                </li>
              </ul>
              <Card className="bg-ligth-grey my-5">
                <ul className="d-flex align-items-center">
                  <li>
                    <img src={infoTriangle} alt=""/>
                  </li>
                  <li className="px-4">
                    <p className="text-primary mb-0">
                      Puedes descargar las planillas correspondientes a tu solicitud, llenar los datos en especial los campos obligatorios, una vez ingresado el archivo en los formatos    (.cvs )estaras listo para cargar.
                    </p>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </PageLayout>
   );
}
 
export default UploadOrders;