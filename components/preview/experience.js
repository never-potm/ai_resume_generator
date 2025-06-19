import React from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), {ssr: false});
import 'react-quill-new/dist/quill.snow.css';
import toTitleCase from "@/utils/string";

function Experience({resume}) {
    return (
        <div className="my-6">
            <h2
                className="text-center font-bold text-sm mb-2"
                style={{color: resume.themeColor}}>
                Professional experience
            </h2>
            <hr style={{borderColor: resume.themeColor}}/>

            {
                resume?.experience.map((exp, index) => {
                    return (
                        <div key={index} className="my-5">
                            <h2 className="text-sm font-bold">{toTitleCase(exp?.title)}</h2>
                            <h3 className="text-sm font-bold">{toTitleCase(exp?.company)}</h3>
                            <p className="text-xs text-gray-600">{exp?.address}</p>

                            {exp?.summary && (
                            <ReactQuill
                                value={exp.summary}
                                theme="snow"
                                className="text-sm font-normal"
                            />
                            )}
                        </div>
                    )
                })
            }

        </div>
    );
}

export default Experience;