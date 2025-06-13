export default function ResumeCard({resume}) {
    return (
        <div className="shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px]"
             style={{borderColor: resume?.themeColor}}>
            <ul>
                <li>Personal detail</li>
                <li>Summary</li>
                <li>Experience</li>
                <li>Education</li>
                <li>Skills</li>
            </ul>
        </div>
    )
}