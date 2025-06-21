import React from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), {ssr: false});
import 'react-quill-new/dist/quill.bubble.css';

function Experience({resume}) {
    return (
        <div className="my-6">
            <h2
                className="font-bold text-sm mb-2"
                style={{color: resume.themeColor}}>
                Professional experience
            </h2>
            <hr style={{borderColor: resume.themeColor}}/>

            {resume?.experience.map((exp, index) => {
                return (
                    <div key={index} className="my-5">
                        <h2 className="text-sm font-bold">{exp?.title}</h2>
                        <h3 className="text-sm">{exp?.company}</h3>
                        <p className="text-xs text-gray-600">{exp?.address}</p>

                        {exp?.summary && (
                            <ReactQuill
                                readOnly={true}
                                value={exp.summary}
                                theme="bubble"
                                className="text-sm font-nromal"
                            />
                        )}
                    </div>
                );
            })}


        </div>
    );
}

export default Experience;