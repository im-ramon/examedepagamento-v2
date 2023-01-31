import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { AuxiliarySheetFields } from '../pages/app/generate_auxiliary_sheet';

export interface UserDataProps {
    avatar: string;
    boss_name: string;
    boss_pg: string;
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    emailVisibility: string;
    id: string;
    name: string;
    om: string;
    pg: string;
    signature_place: string;
    type: string;
    updated: string;
    username: string;
    verified: string;
    expand: object;
}

interface AppContextData {
    contextFormData: AuxiliarySheetFields | undefined;
    contextFormDataId: string;
    userData: UserDataProps;
    contextEditableValues: any;
    setContextEditableValues: Dispatch<any>;
    setContextFormData: Dispatch<SetStateAction<AuxiliarySheetFields | undefined>>;
    setContextFormDataId: Dispatch<SetStateAction<string>>;
    setUserData: Dispatch<SetStateAction<UserDataProps>>;
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext({} as AppContextData)


export function AppProvider({ children }: AppProviderProps) {
    const [contextFormData, setContextFormData] = useState<AuxiliarySheetFields | undefined>()
    const [contextFormDataId, setContextFormDataId] = useState<string>('')
    const [userData, setUserData] = useState<UserDataProps>({
        avatar: "",
        boss_name: "",
        boss_pg: "",
        collectionId: "",
        collectionName: "",
        created: "",
        email: "",
        emailVisibility: "",
        id: "",
        name: "",
        om: "",
        pg: "",
        signature_place: "",
        type: "",
        updated: "",
        username: "",
        verified: "",
        expand: {},
    })
    const [contextEditableValues, setContextEditableValues] = useState<any>()

    useEffect(() => {
        if (window) {
            const auth = window.localStorage.getItem('pocketbase_auth')
            if (auth) {
                const pocketbase_auth = JSON.parse(auth)

                if (pocketbase_auth.model) {
                    setUserData(pocketbase_auth.model as UserDataProps)
                }
            }
        }
    }, [])

    return (
        <AppContext.Provider value={{
            contextFormData,
            userData,
            contextFormDataId,
            contextEditableValues,
            setContextEditableValues,
            setContextFormDataId,
            setUserData,
            setContextFormData,
        }}>
            {children}
        </AppContext.Provider>
    )
}