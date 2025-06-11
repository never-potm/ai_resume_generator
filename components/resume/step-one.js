import React from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useResume} from "@/context/resume";

function StepOne() {

    const {resume, setResume} = useResume();

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents default page reload on submit behavior of javascript
        console.log(resume);

        // save to database

        // goto next step
    }

    return (
        <div className="w-full lg:w-1/2 p-5 shadow-lg border-t-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-5">Personal Information</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    className="mb-3"
                    onChange={e => setResume({...resume, name: e.target.value})}
                    value={resume.name}
                    placeholder="Name"
                    autoFocus
                    required
                />
                <Input
                    type="text"
                    className="mb-3"
                    onChange={e => setResume({...resume, address: e.target.value})}
                    value={resume.address}
                    placeholder="Address"
                    required
                />
                <Input
                    type="number"
                    className="mb-3"
                    onChange={e => setResume({...resume, phone: e.target.value})}
                    value={resume.phone}
                    placeholder="Phone number"
                    required
                />
                <Input
                    type="email"
                    className="mb-3"
                    onChange={e => setResume({...resume, email: e.target.value})}
                    value={resume.email}
                    placeholder="Email"
                    required
                />
                <Input
                    type="text"
                    className="mb-3"
                    onChange={e => setResume({...resume, job: e.target.value})}
                    value={resume.job}
                    placeholder="Job title"
                    required
                />
                <div className="flex justify-end">
                    <Button>Save</Button>
                </div>
            </form>
        </div>
    );
}

export default StepOne;