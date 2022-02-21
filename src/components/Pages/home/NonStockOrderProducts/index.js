import { useEffect, useMemo, useState } from 'react';
import cs from 'classnames';
import { useHistory } from 'react-router-dom';

import Card from 'components/Molecules/Card';
import SimpleScrollTable from 'components/Templates/SimpleScrollTable';
import rightArrow from 'assets/brand/rightArrow.svg';
import GetNonStockOrderProducts from 'services/inventory/getNonStockOrderProducts';

import styles from './styles.module.scss';

const NonStockOrderProducts = ({ contentClassName }) => {
  const [list, setList] = useState([]);
  const history = useHistory();
  const columns = useMemo(() => ([
    {
      Header: 'Descripción',
      accessor: 'name',
      Cell: ({ row: { original } }) => (
        <div>
          <div className={cs('paragraph2', styles.name)}>{original.name}</div>
          <div className="paragraph2">{`SKU: ${original.sku}`}</div>
        </div>
      ),
    },
    {
      Header: 'Cantidad órdenes afectadas',
      accessor: 'total_orders',
      centered: true,
      maxWidth: 125,
      width: 125,
      minWidth: 125,
    },
    {
      Header: 'Unidades faltantes',
      accessor: 'missing_units',
      centered: true,
      maxWidth: 75,
      width: 75,
      Cell: ({ row: { original } }) => (
        <span className={styles.redIndicator}>{original.missing_units}</span>
      ),
    },
  ]), []);

  const goToReplenishment = (event) => {
    event.preventDefault();
    history.push('/reposition/create');
  };

  useEffect(() => {
    GetNonStockOrderProducts().then(setList);
  }, []);

  return (
    <Card className={contentClassName}>
      <div className="row">
        <div className="col-12 mb-4">
          <h1 className={styles.titulo}>Órdenes con productos sin stock</h1>
        </div>
        <div className="col-12 mb-4">
          <SimpleScrollTable
            columns={columns}
            data={list}
          />
        </div>
        <div className="col-12 d-flex justify-content-between align-items-center">
          <span className={`${styles.sevenDays}`}>Últimos 30 días</span>
          <a href="#!" onClick={goToReplenishment}>
            <span className={`${styles.link}`}>
              Reponer órdenes
              <img className="px-2" src={rightArrow} alt={rightArrow} />
            </span>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default NonStockOrderProducts;
