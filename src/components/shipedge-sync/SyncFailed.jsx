import React from 'react';
import {useAtom} from 'jotai';
import {SYNC_STATES, syncStateAtom, syncStateErrorAtom} from '../../atoms/atoms';

const SyncFailed = () => {

    const [syncStateError, setSyncStateError] = useAtom(syncStateErrorAtom);
    const [, setSyncState] = useAtom(syncStateAtom);

    const handleRetry = () => {
        setSyncState(SYNC_STATES.INFORMATION);
        setSyncStateError('');
    }

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title"> Oh no :( </h4>
                <p className="card-text">
                    No hemos podido sincronizar tu cuenta Shipedge.
                </p>

                <p className="card-text">
                    Verifica que la información ingresada sea correcta.
                </p>

                <p className="card-text">
                    Recuerda seguir los pasos que te mostramos en la siguiente imagen:
                </p>

                { syncStateError.trim().length > 0 &&
                    <div className="alert alert-danger" role="alert">
                        Error: {syncStateError}
                    </div>
                }

                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" className="img-fluid" alt=""/>
                </div>

                <button className="btn btn-primary btn-block mb-4" onClick={handleRetry}>Reintentar</button>
            </div>
        </div>
    );
};

export default SyncFailed;