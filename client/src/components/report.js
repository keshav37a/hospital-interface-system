import React from 'react';

const report = (props)=>{
    const {report} = props;
    return (
        <div>
            <div className="report">
                <div>Patient's Name: {report.patient}</div>
                <div>Doctor's Name: {report.patient}</div>
                <div>Status: {report.status}</div>
                <div>Date: {report.date}</div>
            </div>
        </div>
    );
}

export default report;