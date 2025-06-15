import PersonalDetails from "@/components/preview/personal-detail";
import Summary from "@/components/preview/summary";
import {useResume} from "@/context/resume";

export default function PreviewCard() {

    const {resume} = useResume();

    return (
        <div className="shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-y-auto"
             style={{borderColor: resume?.themeColor}}>
            <PersonalDetails resume={resume}/>
            <Summary resume={resume}/>
        </div>
    )
}