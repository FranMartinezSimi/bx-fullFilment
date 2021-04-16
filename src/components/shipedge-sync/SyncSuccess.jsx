import React from 'react';
import {Link} from 'react-router-dom';

const SyncSuccess = () => {

    return (
        <div className="card">
            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img
                    src="https://mdbootstrap.com/img/new/standard/nature/111.jpg"
                    className="img-fluid"
                    alt=""
                />
            </div>
            <div className="card-body">
                <h5 className="card-title">¡Felicidades!</h5>
                <p className="card-text">
                    Tu cuenta Shipedge ha sido sincronizada con éxtio.
                </p>
                <Link to={'/orders'}>
                    <button className="btn btn-primary btn-block mb-4">Continuar</button>
                </Link>
            </div>
        </div>
    );
};

export default SyncSuccess;