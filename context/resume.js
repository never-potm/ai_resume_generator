"use client";
import React from 'react';
import {saveResumeToDB, getUserResumesFromDb} from "@/actions/resume";
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
    const [retrievedResumes, setRetrievedResumes] = React.useState([]);
    const [step, setStep] = React.useState(1);
    const router = useRouter();

    React.useEffect(() => {
        const savedResume = localStorage.getItem("resume");
        if (savedResume) {
            setResume(JSON.parse(savedResume));
        }
    }, []);

    React.useEffect(() => {
        getUserResumes();
    }, [])

    const saveResume = async () => {
        try {
            const data = await saveResumeToDB(resume);
            setResume(data);
            toast.success("🎉Resume saved successfully.");
            router.push(`/dashboard/resume/edit/${data._id}`);
            setStep(2);
        } catch (e) {
            console.error(e);
            alert("failed to save resume")
            toast.error("Failed to save resume.");
        }
    }

    const getUserResumes = async () => {
        try {
            const data = await getUserResumesFromDb();
            setRetrievedResumes(data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to get resumes.");
        }
    }

    return <ResumeContext.Provider
        value={{step, setStep, resume, setResume, saveResume, retrievedResumes}}
    >
        {children}
    </ResumeContext.Provider>;
}

// with useResume, we can access step, resume values
export const useResume = () => React.useContext(ResumeContext);