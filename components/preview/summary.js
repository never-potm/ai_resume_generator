import React from 'react';
import parse from 'html-react-parser';

function Summary({resume}) {
    return (
        <div className="mt-5 ">
            <h2 className="font-bold mb-3" style={{color: resume.themeColor}}>Summary</h2>
            {resume.summary && <div className="text-xs font-normal">{parse(resume.summary)}</div>}
        </div>
    );
}

export default Summary;