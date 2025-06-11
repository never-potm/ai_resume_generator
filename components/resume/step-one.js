import React from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

function StepOne(props) {
    return (
        <div className="w-full lg:w-1/2 p-5 shadow-lg border-t-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-5">Personal Information</h2>
            <Input label="Name" className="mb-3"/>
            <Input label="Name" className="mb-3"/>
            <Input label="Name" className="mb-3"/>
            <Input label="Name" className="mb-3"/>
            <Input label="Name" className="mb-3"/>
            <div className="flex justify-end">
                <Button>Save</Button>
            </div>
        </div>
    );
}

export default StepOne;