import styles from './styles.module.scss';

const BodyMessageReport = () => {
  let component;

  return (
    <>
      <div className="row align-items-stretch mt-5">
        <div className={`col-md-9 ${styles.orderStatus} `}>
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className={`${styles.card1} pt-4 ps-5`}>
                <h1 className="w-100 pb-4" style={{ fontFamily: 'mont', fontSize: 18 }}>Total de órdenes y promedio diario</h1>
                <div style={{ position: 'absolute', left: 600, top: 300, 'z-index': 3 }}>
                  <div className="container">
                    <div className="row justify-content-center mt-5">
                      <p>
                        No se han encontrado órdenes para el período
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="py-2 w-100">60</ul>
                <ul className="py-2 w-100">50</ul>
                <ul className="py-2 w-100">40</ul>
                <ul className="py-2 w-100">30</ul>
                <ul className="py-2 w-100">20</ul>
                <ul className="py-2 w-100">10</ul>
              </div>
              {component}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <>
            <div className={`${styles.orderStatus}`}>
              <div className={`${styles.card2} pt-4`}>
                <div className="container">
                  <div className="row">
                    <h1
                      className="text-center"
                      style={{ fontFamily: 'mont', fontSize: 18 }}
                    >
                      Total órdenes Operación FF
                    </h1>
                    <div className="container mt-5">
                      <div className="row justify-content-center mt-5">
                        <p>
                          No se han encontrado órdenes para el período
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </>
        </div>
      </div>
      <div className={`row my-5 ${styles.cardPendingDate}`}>
        <div className="col-11 p-5  card me-5" style={{ position: 'absolute', borderRadius: 15, height: 430, width: '90.5%' }}>

          <div className="pt-4 ps-5">
            <div className="row">
              <h1 className="w-100 pb-4" style={{ fontFamily: 'mont', fontSize: 18 }}>Órdenes pendientes por Fecha</h1>
              <ul className="py-2 w-100">60</ul>
              <ul className="py-2 w-100">50</ul>
              <ul className="py-2 w-100">40</ul>
              <ul className="py-2 w-100">30</ul>
              <ul className="py-2 w-100">20</ul>
              <ul className="py-2 w-100">10</ul>
              <div style={{ position: 'absolute', left: '440px', top: 150, 'z-index': 3, color: '#666666' }}>
                <div className="container">
                  <div className="row justify-content-center mt-5">
                    <p>
                      No se han encontrado órdenes para el período
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyMessageReport;
