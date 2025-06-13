"use client";
import React from 'react';
import {saveResumeToDB} from "@/actions/resume";
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';

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
    const router = useRouter();

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
            router.push(`/dashboard/resume/edit/${data._id}`);
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