import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainTable from 'components/Templates/MainTable';
import styles from './styles.module.scss';

const MessageResponseProducts = ({
  procesado, fallidos, agregados, estado, comentario, img, dataTable,
}) => {
  let component;
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dataItem = dataTable.map((d) => d);
  const handleshow = () => {
    if (!show) {
      setShow(true);
      document.getElementById('componentTable').style.height = '1100px';
    } else {
      setShow(false);
      document.getElementById('componentTable').style.height = '700px';
    }
  };
  const styleComponent = {
    width: '1034px',
    height: '700px',
    background: 'white',
    borderRadius: '15px',
    left: '168px',
    padding: '25px',
    justifyContent: 'flex-start',
    marginBottom: '40px',
    margin: 'auto',
  };
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
  const handleClickGoInventory = (e) => {
    e.preventDefault();
    history.push('/inventario');
  };
  return (
    <>

      <div className="px-3 pt-3">
        <div
          style={styleComponent}
          id="componentTable"
        >
          {component}
          <div className="d-flex justify-content-start">
            <div className="p-2 bd-highlight">
              <div className={styles.title}>
                Carga masiva SKU
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="p-2 bd-highlight">
              <img src={`/${img}.jpg`} alt="Proceso completado" width="160" height="158px" className={styles.img} />
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <div className="p-2 bd-highlight">
              <div className={styles.status}>
                {estado}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="p-2 bd-highlight">
              <div>
                <p className={styles.subtitle}>
                  {comentario}
                  <a
                    style={{ color: '#FF7A00' }}
                    href="#!"
                    onClick={handleshow}
                  >
                    Ver Detalle
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.gridContainer}>
            <div className={styles.gridItem}>
              <div className={styles.textIndicator}>
                Procesados
              </div>
              <div>{procesado + fallidos}</div>
            </div>
            <div
              className={styles.gridItem2}
              style={{ color: '#FD2626' }}
            >
              <div className={`${styles.textIndicator} text-danger`}>
                Fallidos
              </div>
              <div>{fallidos}</div>
            </div>
            <div className={styles.gridItem}>
              <div className={styles.textIndicator}>
                Agregados
              </div>
              <div>{agregados}</div>
            </div>
          </div>
          {show ? (
            <div className="container">
              <div className="d-flex justify-content-center">
                <div className="p-2 bd-highlight">
                  <MainTable
                    selectableRow
                    columns={columns}
                    data={dataItem}
                    noButtons
                    pageSize={10}
                    noFilters
                  />
                </div>
              </div>
              <div id={styles.outer}>
                <div id={styles.inner}>
                  <div className="p-2 bd-highlight d-flex justify-content-end mt-5">
                    <a href="#!" className={`btn btn-secondary ${styles.btn}`} onClick={handleClickGoInventory} style={{ fontSize: 17 }}>
                      Aceptar
                    </a>
                  </div>
                </div>
              </div>
            </div>

          )
            : component}
          <div>
            {!show ? (

              <div id={styles.outer}>
                <div id={styles.inner}>
                  <div className="p-2 bd-highlight d-flex justify-content-end mt-5">
                    <a href="#!" className={`btn btn-secondary ${styles.btn}`} onClick={handleClickGoInventory} style={{ fontSize: 17 }}>
                      Aceptar
                    </a>
                  </div>
                </div>
              </div>
            )
              : component}
          </div>
        </div>
      </div>

    </>
  );
};
MessageResponseProducts.defaultProps = {
  procesado: '0',
  fallidos: '0',
  agregados: '0',
  estado: 'Proceso Completado',
  comentario: '',
  img: 'bgincomplete',
  objeto: [],
};

MessageResponseProducts.prototype = {
  procesado: PropTypes.procesado,
  fallidos: PropTypes.fallidos,
  entregados: PropTypes.agregados,
  estado: PropTypes.estado,
  comentario: PropTypes.comentario,
  img: PropTypes.img,
  objeto: PropTypes.objeto,
};

export default MessageResponseProducts;
