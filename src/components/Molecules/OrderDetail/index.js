import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clientFetch from 'lib/client-fetch';

import Spinner from '../../Atoms/Spinner';
import DropDown from '../DropDown';
import Alert from '../../Atoms/AlertMessage';
import Todo from '../../../assets/brand/todo.svg';
import Calendar from '../../../assets/brand/calendar.svg';
import Flag from '../../../assets/brand/flag.svg';
import Checkmap from '../../../assets/brand/checkmap.svg';

const OrderDetail = ({
  orderNumber,
  id,
  tracking,
  unifyState,
  issue,
  handleClickTicket,
}) => {
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({});

  const tableData = {
    original: {
      orderId: id,
      orderNumber,
      trackingNumber: tracking,
      status: unifyState,
      statusInc: issue,
    },
  };

  const component = issue.length > 1 ? (
    <p className="my-4">
      Tienes un ticket en estado
      <span
        className={`badge--${issue
          .replace(' ', '')
          .toLowerCase()} px-2 py-1 mx-2`}
      >
        {issue}
      </span>
    </p>
  ) : (
    <div className="my-4 px-lg-4">
      <p className="mx-4 fs-6">
        ¿Tienes algún inconveniente con la orden?, crea un ticket con la
        incidencia para que un resolutor lo solucione.
      </p>
      <div className="text-center pt-3">
        <a
          href="!#"
          className="btn btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            handleClickTicket(tableData.original);
          }}
        >
          Crear Ticket
        </a>
      </div>
    </div>
  );

  const getData = (order) => {
    clientFetch('order/v1/orders/getOrderDetail', {
      headers: {
        apikey: process.env.REACT_APP_API_KEY_KONG,
      },
      body: {
        warehouse: 'bx1',
        id: `${order}`,
      },
    })
      .then((data) => {
        setOrderData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData(id);
  }, [id]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ul className="px-4">
            <li className="d-flex my-3">
              <div className="me-4">
                <img src={Todo} alt="Lista" width="15" />
              </div>
              <p
                className="me-4 display-font"
                style={{ width: '140px', fontSize: 14, fontWeight: 800 }}
              >
                Nº de Shipping
              </p>
              <p>{id}</p>
            </li>
            <li className="d-flex my-3">
              <div className="me-4">
                <img src={Calendar} alt="Lista" width="15" />
              </div>
              <p
                className="me-4 display-font"
                style={{ width: '140px', fontSize: 14, fontWeight: 800 }}
              >
                Fecha Orden
              </p>
              <p>{orderData.date}</p>
            </li>
            <li className="d-flex my-3">
              <div className="me-4">
                <img src={Flag} alt="Lista" width="15" />
              </div>
              <p
                className="me-4 display-font"
                style={{ width: '140px', fontSize: 14, fontWeight: 800 }}
              >
                Estado Unificado
              </p>
              <p>{unifyState}</p>
            </li>
            <li className="d-flex my-3">
              <div className="me-4">
                <img src={Checkmap} alt="Lista" width="15" />
              </div>
              <p
                className="me-4 display-font"
                style={{ width: '140px', fontSize: 14, fontWeight: 800 }}
              >
                Nº de Tracking
              </p>
              <p>{tracking}</p>
            </li>
          </ul>
          <div className="px-4 mb-3">
            <DropDown>
              <table className="table">
                {orderData.detail_order ? (
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border-0"
                        style={{ fontWeight: 400 }}
                      >
                        SKU
                      </th>
                      <th
                        scope="col"
                        className="border-0"
                        style={{ fontWeight: 400 }}
                      >
                        Descripción
                      </th>
                      <th
                        scope="col"
                        className="border-0"
                        style={{ fontWeight: 400 }}
                      >
                        Cantidad
                      </th>
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {orderData.detail_order ? (
                    orderData.detail_order.map((item) => (
                      <tr key={item.sku}>
                        <td>
                          <small>{item.sku}</small>
                        </td>
                        <td>
                          <small>{item.description}</small>
                        </td>
                        <td>
                          <small>{item.quantity}</small>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <Alert
                          className=""
                          type="warning"
                          message="Ooopss! Ocurrió un error, intentalo más tarde..."
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </DropDown>
            {component}
          </div>
        </>
      )}
    </>
  );
};
OrderDetail.defaultProps = {
  orderNumber: '',
  unifyState: undefined,
  tracking: undefined,
  issue: '',
};
OrderDetail.propTypes = {
  orderNumber: PropTypes.string,
  id: PropTypes.string.isRequired,
  tracking: PropTypes.string,
  unifyState: PropTypes.string,
  issue: PropTypes.string,
};

export default OrderDetail;
