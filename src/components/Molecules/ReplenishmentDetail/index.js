import LogoBN from 'assets/brand/LogoBN.svg';
// import styles from './styles.scss';

const ReokenishmentDetail = ({ activeData }) => {
  console.log(activeData);
  return (
    <div className="container border">
      <p>{activeData}</p>

      <div className="row">
        <div className="col-4">
          <img src={LogoBN} alt="Actualizar Ordenes" width="50" />
        </div>
        <div className="col-4 py-2 h-50">
          <h6>
            <b>Manifiesto Fullfilment</b>
          </h6>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-7 border-end border-dark">
          <ul><b>Empresa:</b></ul>
          <ul><b>Contacto Empresa:</b></ul>
          <ul><b>Teléfono:</b></ul>
          <ul><b>Correo electronico:</b></ul>
        </div>
        <div className="col-4 px-4">
          <ul><b>Fecha entrega:</b></ul>
          <ul><b>Horario entrega:</b></ul>
        </div>
      </div>
      <br />
      <table>
        <tr className="text-center border bg-secondary">
          <th>SKU</th>
          <th>Descripción</th>
          <th>Cantidad de productos</th>
        </tr>
        <tr className="text-center border">
          <td>123456</td>
          <td>Tazón StarWars R2D2 C3PO</td>
          <td>10</td>
        </tr>
      </table>
    </div>

  );
};

export default ReokenishmentDetail;
