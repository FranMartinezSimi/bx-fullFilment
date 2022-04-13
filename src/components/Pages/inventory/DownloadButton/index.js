import { useMemo } from 'react';

import DropdownButton from 'components/Molecules/DropdownButton';
import downloadArrow from 'assets/brand/downloadarrow.svg';
import { useInventory } from 'hooks/useInventory';
import { exportFileBlob } from 'helpers';
import { getDatetime } from 'utils/date';

export default function DownloadButton() {
  const { inventory } = useInventory();

  const handleExporCsv = () => {
    exportFileBlob(inventory.map((product) => ({
      'SKU/UPC': product.sku,
      Descripción: product.description,
      'En Bodega': product.quantity_in_warehouse,
      Disponible: product.quantity_available,
      Dañado: product.quantity_hurt,
      Reservado: product.quantity_shipped,
    })), `Inventario-${getDatetime(new Date(), '-')}.csv`);
  };

  const items = useMemo(
    () => [{ label: 'Descargar todo', onClick: handleExporCsv }],
    [],
  );

  return (
    <DropdownButton items={items}>
      <img src={downloadArrow} alt="download" width="14" />
      {' '}
      Descargar inventario
    </DropdownButton>
  );
}
