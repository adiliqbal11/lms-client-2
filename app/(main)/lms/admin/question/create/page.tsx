'use client';

import React from 'react';
import PageHeader from '../../../../../components/pageHeader';
import AddAndEditQuestion from '../../../../../components/questions/addAndEditQuestion';
import ViewQuestion from '../../../../../components/questions/viewQuestions';


const AddTopic = () => {
    return (
        <div className="grid">
            <PageHeader title="Topic" />
            <div className="col-12">
                <AddAndEditQuestion isNew={true} />
            </div>
            <div className="col-12">
                <ViewQuestion />
            </div>
        </div>
    );
};

export default AddTopic;
