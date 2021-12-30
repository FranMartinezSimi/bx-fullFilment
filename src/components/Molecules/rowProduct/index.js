import PropTypes from 'prop-types';
import React from 'react';
// import styles from './styles.module.scss';

const RowProduct = ({ index, descripcion, sku, ordenes, stock }) => {
  let component;
  const descDataTop = {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '158%',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.03em',
    color: '#333333',
    width: '100%',
    padding: '1px',

  };
  const skuDataTop = {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10px',
    lineHeight: '12px',
    display: 'flex',
    alignItems: 'center',
    color: '#333333',
  };
  const orderDataTop = {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '158%',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.03em',
    color: '#333333',
    width: '100px',
  };
  const StockDataTop = {
    fontFamily: 'Lato',
    fontSize: '12px',
    lineHeight: '158%',
    alignItems: 'center',
    letterSpacing: '0.03em',
    color: '#333333',
    width: '60px',
  };
  const numTop = {
    width: '30px',
    fontFamily: 'mont',
    fontSize: '22px',
    lineHeight: '26px',
    alignItems: 'center',
    color: '#1E81B2',
    fontWeight: 'bold',
  };
  return (
    <>

      {component}
      {/* <div
        className="col-2 ps-4 mt-2"
        style={numTop}
      >
        {index}
      </div>
      <div className="col-7 ms-1">
        <div className="row">
          <div className="d-flex flex-column bd-highlight mb-1 ps-1">
            <div className=" bd-highlight py-0 ms-3 ">
              <p
                className="pb-0 mb-0"
                style={descDataTop}
              >
                {descripcion}
              </p>
            </div>
            <div
              className=" py-0 ps-3"
              style={skuDataTop}
            >
              {`SKU ${sku}`}
            </div>
          </div>
        </div>

      </div>
      <div
        className="col-2 ps-2"
        style={orderDataTop}
      >
        {ordenes}
      </div>
      <div
        className="col-2 col-sm-2 ms-3 justify-content-center"
        style={StockDataTop}
      >
        {stock}
      </div> */}
      <tr className="border-bottom pb-2">
        <th
          className="col-1 ps-3"
          scope="row"
          style={numTop}
        >
          {index}
        </th>
        <td className="col-6 py-1">
          <div
            style={descDataTop}
          >
            {descripcion}
          </div>
          <div
            style={skuDataTop}

          >
            {`SKU: ${sku}`}
          </div>
        </td>
        <td
          className="col-2 py-2 ps-5"
          style={orderDataTop}
        >
          {ordenes}
        </td>
        <td
          className="col-2 py-2"
          style={StockDataTop}
        >
          {stock}
        </td>
      </tr>
    </>
  );
};

RowProduct.defaultProps = {
  index: '',
  descripcion: '',
  sku: '',
  ordenes: '',
  stock: '',
};

RowProduct.propTypes = {
  index: PropTypes.string,
  descripcion: PropTypes.string,
  sku: PropTypes.string,
  ordenes: PropTypes.string,
  stock: PropTypes.string,

};

export default RowProduct;
