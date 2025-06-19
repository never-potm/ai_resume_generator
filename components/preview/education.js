import React from 'react';

function Education({resume}) {
    return (
        <div className="my-6">
            <h2 className="font-bold text-sm mb-2" style={{color: resume.themeColor}}>Education</h2>
            <hr style={{borderColor: resume.themeColor}}/>
            {
                resume.education.map((edu, index) => (
                    <div key={index} className="mb-5">
                        <h3 className="font-bold text-base">{edu.qualification}</h3>
                        <div className="ml-2">
                            <p className="text-sm">{edu.name}</p>
                            <p className="text-xs text-gray-600">{edu.address}</p>
                            <p className="text-xs text-gray-600">{edu.year}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Education;