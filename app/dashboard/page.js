"use client";
import React from 'react';
import {useResume} from "@/context/resume";
import SkeletonCard from "@/components/cards/skeleton-card";

export default function Dashboard() {
    const {retrievedResumes} = useResume();

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
        <div>
            <pre>{JSON.stringify(retrievedResumes, null, 2)}</pre>
        </div>
    );
}