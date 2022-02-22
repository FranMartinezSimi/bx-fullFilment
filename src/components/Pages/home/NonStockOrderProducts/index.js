import { useEffect, useMemo, useState, useCallback } from 'react';
import cs from 'classnames';
import { useHistory } from 'react-router-dom';

import Card from 'components/Molecules/Card';
import SimpleScrollTable from 'components/Templates/SimpleScrollTable';
import rightArrow from 'assets/brand/rightArrow.svg';
import GetNonStockOrderProducts from 'services/inventory/getNonStockOrderProducts';
import { useReposition } from 'context/useReposition';
import { useInventory } from 'context/useInventory';

import styles from './styles.module.scss';

const NonStockOrderProducts = ({ contentClassName }) => {
  const { invetoryKeyedBySku } = useInventory();
  const {
    setProductsToReposition,
    setSelectedModeToReposition,
    updateQuantitiesToRepositionBySku,
  } = useReposition();
  const [list, setList] = useState([]);
  const [fetching, setFetching] = useState(true);
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
      flex: 3,
    },
    {
      Header: 'Órdenes afectadas',
      accessor: 'total_orders',
      centered: true,
    },
    {
      Header: 'Unidades faltantes',
      accessor: 'missing_units',
      centered: true,
      Cell: ({ row: { original } }) => (
        <span className={styles.redIndicator}>{original.missing_units}</span>
      ),
    },
  ]), []);

  const goToReplenishment = useCallback((event) => {
    event.preventDefault();
    const toReposition = list.reduce((acum, value) => {
      const productFound = invetoryKeyedBySku[value.sku];

      if (!productFound) return acum;

      updateQuantitiesToRepositionBySku(
        value.sku,
        value.missing_units >= 0 ? value.missing_units : 0,
      );

      return acum.concat(productFound);
    }, []);
    setSelectedModeToReposition('sku');
    setProductsToReposition(toReposition);
    history.push('/reposition/create');
  }, [list, invetoryKeyedBySku]);

  useEffect(() => {
    GetNonStockOrderProducts().then((data) => {
      setFetching(false);
      setList(data);
    });
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
            isFetching={fetching}
          />
        </div>
        <div className="col-12 d-flex justify-content-between align-items-center">
          <span className={`${styles.sevenDays}`}>Últimos 30 días</span>
          <a href="#!" onClick={goToReplenishment}>
            <span className={`${styles.link}`}>
              Reponer inventario
              <img className="px-2" src={rightArrow} alt={rightArrow} />
            </span>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default NonStockOrderProducts;
