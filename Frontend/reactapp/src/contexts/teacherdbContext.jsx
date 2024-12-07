// src/contexts/teacherdbContext.jsx

import { createContext, useContext, useState } from "react";

const TeacherdbContext = createContext();

export const TeacherdbProvider = ({ children }) => {
    const [option, setOption] = useState('dashboard');

    return (
        <TeacherdbContext.Provider value={{ option, setOption }}>
            {children}
        </TeacherdbContext.Provider>
    );
};

export const useTeacherdb = () => {
    const context = useContext(TeacherdbContext);
    if (!context) {
        throw new Error("useTeacherdb must be used within a TeacherdbProvider");
    }
    return context;
};
