"use client";
import React from 'react';
import {useResume} from "@/context/resume";
import StepOne from "@/components/resume/step-one";
import StepTwo from "@/components/resume/step-two";
import StepThree from "@/components/resume/step-three";
import StepFour from "@/components/resume/step-four";
import StepFive from "@/components/resume/step-five";
import ResumeCreateNav from "@/components/nav/resume-create-nav";

function ResumeUpdatePage() {

    const {step, resume} = useResume();

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <ResumeCreateNav />
            {step === 1 && <StepOne resume={resume} /> }
            {step === 2 && <StepTwo resume={resume} /> }
            {step === 3 && <StepThree resume={resume} /> }
            {step === 4 && <StepFour resume={resume} /> }
            {step === 5 && <StepFive resume={resume} /> }
        </div>
    );
}

export default ResumeUpdatePage;
