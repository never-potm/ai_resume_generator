"use client";
import React, {useEffect} from 'react';
import {
    saveResumeToDB,
    getUserResumesFromDb,
    getResumeFromDb,
    updateResumeFromDb,
    updateExperienceToDb,
    updateEducationToDb,
    updateSkillsToDb
} from "@/actions/resume";
import toast from 'react-hot-toast';
import {useRouter, useParams, usePathname} from 'next/navigation';
import {callGeminiAPI} from "@/lib/gemini";

const ResumeContext = React.createContext();

const experienceField = {
    title: '',
    company: '',
    address: '',
    startDate: '',
    endDate: '',
    summary: ''
}

const educationField = {
    name: "",
    address: "",
    qualification: "",
    year: "",
};

const skillField = {
    name: "",
    level: "",
}

const initialState = {
    name: "",
    job: "",
    address: "",
    phone: "",
    email: "",
    themeColor: "",
    experience: [experienceField],
    education: [educationField],
    skills: [skillField]
};

export function ResumeProvider({children}) {

    const [resume, setResume] = React.useState(initialState);
    const [retrievedResumes, setRetrievedResumes] = React.useState([]);
    const [step, setStep] = React.useState(1);

    const [experienceList, setExperienceList] = React.useState([experienceField]);
    const [experienceLoading, setExperienceLoading] = React.useState({});

    const [educationList, setEducationList] = React.useState([educationField]);
    const [skillsList, setSkillsList] = React.useState([skillField]);

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

    const updateExperience = async (experienceList) => {
        try {
            const data = await updateExperienceToDb({...resume, experience: experienceList});
            setResume(data);
            toast.success("Experience saved successfully.");
        } catch (e) {
            console.error(e);
            toast.error("Failed to update experience.");
        }
    }

    React.useEffect(() => {
        if (resume.experience) {
            setExperienceList(resume.experience);
        }
    }, [resume]);

    const handleExperienceChange = (e, index) => {
        const newEntries = [...experienceList];
        const {name, value} = e.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const handleExperienceQuillChange = (value, index) => {
        const newEntries = [...experienceList];
        newEntries[index].summary = value;
        setExperienceList(newEntries);
    };

    const handleExperienceSubmit = () => {
        updateExperience(experienceList);
        setStep(4);
    };

    const addExperience = () => {
        const newExperience = {
            ...experienceField,
        }
        setExperienceList([...experienceList, newExperience]);
        setResume((prevState) => ({
            ...prevState,
            experience: [...experienceList, newExperience],
        }))
    };

    const removeExperience = () => {
        if (experienceList.length === 1) {
            return;
        }

        // create copy of experienceList except the last experience list item
        const newEntries = experienceList.slice(0, experienceList.length - 1);
        setExperienceList(newEntries);
    };

    const handleExperienceGenerateWithAI = async (index) => {
        setExperienceLoading((prevState) => ({...prevState, [index]: true}));

        const selectedExperience = experienceList[index];
        if (!selectedExperience || !selectedExperience.title) {
            toast.error("Please enter job title for the selected experience entry.");
            setExperienceLoading((prevState) => ({...prevState, [index]: false}));
            return;
        }

        const jobTitle = selectedExperience.title;
        const jobSummary = selectedExperience.summary || "";

        try {
            const response = await callGeminiAPI(`Generate a list of duties and responsibilities in HTML bullet points for the job title ${jobTitle} ${jobSummary}, not in markdown format or code blocks`);
            const updatedExperienceList = experienceList.slice();
            updatedExperienceList[index] = {...selectedExperience, summary: response}
            setResume((prevState) => ({...prevState, experience: updatedExperienceList}));
        } catch (e) {
            console.error(e);
            toast.error("failed to generate job description.")
        } finally {
            setExperienceLoading((prevState) => ({...prevState, [index]: false}));
        }

    };

    React.useEffect(() => {
        if(resume.education) {
            setEducationList(resume.education);
        }
    }, [resume]);

    const updateEducation = async (educationList) => {
        try {
            const data = await updateEducationToDb({
                ...resume,
                education: educationList,
            });
            setResume(data);
            toast.success("Education details saved successfully.");
        } catch (e) {
            console.log(e);
            toast.error("Failed to update education entry.");
        }
    };

    const handleEducationChange = (e, index) => {
        const newEntries = [...educationList];
        const {name, value} = e.target;
        newEntries[index][name] = value;
        setEducationList(newEntries);
    };

    const handleEducationSubmit = () => {
        updateEducation(educationList);
        setStep(5);
    }

    const addEducation = () => {
        const newEducation = {
            ...educationField,
        }
        setEducationList([...educationList, newEducation]);
        setResume((prevState) => ({
            ...prevState,
            education: [...educationList, newEducation],
        }))
    };

    const removeEducation = () => {
        if (educationList.length === 1) {
            return;
        }
        const newEntries = educationList.slice(0, educationList.length - 1);
        setEducationList(newEntries);

        updateEducation(newEntries);
    }

    React.useEffect(() => {
        if(resume.skills) {
            setSkillsList()
        }
    }, [resume]);

    const updateSkills = async (skillsList) => {
        const invalidSkills = skillsList.filter((skill) => !skill.name || !skill.label)
        if(invalidSkills.length > 0) {
            toast.error("Please fill in both skill name and level");
            return;
        }

        try {
            const data = await updateSkillsToDb({
                ...resume,
                skills: skillsList
            })
            setResume(data);
            toast.success("Skills updated.")
        } catch (e) {
            console.log(e);
            toast.error("Failed to update skills");
        }
    }

    const handleSkillsChange = (e, index) => {
        const newEntries = [...skillsList];
        const {name, value} = e.target;
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const handleSkillsSubmit = () => {
        updateSkills(skillsList);
        // router.push(`/dashboard/resume/download/${resume._id}`)
    }

    const addSkill = () => {
        const newSkill = {...skillField}
        setSkillsList([...skillsList, newSkill]);
        setResume((prevState) => ({
            ...prevState,
            skills: [...prevState.skills, newSkill]
        }));
    }

    const removeSkill = () => {
        if(skillsList.length === 1) {
            return;
        }
        const newEntries = skillsList.slice(0, skillsList.length - 1);
        setSkillsList(newEntries);
        updateSkills(newEntries);
    }

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
            educationList,
            handleEducationSubmit,
            handleEducationChange,
            addEducation,
            removeEducation,
            skillsList,
            handleSkillsChange,
            handleSkillsSubmit,
            addSkill,
            removeSkill,
        }}
    >
        {children}
    </ResumeContext.Provider>;
}

// with useResume, we can access step, resume values
export const useResume = () => React.useContext(ResumeContext);