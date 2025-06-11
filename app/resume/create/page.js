"use client";
import React from 'react';
import {useResume} from "@/context/resume";

function ResumeCreatePage() {

    const {resume} = useResume();

    return (
        <div>
            <pre>
                {JSON.stringify(resume, null, 4)}
            </pre>
        </div>
    );
}

export default ResumeCreatePage;
