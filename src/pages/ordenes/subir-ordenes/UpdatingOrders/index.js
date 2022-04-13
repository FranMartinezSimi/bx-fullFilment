const UpdatingOrders = () => (
  <div className="container py-5 my-5">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="text-center">
          <img src="/reloj.jpg" alt="" width="200" />
        </div>
        <div className="progress m-5">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-secondary-color"
            style={{ width: '75%' }}
          />
        </div>
        <h1 className="display-font text-center">Espera un momento mientras procesamos tu listado de órdenes</h1>
        <p className="text-center">Si presentamos un error podrás revisar y enmendar directamente en el listado.</p>
      </div>
    </div>
  </div>
);

export default UpdatingOrders;
