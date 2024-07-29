'use client'
import React from 'react';
import AddAndEditSchool from '../../../../../components/school/addAndEditSchool';
import PageHeader from '../../../../../components/pageHeader';
import ViewSchool from '../../../../../components/school/viewSchool';


const AddSchool = () => {
    return (
        <div className="grid">
            <PageHeader title="School" />
            <div className="col-12">
                <AddAndEditSchool isNew={true} />
            </div>
            <div className="col-12">
                <ViewSchool />
            </div>
        </div>
    );
}
export default AddSchool;


