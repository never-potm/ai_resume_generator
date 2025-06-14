"use client";
import React from 'react';
import {saveResumeToDB, getUserResumesFromDb, getResumeFromDb, updateResumeFromDb} from "@/actions/resume";
import toast from 'react-hot-toast';
import {useRouter, useParams, usePathname} from 'next/navigation';

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
    const {_id} = useParams();
    const pathname = usePathname();

    React.useEffect(() => {
        if (pathname?.includes("/resume/create")) {
            setResume(initialState);
            setStep(1);
        }
    }, [pathname])

    React.useEffect(() => {
        const savedResume = localStorage.getItem("resume");
        if (savedResume) {
            setResume(JSON.parse(savedResume));
        }
    }, []);

    React.useEffect(() => {
        getUserResumes();
    }, [])

    React.useEffect(() => {

        if (_id) {
            getResume(_id);
        }
    }, [_id]);

    const getResume = async () => {
        try {
            const data = await getResumeFromDb(_id);
            setResume(data);
        } catch (e) {
            console.error(e);
            toast.error("Failed to get resume");
        }
    }

    const saveResume = async () => {
        try {
            const data = await saveResumeToDB(resume);
            setResume(data);
            localStorage.removeItem("resume");
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

    const updateResume = async () => {
        try {
            const data = await updateResumeFromDb(resume);
            setResume(data);
            toast.success("Resume saved successfully.");
        } catch (e) {
            console.error(e);
            toast.error("Failed to update resume.");
        }
    }

    return <ResumeContext.Provider
        value={{
            step,
            setStep,
            resume,
            setResume,
            saveResume,
            retrievedResumes,
            updateResume
        }}
    >
        {children}
    </ResumeContext.Provider>;
}

// with useResume, we can access step, resume values
export const useResume = () => React.useContext(ResumeContext);