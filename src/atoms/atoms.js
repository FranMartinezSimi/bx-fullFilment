import {atom} from 'jotai';

export const SYNC_STATES = {
    INFORMATION: 0,
    FORM: 1,
    VALIDATION: 2,
    SUCCESS: 3,
    FAILED: 4
}

export const userCredentialsAtom = atom({
    accountId: undefined,
    key: undefined
});

export const syncStateAtom = atom(SYNC_STATES.INFORMATION);

export const syncStateErrorAtom = atom('');

