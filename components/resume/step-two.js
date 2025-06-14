import React from 'react';
import {Textarea} from "@/components/ui/textarea";
import {useResume} from "@/context/resume";
import {Button} from "@/components/ui/button";

function StepTwo() {
    const {resume, setResume, updateResume, setStep} = useResume();

    const handleSubmit = (e) => {
        e.preventDefault();
        updateResume(resume);
        setStep(3);
    }

    return (
        <div className="w-full md:w-1/2 p-5 shadow-lg border-t-4 rounded-lg">
            <h2 className="text-2xl font-bold m-5">Summary</h2>

            <Textarea
                onChange={e => setResume({...resume, summary: e.target.value})}
                value={resume.summary}
                className="mb-3"
                placeholder="Write something about yourself"
                rows="10"
                required
            />

            <div className="flex justify-end">
                <Button onClick={handleSubmit}>Next</Button>
            </div>
        </div>
    );
}

export default StepTwo;