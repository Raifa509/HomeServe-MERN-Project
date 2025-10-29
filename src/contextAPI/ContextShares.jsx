import { createContext, useState } from "react";

export const adminUpdateContext=createContext("")

function ContextShare({children}){
    const [adminEditResponse,setAdminEditResponse]=useState({})


    return(
        <adminUpdateContext.Provider value={{adminEditResponse,setAdminEditResponse}}>{children}</adminUpdateContext.Provider>

    )
}
export default ContextShare