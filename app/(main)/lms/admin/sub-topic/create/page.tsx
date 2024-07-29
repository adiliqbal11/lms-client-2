'use client';

import React from 'react';
import PageHeader from '../../../../../components/pageHeader';
import AddAndEditSubTopic from '../../../../../components/subTopic/addAndEditSubTopic';
import ViewSubTopic from '../../../../../components/subTopic/viewSubTopics';


const AddSubTopic = () => {
    return (
        <div className="grid">
            <PageHeader title="Sub Topic" />
            <div className="col-12">
                <AddAndEditSubTopic isNew={true} />
            </div>
            <div className="col-12">
                <ViewSubTopic />
            </div>
        </div>
    );
};

export default AddSubTopic;
