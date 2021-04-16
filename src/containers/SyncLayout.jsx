import React from 'react';
import {SYNC_STATES, syncStateAtom} from '../atoms/atoms';

import SyncInformation from '../components/shipedge-sync/SyncInformation';
import SyncForm from '../components/shipedge-sync/SyncForm';
import SyncWaiting from '../components/shipedge-sync/SyncWaiting';
import {useAtom} from 'jotai';
import SyncSuccess from '../components/shipedge-sync/SyncSuccess';
import SyncFailed from '../components/shipedge-sync/SyncFailed';

const SyncLayout = props => {

    const [syncState] = useAtom(syncStateAtom);

    return (
        <div className="border border-light p-3 mb-4">
            <div className="d-flex justify-content-center">
                <div className="col-md-3 col-sm-3 col-xs-12">
                    {syncState === SYNC_STATES.INFORMATION && <SyncInformation/>}
                    {syncState === SYNC_STATES.FORM && <SyncForm/>}
                    {syncState === SYNC_STATES.VALIDATION &&<SyncWaiting/>}
                    {syncState === SYNC_STATES.SUCCESS &&<SyncSuccess/>}
                    {syncState === SYNC_STATES.FAILED &&<SyncFailed />}
                </div>
            </div>
        </div>
    );
};

export default SyncLayout;