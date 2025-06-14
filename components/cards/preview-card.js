import PersonalDetails from "@/components/preview/personal-detail";
import Summary from "@/components/preview/summary";
import {useResume} from "@/context/resume";

export default function PreviewCard() {

    const {resume} = useResume();

    return (
        <div className="shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px]"
             style={{borderColor: resume?.themeColor}}>
            <PersonalDetails resume={resume}/>
            <Summary resume={resume}/>
        </div>
    )
}