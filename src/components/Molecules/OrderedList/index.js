import React from 'react'
import PropTypes from 'prop-types';

import styles from './styles.module.scss'

const OrderedList = ({listData}) => {
  return (
    <ol className={`${styles.orderedList} pt-5 mb-0`}>
      {listData.length
        ? (
          listData.map((item) => (
            <li key={item.sku}>
              <ul className="d-flex">
                <li className={`${styles.unOrderedList} `}>
                  <p className="mb-0"><small>{item.name}</small></p>
                  <p className="mb-0"><small>SKU {item.sku}</small></p>
                  <p><small className={`${styles.updateInfo}`}>Última venta hace {item.update}</small></p>
                </li>
                <li className={`${styles.unOrderedList} `}>
                  <h2 className="mb-0">{item.stock}</h2>
                  <p><small>En stock</small></p>
                </li>
                <li className={`${styles.unOrderedList} `}>
                  <h2 className="mb-0">{item.qty}</h2>
                  <p><small>En stock</small></p>
                </li>
              </ul>
            </li>
          ))
        )
        : null
      }
    </ol>
  );
}

OrderedList.propTypes = {
  listData: PropTypes.array
}

export default OrderedList;