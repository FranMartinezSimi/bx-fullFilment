import React from 'react';
import {useAtom} from 'jotai';
import {SYNC_STATES, syncStateAtom, userCredentialsAtom} from '../../atoms/atoms';
import '../../assets/styles/SyncInformation.css';

const SyncForm = () => {

    const [, setSyncState] = useAtom(syncStateAtom);
    const [userCredentials, setUserCredentials] = useAtom(userCredentialsAtom);

    const handleStoreCredentials = event => {
        setUserCredentials({
            ...userCredentials,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        setSyncState(SYNC_STATES.VALIDATION);
    }

    return (
        <div className="card">
            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" className="img-fluid" alt=""/>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                        <input
                            type="text"
                            name="accountId"
                            id="accountId"
                            className="form-control"
                            onChange={handleStoreCredentials}
                        />
                        <label className="form-label" htmlFor="accountId">Account ID</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            type="text"
                            name="key"
                            id="key"
                            className="form-control"
                            onChange={handleStoreCredentials}
                        />
                        <label className="form-label" htmlFor="key">Key</label>
                    </div>
                    <button className="btn btn-primary btn-block mb-4">Siguiente</button>
                </form>
            </div>
        </div>
    );
};

export default SyncForm;