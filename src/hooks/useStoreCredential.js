import {useEffect, useState} from 'react';
import {useAtom} from 'jotai';
import {userCredentialsAtom} from '../lib/atoms';

const SAVE_CREDENTIAL_API = 'http://localhost:8080/api/v1/shipedge/credential';

const useStoreCredential = () => {

    const [userCredentials] = useAtom(userCredentialsAtom);
    const [storeState, setStoreState] = useState({
        fetching: true,
        success: false,
        messageError: undefined
    });

    useEffect(() => {

        let headers = new Headers();
        headers.append("key", userCredentials.key);
        headers.append("warehouse", "bx1");
        headers.append("account_id", userCredentials.accountId);

        let requestOptions = {
            method: 'POST',
            headers: headers,
        };

        fetch(SAVE_CREDENTIAL_API, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    setStoreState({
                        fetching: false,
                        success: true,
                        messageError: undefined
                    });
                } else {
                    return response.json();
                }
            })
            .then(result => {
                setStoreState({
                    fetching: false,
                    success: false,
                    messageError: result.message
                });
            })
            .catch(error => {
                setStoreState({
                    fetching: false,
                    success: false,
                    messageError: String(error)
                });
            });
    }, [userCredentials]);

    return storeState;
};

export default useStoreCredential;