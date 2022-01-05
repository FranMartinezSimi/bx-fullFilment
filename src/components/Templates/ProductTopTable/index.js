import React from 'react';
import styles from './styles.module.scss';

const ProductTopTable = ({ data }) => (
  <div className={styles.table}>
    <div className={`${styles.thead} pt-2`}>
      <div className={styles.space}>
        <h6>{ }</h6>
      </div>
      <div className={styles.th}>Descripción</div>
      <div className={styles.th}>Ordenes</div>
      <div className={styles.th}>Stock</div>
    </div>
    <div className={styles.tbody}>
      {data.map((item, index) => (
        <div className={`${styles.tr} border-bottom`} key={item.sku}>
          <div
            className={styles.num}
          >
            <h6 style={{ fontFamily: 'mont', fontSize: '22px', fontWeight: 'bold', background: '#1E81B' }}>{index + 1}</h6>
          </div>
          <div className={styles.td}>
            <div>
              <div className="pt-1">{item.name.substring(0, 31)}</div>
              <div className="pt-0">
                <p style={{ fontFamily: 'lato', fontSize: '10px', display: 'flex', lineHeight: '12px', marginBottom: '5px' }}>
                  {`SKU: ${item.sku} `}
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles.td} ms-3`}>
            {item.total_orders}
          </div>
          <div className={`${styles.td} `}>
            <div className={styles.stock}>
              {item.stock}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default ProductTopTable;
