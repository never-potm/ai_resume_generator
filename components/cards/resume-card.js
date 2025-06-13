import PersonalDetails from "@/components/preview/personal-detail";

export default function ResumeCard({resume}) {
    return (
        <div className="shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px]"
             style={{borderColor: resume?.themeColor}}>
            <PersonalDetails resume={resume}/>
        </div>
    )
}