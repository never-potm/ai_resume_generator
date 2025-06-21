import PersonalDetails from "@/components/preview/personal-detail";
import Summary from "@/components/preview/summary";
import Experience from "@/components/preview/experience";
import Education from "@/components/preview/education";
import Skills from "@/components/preview/skills";
import Link from "next/link";

export default function ResumeCard({resume}) {
    return (
        <Link href={`/dashboard/resume/edit/${resume._id}`}>
            <div className="shadow-lg w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-y-auto"
                 style={{borderColor: resume?.themeColor}}>
                <div className="line-clamp-3">
                    <PersonalDetails resume={resume}/>
                </div>
                <div className="line-clamp-3">
                    <Summary resume={resume}/>
                </div>
                <div className="line-clamp-3">
                    <Experience resume={resume}/>
                </div>
                <div className="line-clamp-3">
                    <Education resume={resume}/>
                </div>
                <div className="line-clamp-4">
                    <Skills resume={resume}/>
                </div>
            </div>
        </Link>
    )
}