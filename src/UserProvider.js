import React,{useState,createContext} from 'react';


export const UserContext = createContext(false);
export const ChangeUserContext = createContext();

//{name:'',pw:'',publickey,privatekey,address}
export function UserProvider(props){

    const [userData,setUserData] = useState(getSessionStorage("userdata"))

    function setUserDataFunc(data){
        setUserData(data)
        // store also in sessionStorage, because when pageReload all state is gone!!! 
        sessionStorage.setItem('userdata', JSON.stringify(data));
    }

    return <UserContext.Provider value={userData}>
                <ChangeUserContext.Provider value={setUserDataFunc}>
                    {props.children}
                </ChangeUserContext.Provider>
            </UserContext.Provider>


}

//User Context
// import {UserContext} from '../../UserProvider'
// const userData = useContext(UserContext)

// const address = JSON.parse(sessionStorage.getItem("userdata")).address

function getSessionStorage(key) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return false;
    }
    return JSON.parse(stored);
  }