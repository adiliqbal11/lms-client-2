'use client';

import React from 'react';
import PageHeader from '../../../../../components/pageHeader';
import AddAndEditSubject from '../../../../../components/subject/addAndEditSubject';
import ViewSubject from '../../../../../components/subject/viewSubjects';

const AddSubject = () => {
    return (
        <div className="grid">
            <PageHeader title="Subject" />
            <div className="col-12">
                <AddAndEditSubject isNew={true} />
            </div>
            <div className="col-12">
                <ViewSubject />
            </div>
        </div>
    );
};

export default AddSubject;
