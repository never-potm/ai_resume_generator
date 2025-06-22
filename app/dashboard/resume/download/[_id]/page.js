'use client';
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {useResume} from "@/context/resume";
import ResumeCard from "@/components/cards/resume-card";
import {useParams} from "next/navigation";

// https://cdn-icons-png.flaticon.com/128/1091/1091007.png
// https://cdn-icons-png.flaticon.com/128/1497/1497542.png
// https://cdn-icons-png.flaticon.com/128/1828/1828874.png

function DownloadPage() {

    const {retrievedResumes} = useResume();
    const [currentResume, setCurrentResume] = useState(null);

    const {_id} = useParams();

    useEffect(() => {
        if(retrievedResumes?.length && _id) {
            const resume = retrievedResumes.find(r => r._id === _id || null);
            setCurrentResume(resume);
        }
    }, [retrievedResumes, _id]);

    const primtResume = () => {
        if(typeof window !== 'undefined') {
            const newWindow = window.open(`/resume/${currentResume._id}`, "_blank");

            // we set a timeout onload of the new window because sometimes it does not load immediately
            newWindow.onload = () => {
                setTimeout(() => {
                    newWindow.print();
                }, 300);
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen mx-5 my-20 overflow-auto">
            <div className="text-center w-full md:w-1/3">
                <h2 className="font-bold text-2xl">
                    Congratulations! Your AI powered resume is ready.
                </h2>
                <p>You can now download, print or share it with anyone.</p>
                <div className="flex justify-between my-20">
                    <div className="flex flex-col items-center">
                        <Image src="https://cdn-icons-png.flaticon.com/128/1091/1091007.png"
                               alt="download"
                               width={50}
                               height={50}/>
                        <Button
                            className="my-2"
                            onClick={primtResume}
                        >Download</Button>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src="https://cdn-icons-png.flaticon.com/128/1497/1497542.png"
                               alt="print"
                               width={50}
                               height={50}/>
                        <Button
                            className="my-2"
                            onClick={primtResume}
                        >Print</Button>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src="https://cdn-icons-png.flaticon.com/128/1828/1828874.png"
                               alt="share"
                               width={50}
                               height={50}/>
                        <Button className="my-2">Share</Button>
                    </div>
                </div>
                {currentResume ? <ResumeCard resume={currentResume}/> : null}
                <div className="mb-10"></div>
            </div>
        </div>
    );
}

export default DownloadPage;