import { useState } from 'react';
import cs from 'classnames';

import Card from 'components/Molecules/Card';
import Tooltip from 'components/Molecules/Tooltip';
import infoIcon from 'assets/brand/info-ico.svg';
import loadArrowOrange from 'assets/brand/loadarrowOrange.svg';
import UploadCsvFull from 'components/Molecules/UploadCsvFull';
import ValidationMessageModal from 'components/Templates/ValidationMessageModal';
import AddProducts from 'services/inventory/addProducts';
import { useInventory } from 'hooks/useInventory';
import { useAuth } from 'context/userContex';

import styles from './styles.module.scss';
import plantilla from './sku-creation-template.csv';

const columns = [
  {
    Header: 'SKU',
    accessor: 'sku',
  },
  {
    Header: 'Descripción',
    accessor: 'product_id',
  },
  {
    Header: 'Estado',
    accessor: 'message',
  },
];

const WithFile = () => {
  const [products, setProducts] = useState([]);
  const [dataWhitErrors, setDataWhitErrors] = useState([]);
  const [modalResponse, setModalResponse] = useState({
    show: false,
    type: '',
    estado: '',
    comentario: '',
    procesado: '0',
    fallidos: '0',
    dataTable: [],
  });
  const [errorFull, setErrorFull] = useState(false);
  const { userParsed } = useAuth();
  const { accountId, key } = userParsed?.credential || {};
  const { refresh: refreshInventory } = useInventory();

  const toggleModalResponse = () => {
    setModalResponse((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  const handleAllSubmit = async () => {
    const productsAdapter = products.map((product) => ({
      sku: product.SKU,
      description: product.DESCRIPCION,
      length: Number(product.LARGO),
      width: Number(product.ANCHO),
      height: Number(product.ALTO),
      weight: Number(product.PESO),
      cost: 0,
      retail: 0,
    }));

    try {
      const response = await AddProducts({
        key,
        products: productsAdapter,
        accountId,
      });

      const { status, result } = response;

      refreshInventory();

      if (status === 'successful') {
        setModalResponse({
          show: true,
          type: 'success',
          estado: 'Proceso Completado',
          comentario: 'Tus productos han sido cargados exitosamente ',
          procesado: result.created.length,
          fallidos: result.errors.length,
          dataTable: result.created,
        });
      } else if (status === 'error') {
        setModalResponse({
          show: true,
          type: 'error',
          estado: 'Proceso Fallido',
          comentario:
            'No se ha realizado la carga de tus productos. Puedes revisar los SKU y volver a cargar el archivo. ',
          procesado: 0,
          fallidos: result.length,
          dataTable: result.map(({ errors, original_data: data }) => ({
            ...data,
            sku: data.sku,
            product_id: data.description,
            message: errors[0] || '',
          })),
        });
      } else {
        setModalResponse({
          show: true,
          type: 'warning',
          estado: 'Proceso Incompleto',
          comentario:
            'Se ha realizado una carga parcial de tus productos. Puedes revisar los SKU cargados exitosamente y volver a cargar los fallidos.',
          procesado: result.created.length,
          fallidos: result.errors.length,
          dataTable: result.created.concat(
            result.errors.map(({ errors, original_data: data }) => ({
              ...data,
              sku: data.sku,
              product_id: data.description,
              message: errors[0] || '',
            })),
          ),
        });
      }
    } catch (error) {
      setErrorFull(true);
    }
  };

  return (
    <>
      <Card className={cs(styles.fullHeight, styles.relative, 'px-5 py-5')}>
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className={cs(styles.h1, 'mb-4 d-flex align-items-center')}>
              Importar SKU
              {' '}
              <Tooltip
                position="right"
                text="Descarga la plantilla y completa los campos solicitados para crear nuevos SKU de forma masiva "
              >
                <img src={infoIcon} alt="Info" width="18" />
              </Tooltip>
            </h1>
          </div>
          <div className="col-12 mb-5">
            {errorFull && (
              <div
                className="alert alert-warning alert-dismissible fade show"
                role="alert"
                style={{
                  background: '#FFE9E9',
                  border: '1px solid #FD2626',
                  color: '#FD2626',
                }}
              >
                <span className="text-danger font-weight-bold">
                  <p
                    className="font-weight-bold p-0 m-0 text-center"
                    style={{ fontWeight: 'bold', fontSize: '15px' }}
                  >
                    Algo salió mal, verifica el formato de tu archivo
                  </p>
                </span>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setErrorFull(false)}
                />
              </div>
            )}
          </div>
          <div className="col-12 d-flex justify-content-center mb-4">
            <h2 className={styles.SubTitleMasivo}>Carga masiva SKU</h2>
          </div>
          <div className="col-10 d-flex justify-content-center mb-4">
            <UploadCsvFull
              size="medium"
              setDataWhitErrors={setDataWhitErrors}
              onChange={setProducts}
            />
            {dataWhitErrors.length > 0 && (
              <p className="text-danger">
                Archivo contiene campos vacíos, verifica los datos y carga
                nuevamente
                {' '}
              </p>
            )}
          </div>
          <div className="col-12 mb-4">
            <a
              href={plantilla}
              className={`btn btn-complementary ${styles.btndownload}`}
              download="plantilla-creacion-sku"
            >
              <img src={loadArrowOrange} alt="Download" width="16" />
              <span className="ps-2"> Descarga plantilla</span>
            </a>
          </div>
          <div
            className={cs(
              styles.contentButton,
              'col-12 d-flex justify-content-end mt-5',
            )}
          >
            <button
              type="button"
              className={cs('btn btn-secondary', styles.btnForm)}
              onClick={handleAllSubmit}
              disabled={products.length === 0}
            >
              Agregar
            </button>
          </div>
        </div>
      </Card>
      <ValidationMessageModal
        showModal={modalResponse.show}
        onAccept={toggleModalResponse}
        onClose={toggleModalResponse}
        type={modalResponse.type}
        leftIndicatorText="Procesados"
        leftIndicatorValue={products.length}
        centerIndicatorText="Fallidos"
        centerIndicatorValue={modalResponse.fallidos}
        rightIndicatorText="Agregados"
        rightIndicatorValue={modalResponse.procesado}
        columns={columns}
        dataTable={modalResponse.dataTable}
      />
    </>
  );
};

export default WithFile;
