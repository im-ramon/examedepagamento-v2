import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { AuxiliarySheetFields } from '../pages/app/generate_auxiliary_sheet';

interface AppContextData {
    contextFormData: AuxiliarySheetFields | undefined;
    setContextFormData: Dispatch<SetStateAction<AuxiliarySheetFields | undefined>>
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext({} as AppContextData)


export function AppProvider({ children }: AppProviderProps) {
    const [contextFormData, setContextFormData] = useState<AuxiliarySheetFields | undefined>()

    return (
        <AppContext.Provider value={{
            contextFormData,
            setContextFormData
        }}>
            {children}
        </AppContext.Provider>
    )
}