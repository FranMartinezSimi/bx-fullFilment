import React from 'react';
import {useAtom} from 'jotai';
import {SYNC_STATES, syncStateAtom} from '../../atoms/atoms';

const SyncInformation = () => {

    const [, setSyncState] = useAtom(syncStateAtom);

    const handleNext = () => {
        setSyncState(SYNC_STATES.FORM)
    }

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
                <h5 className="card-title">Gestiona tu Bodega</h5>
                <p className="card-text">
                    Sincroniza tu cuenta Shipedge para acceder a tus órdenes de servicio e inventario.
                </p>

                <h5 className="card-title">¿Cómo hacerlo?</h5>
                <p className="card-text">
                    Sigue las instrucciones que te presentaremos a continuación.
                </p>
                <button className="btn btn-primary btn-block mb-4" onClick={handleNext}>Siguiente</button>
            </div>
        </div>
    );
};

export default SyncInformation;