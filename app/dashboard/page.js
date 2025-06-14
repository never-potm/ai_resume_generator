"use client";
import React from 'react';
import {useResume} from "@/context/resume";
import SkeletonCard from "@/components/cards/skeleton-card";
import ResumeCard from "@/components/cards/resume-card";

export default function Dashboard() {
    const {retrievedResumes} = useResume();
    console.log(retrievedResumes);

    if (!retrievedResumes?.length) {
        return (
            <div>
                <p className="text-center">Loading...</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
                    <SkeletonCard/>
                    <SkeletonCard/>
                    <SkeletonCard/>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
            {
                retrievedResumes.map((resume) => (
                    <ResumeCard key={resume._id} resume={resume}/>
                ))
            }
        </div>
    );
}