import PersonalDetails from "@/components/preview/personal-detail";
import Summary from "@/components/preview/summary";
import Link from "next/link";

export default function ResumeCard({resume}) {
    return (
        <Link href={`/dashboard/resume/edit/${resume._id}`}>
            <div className="shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-y-auto"
                 style={{borderColor: resume?.themeColor}}>
                <PersonalDetails resume={resume}/>
                <Summary resume={resume}/>
            </div>
        </Link>
    )
}