"use server";

import db from '@/utils/db';
import Resume from '@/models/resume';
import {currentUser} from '@clerk/nextjs/server';
import mongoose from "mongoose";


const checkOwnership = async (resumeId) => {
    try {
        const user = await currentUser();
        const userEmail = user.emailAddresses[0]?.emailAddress;
        if (!userEmail) {
            throw new Error("User not found")
        }

        const resume = await Resume.findOne({_id: resumeId});
        if (!resume) {
            throw new Error("Resume not found");
        }

        if (resume.userEmail !== userEmail) {
            throw new Error("Unauthorized");
        }
        return true;
    } catch (e) {
        throw new Error(e);
    }
}

export const saveResumeToDB = async (data) => {
    try {
        await db()
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
        await db();
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
        await db();
        const resume = await Resume.findById(_id);
        return JSON.parse(JSON.stringify(resume));
    } catch (e) {
        throw new Error(e);
    }
}

export const updateResumeFromDb = async (data) => {
    try {
        await db();
        const {_id, ...rest} = data;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            throw new Error("Invalid MongoDB ID");
        }

        await checkOwnership(_id);

        const resume = await Resume.findByIdAndUpdate(new mongoose.Types.ObjectId(_id), {...rest}, {new: true});
        return JSON.parse(JSON.stringify(resume));
    } catch (e) {
        throw new Error(e);
    }
}

export const updateExperienceToDb = async (data) => {
    try {
        await db();
        const {_id, experience} = data;
        await checkOwnership(_id);
        const resume = await Resume.findByIdAndUpdate(_id, {experience}, {new: true});
        return JSON.parse(JSON.stringify(resume));
    } catch (e) {
        throw new Error(e);
    }
}

export const updateEducationToDb = async (data) => {
    try {
        await db();
        const {_id, education} = data;
        await checkOwnership(_id);
        const resume = await Resume.findByIdAndUpdate(_id, {education}, {new: true});
        return JSON.parse(JSON.stringify(resume));
    } catch (e) {
        throw new Error(e);
    }
}

export const updateSkillsToDb = async (data) => {
    try {
        await db();
        const {_id, skills} = data;
        await checkOwnership(_id);
        const resume = await Resume.findByIdAndUpdate(_id, {skills}, {new: true});
        return JSON.parse(JSON.stringify(resume));
    } catch (e) {
        throw new Error(e);
    }
}


