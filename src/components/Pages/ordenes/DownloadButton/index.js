import { useMemo, useState } from 'react';

import DropdownButton from 'components/Molecules/DropdownButton';
import downloadArrow from 'assets/brand/downloadarrow.svg';
import GetDownloadOrders from 'services/orders/getDownloadOrders';
import GetOrdersBackorder from 'services/orders/getOrdersBackorder';
import { exportFileBlob } from 'helpers';
import useNotify from 'hooks/useNotify';
import Modal from 'components/Templates/Modal';
import FromToDownloader from 'components/Molecules/FromToDownloader';

export default function DownloadButton() {
  const [modalDate, setModalDate] = useState(false);

  const handleDownloadAllOrders = () => {
    GetDownloadOrders().then((orders) => {
      exportFileBlob(orders, 'ordenes.csv');
    }).catch(() => {
      useNotify('error', 'Hubo un problema al procesar la descarga');
    });
  };

  const handleDownloadBackOrderHistory = () => {
    GetOrdersBackorder().then((data) => {
      exportFileBlob(data, 'historial_ordenes_sin_stock.csv');
    }).catch(() => {
      useNotify('error', 'Hubo un problema al procesar la descarga');
    });
  };

  const items = useMemo(
    () => [
      { label: 'Descargar todo', onClick: handleDownloadAllOrders },
      { label: 'Descargar por fecha', onClick: () => setModalDate(true) },
      { label: 'Descargar historial sin stock', onClick: handleDownloadBackOrderHistory },
    ],
    [],
  );

  return (
    <>
      <DropdownButton items={items}>
        <img src={downloadArrow} alt="download" width="14" />
        {' '}
        Descargar órdenes
      </DropdownButton>
      <Modal
        showModal={modalDate}
        size="lg"
        onClick={() => setModalDate(false)}
      >
        <FromToDownloader />
      </Modal>
    </>
  );
}
