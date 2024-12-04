import React, { useState } from 'react';

const RecordedLectureAttachments = () => {
    const buttonStyles = 'bg-yellow-300 text-xl text-black mx-5 p-2 rounded-md';
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="flex flex-col w-2/3">
            <div className="grid grid-cols-3">
                <button
                    className={buttonStyles}
                    onClick={() => toggleSection('notes')}
                >
                    Notes
                </button>
                <button
                    className={buttonStyles}
                    onClick={() => toggleSection('illustrations')}
                >
                    Illustrations
                </button>
                <button
                    className={buttonStyles}
                    onClick={() => toggleSection('vocational')}
                >
                    Vocational Learning Module
                </button>
            </div>

            {openSection === 'notes' && <div>Notes</div>}
            {openSection === 'illustrations' && <div>Illustrations</div>}
            {openSection === 'vocational' && <div>Vocational Learning</div>}
        </div>
    );
};

export default RecordedLectureAttachments;
