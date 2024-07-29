/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import PageHeader from '../../../../../components/pageHeader';
import AddAndEditGrade from '../../../../../components/grade/addAndEditGrade';
import ViewGrade from '../../../../../components/grade/viewGrade';

const AddGrade = () => {
    return (
        <div className="grid">
            <PageHeader title="Grade" />
            <div className="col-12">
                <AddAndEditGrade isNew={true} />
            </div>
            <div className="col-12">
                <ViewGrade />
            </div>
        </div>
    );
};

export default AddGrade;
