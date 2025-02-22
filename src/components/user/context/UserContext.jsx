import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


export const UserContext = createContext();

export const UserContextProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() =>{
        getUser();
    },[localStorage.getItem("token")]);
    // fetch user data from local storage or API here
    const getUser= async()=>{
        const token = localStorage.getItem('token');
        // if token exists fetch user data from API
        if(token){
            try{
                const response = await axios.get(`${import.meta.env.VITE_BURL}/user/profile`,{
                    headers:{
                        Authorization: `Tariq__${token}`,
                    }
                });
                setUser(response.data.user);
            }catch(err){
                console.error(err);
                setUser(null);
            }
            finally{
                setLoading(false);

            }
        }
        // if token does not exist set user to null
        else{
            console.log("there is no logged user");
            setUser(null);
        }
    }
    return (
        <UserContext.Provider value={{user,loading,setUser}}>
            {children}
        </UserContext.Provider>
    );

}
 export default UserContextProvider;
