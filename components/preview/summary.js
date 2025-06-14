import React from 'react';

function Summary({resume}) {
    return (
        <p className="text-xs">
            {resume.summary}
        </p>
    );
}

export default Summary;