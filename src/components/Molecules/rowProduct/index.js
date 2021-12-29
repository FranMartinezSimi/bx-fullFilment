import PropTypes from 'prop-types';
import React from 'react';

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
    width: '50px',
  };
  const StockDataTop = {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '158%',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.03em',
    color: '#333333',
    width: '70px',
  };
  const numTop = {
    width: '25px',
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
      <div className="row border-bottom" data-bs-spy="scroll" style={{ width: '100%' }}>
        <div
          className="col-1 ps-4 mt-2"
          style={numTop}
        >
          {index}
        </div>
        <div className="col-7 ps-4 ms-1">
          <div className="row">
            <div className="d-flex flex-column bd-highlight mb-1 ps-1">
              <div className=" bd-highlight py-0 m-0 ">
                <p
                  className="pb-0 mb-0"
                  style={descDataTop}
                >
                  {descripcion}
                </p>
              </div>
              <div
                className=" py-0 ps-1"
                style={skuDataTop}
              >
                {`SKU ${sku}`}
              </div>
            </div>
          </div>

        </div>
        <div
          className="col-2 ps-4"
          style={orderDataTop}
        >
          {ordenes}
        </div>
        <div
          className="col-2 pt-1  justify-content-end"
          style={StockDataTop}
        >
          {stock}
        </div>
      </div>
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
