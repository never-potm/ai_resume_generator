import React from 'react';
import {getResumeFromDb} from "@/actions/resume";
import PersonalDetail from "@/components/preview/personal-detail";
import Summary from "@/components/preview/summary";
import Education from "@/components/preview/education";
import Experience from "@/components/preview/experience";
import Skills from "@/components/preview/skills";

export async function generateMetadata({params}) {
    const resume = await getResumeFromDb(params._id);
    return {
        title: `${resume.name} - Resume`,
        description: resume.summary,
        openGraph: {
            title: `${resume.name} - Resume`,
            description: resume.summary,
            images: ["/logo.svg"]
        }
    }
}

async function ResumePage({params}) {

    const resume = await getResumeFromDb(params._id);

    return (
        <div className="m-20">
            <PersonalDetail resume={resume}/>
            <Summary resume={resume}/>
            <Experience resume={resume}/>
            <Education resume={resume}/>
            <Skills resume={resume}/>
        </div>
    );
}

export default ResumePage;