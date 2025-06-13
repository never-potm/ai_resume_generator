"use server";

import db from '@/utils/db';
import Resume from '@/models/resume';
import {currentUser} from '@clerk/nextjs/server';

export const saveResumeToDB = async (data) => {
    try {
        db()
        const user = await currentUser();
        const userEmail = user.emailAddresses[0]?.emailAddress;

        const {_id, ...rest} = data;
        const resume = await Resume.create({...rest, userEmail});
        return JSON.parse(JSON.stringify(resume));
    } catch (e) {
        throw new Error(e);
    }
}

export const getUserResumesFromDb = async () => {
    try {
        db();
        const user = await currentUser();
        const userEmail = user.emailAddresses[0]?.emailAddress;

        const resumes = await Resume.find({userEmail});
        return JSON.parse(JSON.stringify(resumes));
    } catch (err) {
        throw new Error(err);
    }
}

export const getResumeFromDb = async (_id) => {
    try {
        db();
        const resume = await Resume.findById(_id);
        return JSON.parse(JSON.stringify(resume));
    } catch (e) {
        throw new Error(e);
    }
}