import React, {useState} from 'react';
import {Textarea} from "@/components/ui/textarea";
import {useResume} from "@/context/resume";
import {Button} from "@/components/ui/button";
import {Brain, Loader2} from "lucide-react";
import toast from "react-hot-toast";
import {callAIAPI} from "@/lib/utils";
import {callGeminiAPI} from "@/lib/gemini";

function StepTwo() {
    // context
    const {resume, setResume, updateResume, setStep} = useResume();

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateResume(resume);
        setStep(3);
    }

    const handleGenerateWithAI = async () => {
        setLoading(true);
        if (!resume.job) {
            toast.error("Please fill in your personal detail or write something about yourself.")
            setLoading(false);
            return;
        }

        const response = await callGeminiAPI(`Generate a resume summary for a person with the following details: ${JSON.stringify(resume)} in plain text format`);
        setResume({...resume, summary: response});
        setLoading(false);
    }

    return (
        <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-5" style={{color: resume.themeColor}}>Summary</h2>

                <Button variant="destructive" onClick={handleGenerateWithAI} disabled={loading}>
                    {loading ? (
                            <Loader2 size={18} className="mr-2 animate-spin"/>
                        )
                        : (
                            <Brain size={18} className="mr-2"/>
                        )
                    }
                    Generate with AI
                </Button>

            </div>

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