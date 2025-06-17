import React from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useResume} from "@/context/resume";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(import('react-quill-new'), {ssr: false});
import 'react-quill-new/dist/quill.snow.css';
import {ArrowRight, Plus, X, Loader2Icon, Brain} from "lucide-react";

function StepThree(props) {
    const {
        experienceList,
        handleExperienceChange,
        handleExperienceQuillChange,
        handleExperienceSubmit,
        addExperience,
        removeExperience,
        handleExperienceGenerateWithAI,
        experienceLoading
    } = useResume();
    return (
        <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
            <h2 className="text-2xl font-bold mb-5">Experience</h2>

            {experienceList?.length > 0 &&
                experienceList.map((experience, index) => (
                    <div key={index} className="mb-10">
                        <Input
                            name="title"
                            type="text"
                            placeholder="Job Title"
                            onChange={e => handleExperienceChange(e, index)}
                            value={experience.title}
                            className="mb-3"
                        />
                    </div>
                ))}

            <div className="flex justify-between mt-3">
                <Button variant="outline" onClick={addExperience}>
                    <Plus size={18} className="mr-2"/>Add
                </Button>

                {experienceList?.length > 0 && (
                    <Button variant="outline" onClick={removeExperience}>
                        <X size={18} className="mr-2"/>Remove
                    </Button>
                )}

                <Button variant="outline" onClick={handleExperienceSubmit}>
                    <ArrowRight size={18} className="mr-2"/>Next
                </Button>

            </div>

        </div>
    );
}

export default StepThree;