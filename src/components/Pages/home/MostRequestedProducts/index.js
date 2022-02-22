import { useEffect, useMemo, useState } from 'react';
import cs from 'classnames';
import { useHistory } from 'react-router-dom';

import SimpleScrollTable from 'components/Templates/SimpleScrollTable';
import GetMostRequestedProducts from 'services/inventory/getMostRequestedProducts';
import Card from 'components/Molecules/Card';
import rightArrow from 'assets/brand/rightArrow.svg';

import styles from './styles.module.scss';

export default ({ contentClassName }) => {
  const [list, setList] = useState([]);
  const history = useHistory();

  const columns = useMemo(() => [
    {
      Header: '',
      accessor: 'index',
      Cell: ({ row: { original } }) => (
        <span className={styles.index}>{original.index}</span>
      ),
      flex: 1,
      centered: true,
    },
    {
      Header: 'Descripción',
      accessor: 'name',
      Cell: ({ row: { original } }) => (
        <div>
          <div className={cs('paragraph2', styles.name)}>{original.name}</div>
          <div className="paragraph2">{`SKU: ${original.sku}`}</div>
        </div>
      ),
      flex: 7,
    },
    {
      Header: 'Ordenes',
      accessor: 'total_orders',
      flex: 2,
      centered: true,
    },
    {
      Header: 'Stock',
      accessor: 'stock',
      flex: 2,
      centered: true,
    },
  ]);

  const goToMonthOfInventory = (e) => {
    e.preventDefault();
    history.push('/meses-de-inventario');
  };

  useEffect(() => {
    GetMostRequestedProducts().then((response) => {
      setList(response.map((product, index) => ({
        index: index + 1,
        ...product,
      })));
    });
  }, []);

  return (
    <Card className={contentClassName}>
      <div className="row mb-4">
        <div className="col-12 col-md-12 d-flex justify-content-between align-items-center">
          <h1 className={styles.titulo}>Productos más solicitados</h1>
          <span className={`${styles.sevenDays} text-end m-0`}>
            Últimos 7 días
          </span>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <SimpleScrollTable columns={columns} data={list} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <a href="#!" onClick={goToMonthOfInventory}>
            <span className={`text-right ${styles.link} ms-0`}>
              Ver detalle
              <img className="px-2" src={rightArrow} alt={rightArrow} />
            </span>
          </a>
        </div>
      </div>
    </Card>
  );
};
