"use client";
import React, {useEffect} from 'react';
import {saveResumeToDB, getUserResumesFromDb, getResumeFromDb, updateResumeFromDb} from "@/actions/resume";
import toast from 'react-hot-toast';
import {useRouter, useParams, usePathname} from 'next/navigation';

const ResumeContext = React.createContext();

const experienceField = {
    title: '',
    company: '',
    address: '',
    startDate: '',
    endDate: '',
    summary: ''
}

const initialState = {
    name: "",
    job: "",
    address: "",
    phone: "",
    email: "",
    themeColor: "",
    experience: []
};

export function ResumeProvider({children}) {

    const [resume, setResume] = React.useState(initialState);
    const [retrievedResumes, setRetrievedResumes] = React.useState([]);
    const [step, setStep] = React.useState(1);

    const [experienceList, setExperienceList] = React.useState([experienceField]);
    const [experienceLoading, setExperienceLoading] = React.useState({});

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

    React.useEffect(() => {
        if (resume.experience) {
            setExperienceList(resume.experience);
        }
    }, [resume]);

    const handleExperienceChange = (e, index) => {

    };

    const handleExperienceQuillChange = (value, index) => {

    };

    const handleExperienceSubmit = () => {

    };

    const addExperience = () => {
        const newExperience = {
            ...experienceField,
        }
        setExperienceList([...experienceList, newExperience]);
    };

    const removeExperience = () => {
        if (experienceList.length === 1) {
            return;
        }

        // create copy of experienceList except the last experience list item
        const newEntries = experienceList.slice(0,experienceList.length-1);
        setExperienceList(newEntries);
    };

    const handleExperienceGenerateWithAI = async () => {

    };

    return <ResumeContext.Provider
        value={{
            step,
            setStep,
            resume,
            setResume,
            saveResume,
            experienceLoading,
            retrievedResumes,
            updateResume,
            experienceList,
            handleExperienceChange,
            handleExperienceQuillChange,
            handleExperienceSubmit,
            addExperience,
            removeExperience,
            handleExperienceGenerateWithAI,
        }}
    >
        {children}
    </ResumeContext.Provider>;
}

// with useResume, we can access step, resume values
export const useResume = () => React.useContext(ResumeContext);