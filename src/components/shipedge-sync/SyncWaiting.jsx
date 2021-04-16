import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {SYNC_STATES, syncStateAtom, syncStateErrorAtom} from '../../atoms/atoms';
import useStoreCredential from '../../hooks/useStoreCredential';

const SyncWaiting = () => {

    const [, setSyncState] = useAtom(syncStateAtom);
    const [, setSyncStateError] = useAtom(syncStateErrorAtom);
    const credentialValidation = useStoreCredential();

    useEffect(() => {
        if (!credentialValidation.fetching) {
            if (credentialValidation.success) {
                setSyncState(SYNC_STATES.SUCCESS);
            } else {
                setSyncStateError(credentialValidation.messageError);
                setSyncState(SYNC_STATES.FAILED);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentialValidation])

    return (
        <div className="card">
            <div className="card-body">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="card-text">
                        Espera mientras sincronizamos tu cuenta Shipedge
                    </p>
            </div>
        </div>
    );
};

export default SyncWaiting;