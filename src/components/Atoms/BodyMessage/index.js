import info from 'assets/brand/info-ico.svg';
import styles from './styles.module.scss';

const BodyMessage = () => {
  let component;

  return (

    <div className={`constainer-fluid bg-succes h-100 ${styles.bg}`}>
      <div className={`${styles.card1} pt-4 ps-5`}>
        <h1 className="w-100 pb-4" style={{ fontFamily: 'mont', fontSize: 18 }}>Total de órdenes y promedio diario</h1>
        <ul className="py-2 w-100">60</ul>
        <ul className="py-2 w-100">50</ul>
        <ul className="py-2 w-100">40</ul>
        <ul className="py-2 w-100">30</ul>
        <ul className="py-2 w-100">20</ul>
        <ul className="py-2 w-100">10</ul>
        <div style={{ position: 'absolute', left: '440px', top: '95px', 'z-index': 3 }}>
          <div className="container mt-5">
            <div className="row justify-content-center mt-5">
              <p>
                No se han encontrado órdenes para generar el
                historial de los ultimos 6 meses
              </p>
            </div>
          </div>
        </div>
      </div>
      {component}
      <div className={`${styles.card2} pt-4`}>
        <div className="container">
          <h1
            className="text-center"
            style={{ fontFamily: 'mont', fontSize: 18 }}
          >
            Total órdenes Operación FF
            <img src={info} alt="Info" width="18" className="m-4 mt-3 ms-2" />
          </h1>
          <div className="container mt-5">
            <div className="row justify-content-center mt-5">
              <p>
                No se han encontrado órdenes para generar el
                historial de los ultimos 6 meses
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default BodyMessage;
