import React from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useResume} from "@/context/resume";
import {useUser, SignInButton} from '@clerk/nextjs';

function StepOne() {

    const {resume, setResume, updateResume, setStep} = useResume();
    const {isSignedIn} = useUser();

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents default page reload on submit behavior of javascript

        // update resume
        updateResume();

        setStep(2);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setResume((prevState) => {
            // update previous state with existing data
            const updatedResume = { ...prevState, [name]: value };
            // save
            localStorage.setItem('resume', JSON.stringify(updatedResume));
            return updatedResume;
        })
    }

    return (
        <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-5">Personal Information</h2>
            <Input
                name="name"
                type="text"
                className="mb-3"
                onChange={handleChange}
                value={resume.name}
                placeholder="Name"
                autoFocus
                required
            />
            <Input
                name="address"
                type="text"
                className="mb-3"
                onChange={handleChange}
                value={resume.address}
                placeholder="Address"
                required
            />
            <Input
                name="phone"
                type="number"
                className="mb-3"
                onChange={handleChange}
                value={resume.phone}
                placeholder="Phone number"
                required
            />
            <Input
                name="email"
                type="email"
                className="mb-3"
                onChange={handleChange}
                value={resume.email}
                placeholder="Email"
                required
            />
            <Input
                name="job"
                type="text"
                className="mb-3"
                onChange={handleChange}
                value={resume.job}
                placeholder="Job title"
                required
            />

            <div className="flex justify-end">
                {!isSignedIn ? (<SignInButton>
                    <Button>Sign in to save</Button>
                </SignInButton>) : (
                    <Button onClick={handleSubmit}>Save</Button>
                )}
            </div>
        </div>
    );
}

export default StepOne;