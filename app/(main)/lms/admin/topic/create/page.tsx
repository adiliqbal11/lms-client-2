'use client';

import React from 'react';
import PageHeader from '../../../../../components/pageHeader';
import AddAndEditTopic from '../../../../../components/topic/addAndEditTopic';
import ViewTopic from '../../../../../components/topic/viewTopics';


const AddTopic = () => {
    return (
        <div className="grid">
            <PageHeader title="Topic" />
            <div className="col-12">
                <AddAndEditTopic isNew={true} />
            </div>
            <div className="col-12">
                <ViewTopic />
            </div>
        </div>
    );
};

export default AddTopic;
