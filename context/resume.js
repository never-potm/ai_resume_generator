"use client";
import React from 'react';
import {saveResumeToDB} from "@/actions/resume";
import toast from 'react-hot-toast';

const ResumeContext = React.createContext();
const initialState = {
    name: "",
    job: "",
    address: "",
    phone: "",
    email: "",
    themeColor: "",
};

export function ResumeProvider({children}) {

    const [resume, setResume] = React.useState(initialState);
    const [step, setStep] = React.useState(1);

    React.useEffect(() => {
        const savedResume = localStorage.getItem("resume");
        if (savedResume) {
            setResume(JSON.parse(savedResume));
        }
    }, []);

    const saveResume = async () => {
        try {
            const data = await saveResumeToDB(resume);
            setResume(data);
            toast.success("🎉Resume saved successfully.");
            setStep(2);
        } catch (e) {
            console.error(e);
            alert("failed to save resume")
            toast.error("Failed to save resume.");
        }
    }

    return <ResumeContext.Provider
        value={{step, setStep, resume, setResume, saveResume}}
    >
        {children}
    </ResumeContext.Provider>;
}

// with useResume, we can access step, resume values
export const useResume = () => React.useContext(ResumeContext);