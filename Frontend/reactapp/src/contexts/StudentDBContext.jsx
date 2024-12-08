import { createContext, useContext, useState } from "react";

const StudentDBContext = createContext();

export const StudentDBProvider = ({children}) =>{
    const [option, setOption] = useState('dashboard');

    return (
    <StudentDBContext.Provider value={{option, setOption}}>
        {children}
    </StudentDBContext.Provider>
    );
};

export const useStudentDB = () =>{
    const context = useContext(StudentDBContext);
    if(!context){
        throw new Error('useStudentDB must be used within a StudentDBProvider')
    }

    return context;
}