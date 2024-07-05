import React, { createContext, useState } from 'react'

export const userActiveContextApi = createContext()
export const allQuizzesContextApi = createContext()

function ContextShare({ children }) {
    const [activeUserRes, setActiveUserRes] = useState("")
    const [allQuizzesRes, setAllQuizzesRes] = useState("")
    return (
        <div>
            <userActiveContextApi.Provider value={{ activeUserRes, setActiveUserRes }}>
                <allQuizzesContextApi.Provider value={{ allQuizzesRes, setAllQuizzesRes }}>
                    {children}
                </allQuizzesContextApi.Provider>
            </userActiveContextApi.Provider>
        </div>
    )
}

export default ContextShare