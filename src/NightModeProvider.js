import React,{useState,createContext} from 'react';


export const NightContext = createContext();
export const ChangeNightFunction = createContext();


export function NightModeProvider(props){

    const [nightMode,setNightMode] = useState(false)

    function setNightModeFunc(bool){
        setNightMode(bool)
    }

    return <NightContext.Provider value={nightMode}>
                <ChangeNightFunction.Provider value={setNightModeFunc}>
                    {props.children}
                </ChangeNightFunction.Provider>
            </NightContext.Provider>


}