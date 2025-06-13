"use client";
import React from 'react';
import {useResume} from "@/context/resume";

export default function Dashboard() {
    const {retrievedResumes} = useResume();
    return (
        <div>
            <pre>{JSON.stringify(retrievedResumes, null, 2)}</pre>
        </div>
    );
}