'use client';

import React from 'react';
import PageHeader from '../../../../../components/pageHeader';
import ViewAnswer from '../../../../../components/answer/viewAnswers';
import AddAndEditAnswer from '../../../../../components/answer/addAndEditAnswer';



const AddTopic = () => {
    return (
        <div className="grid">
            <PageHeader title="Topic" />
            <div className="col-12">
                <AddAndEditAnswer isNew={true} />
            </div>
            <div className="col-12">
                <ViewAnswer />
            </div>
        </div>
    );
};

export default AddTopic;
