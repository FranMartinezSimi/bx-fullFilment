import { useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import cs from 'classnames';

import PageTitle from 'components/Atoms/PageTitle';
import Tag from 'components/Atoms/Tag';
import Card from 'components/Molecules/Card';
import PageLayout from 'components/Templates/PageLayout';
import MainTable from 'components/Templates/MainTable';
import { useReposition } from 'context/useReposition';
import getExportFileBlob from 'helpers';
import downloadArrow from 'assets/brand/downloadarrow.svg';

import styles from './detail.module.scss';

const ReplenishmentDetail = () => {
  const { repositionSelected } = useReposition();
  const history = useHistory();

  useEffect(() => {
    if (!repositionSelected) {
      history.goBack();
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Nº',
        accessor: 'Indice',
      },
      {
        Header: 'SKU',
        accessor: 'SKU',
      },
      {
        Header: 'Descripción',
        accessor: 'Descripcion',
      },
      {
        Header: 'Cantidad',
        accessor: 'Cantidad',
      },
      {
        Header: 'Cantidad recibida',
        accessor: 'Cantidad Recibida',
        Cell: ({ row: { original } }) => (
          <span
            className={cs('paragraph1', {
              [styles.redIndicator]:
                original.cantidad !== original['Cantidad Recibida'],
            })}
          >
            {original['Cantidad Recibida']}
          </span>
        ),
      },
    ],
    [],
  );

  const { productItems, productsReceived } = useMemo(() => {
    if (repositionSelected && repositionSelected.item.length) {
      return {
        productItems: repositionSelected.item.map((item, index) => ({
          Indice: index + 1,
          SKU: item.sku,
          Descripcion: item.description,
          Cantidad: item.qty_request,
          'Cantidad Recibida': item.qty_received,
        })),
        productsReceived: repositionSelected.item.reduce(
          (acum, value) => acum + value.qty_received,
          0,
        ),
      };
    }

    return { productItems: [], productsReceived: 0 };
  }, [repositionSelected]);

  const handleDownloadCsv = useCallback(() => {
    getExportFileBlob(productItems, `Detalle-reposicion-${repositionSelected.replenishmentId}.csv`);
  }, [productItems]);

  return (
    <PageLayout>
      <PageTitle>Detalle de la Reposición de Inventario</PageTitle>

      {repositionSelected && (
        <div className="row">
          <div className="col-12 mb-5">
            <Card>
              <div className="row mx-5">
                <div className="col-12 col-sm-4 d-flex justify-content-start my-2 align-items-center">
                  {repositionSelected.estado === 'Ingresado' ? (
                    <Tag background="#408D5C">{repositionSelected.estado}</Tag>
                  ) : (
                    <Tag variant="info">{repositionSelected.estado}</Tag>
                  )}
                </div>
                <div className="col-12 col-sm-4 d-flex justify-content-start my-2 align-items-center">
                  <span className="paragraph3">
                    <b className="pe-2">Fecha de ingreso: </b>
                    {'  '}
                    <span>{repositionSelected.fecha}</span>
                  </span>
                </div>
                <div className="col-12 col-sm-4 d-flex justify-content-start my-2 align-items-center">
                  <span className={cs('paragraph3', styles.orange)}>
                    <b className="pe-2">Productos:</b>
                    {'  '}
                    {repositionSelected.numProducts}
                  </span>
                </div>
                <div className="col-12 col-sm-4 d-flex justify-content-start my-2 align-items-center">
                  <span className="paragraph3">
                    <b className="pe-2">
                      ID de carga:
                      {'  '}
                    </b>
                    <span>{repositionSelected.replenishmentId}</span>
                  </span>
                </div>
                <div className="col-12 col-sm-4 d-flex justify-content-start my-2 align-items-center">
                  <span className="paragraph3">
                    <b className="pe-2">
                      Fecha de entrega:
                      {'  '}
                    </b>
                    <span>{repositionSelected.fechaEntrega}</span>
                  </span>
                </div>
                <div className="col-12 col-sm-4 d-flex justify-content-start my-2 align-items-center">
                  <span className="paragraph3">
                    <b className="pe-2">
                      Productos recibidos:
                      {'  '}
                    </b>
                    <span>{productsReceived}</span>
                  </span>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-12 mb-5">
            <MainTable
              columns={columns}
              data={productItems}
              noButtons
              buttonChildren={(
                <div className="d-flex justify-content-end align-items-center">
                  <button type="button" className={styles.downloadBtn} onClick={handleDownloadCsv}>
                    Descargar Detalle
                    {' '}
                    <img src={downloadArrow} alt="" width="15" />
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ReplenishmentDetail;
