import Button from 'components/Atoms/Button'
import PageTitle from 'components/Atoms/PageTitle'
import Card from 'components/Molecules/Card'
import React from 'react'

const UploadOrders = () => {
  return ( 
    <>
      <PageTitle title="Subir órdenes" />
      <p>(Puedes importar un archivo .csv separado por cómas)</p>
      <Card>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-5">
              <Card className="shadow text-center my-5">
                <img src="" alt=""/>
                <p>Carga tu archivo .csv</p>
                <Button
                  text="Cargar archivo"
                  className="btn btn-primary"
                />
              </Card>
              <div className="py-3">
                <Button
                  text="Descargar Plantilla para marketplace"
                  className="btn btn-complementary"
                />
              </div>
              <div className="py-3">
                <a 
                  href="./logo192.png"
                  className="btn btn-complementary"
                  download
                >
                  Descargar Plantilla  Tu Tienda
                </a>
              </div>
            </div>
            <div className="col-md-5">
              <ul>
                <li>
                  <img src="" alt=""/>
                </li>
                <li>
                  <p>
                    ¿Cómo importar un archivo?
                  </p>
                </li>
              </ul>
              <Card className="bg-ligth-grey my-5">
                <ul>
                  <li>
                    <img src="" alt=""/>
                  </li>
                  <li>
                    <p className="text-primary">
                    Puedes descargar las planillas correspondientes a tu solicitud, llenar los datos en especial los campos obligatorios, una vez ingresado el archivo en los formatos    (.cvs )estaras listo para cargar.
                    </p>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </>
   );
}
 
export default UploadOrders;