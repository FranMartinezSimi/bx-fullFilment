import React from 'react';

const UpdatingOrders = () => {
  return (
    <div className="container py-5 my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center">
            <img src="/reloj.jpg" alt="" width="200"/>
          </div>
        <div className="progress m-5">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-secondary-color"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{width: "75%"}} />
        </div>
          <h1 className="display-font text-center">Espera un momento mientras procesamos tu listado de órdenes</h1>
          <p className="text-center">Si presentamos un error podrás revisar y enmendar directamente en el listado.</p>
        </div>
      </div>
    </div>
  );
}
 
export default UpdatingOrders;