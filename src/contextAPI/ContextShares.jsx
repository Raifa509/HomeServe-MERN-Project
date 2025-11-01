import { createContext, useState } from "react";

export const adminUpdateContext = createContext("")
export const adminAddJobContext = createContext("")

function ContextShare({ children }) {
    const [adminEditResponse, setAdminEditResponse] = useState({})
    const [addJobResponse, setAddJobResponse] = useState({})

    return (
        <adminUpdateContext.Provider value={{ adminEditResponse, setAdminEditResponse }}>
           <adminAddJobContext.Provider value={{addJobResponse, setAddJobResponse}}> {children}</adminAddJobContext.Provider>
            </adminUpdateContext.Provider>

    )
}
export default ContextShare