import React from 'react';
import Card from 'components/Molecules/Card';
import styles from './styles.module.scss';

const ChangeStatus = () => {
  const component = '';
  return (
    <div>
      {' '}
      <div className={styles.parent}>
        <Card
          className="shadow my-5"
        >
          <h4 className="display-font">Visualización de motivos</h4>
          <div className="row align-items-center">
            <div className="col-md-6" />
            <div className="col-lg-6">
              <div className="pt-4 ps-4" style={{ borderRadius: 15, border: '1px solid #D6E0FF' }}>
                <p>Todos los motivos</p>
                sdwd
              </div>
            </div>
          </div>
        </Card>
        <div className={styles.div1} />
        <div className={styles.div2}>
          {' '}
          <Card
            className="shadow my-5"
          >
            <h4 className="display-font">Visualización de motivos</h4>
            <div className="row align-items-center">
              <div className="col-md-6" />
              <div className="col-lg-6">
                <div className="pt-4 ps-4" style={{ borderRadius: 15, border: '1px solid #D6E0FF' }}>
                  <p>Todos los motivos</p>
                  sdwd
                </div>
              </div>
            </div>
          </Card>
          {' '}

        </div>
      </div>

      {component}
    </div>
  );
};
export default ChangeStatus;
