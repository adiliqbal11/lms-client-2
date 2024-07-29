/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react'
import { Subject } from '../../shared/types'
import DataTableRenderer from '../../shared/components/Datatable/DatatableRenderer'
import { TableColumns } from '../../shared/components/Datatable/types'
import { Dialog } from 'primereact/dialog'
import fetchSubjectHandler from '../../context/server/subject/fetchSubjectsHandler'
import { useAppContext } from '../../../layout/context/layoutcontext'
import { Button } from 'primereact/button'
import { convertTimeStamps } from '../../shared/common'
import AddAndEditSubject from './addAndEditSubject';


const ViewSubject = () => {
    const g = useAppContext();
    const [subjects, setSubjects] = useState<Subject[]>([] as Subject[]);
    const [UIsubjects, setUISubjects] = useState<Subject[]>([] as Subject[]);
    const [subject, setSubject] = useState<Subject>({} as Subject);
    const [visible, setVisible] = useState<boolean>(false);

    const editSubject = (subject: Subject) => {
        setSubject(subject);
        setVisible(true);
    };
    const fetchSubject = async () => {
        try {
            const response = await fetchSubjectHandler();
            if (response?.status) {
                setSubjects(response?.result?.data as Subject[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Subject" });
        }
    };
    const tableColumns: TableColumns[] = [
        {
            header: 'Subject',
            field: 'subject',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Created At',
            field: 'createdAt',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Last Updated',
            field: 'updatedAt',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Grade',
            field: 'gradeName',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Action',
            field: 'action',
            style: { width: '15rem' },
        },
    ];
    useEffect(() => {
        fetchSubject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [g?.newData?.subject?.isNewSubject]);
    useEffect(() => {
        fetchSubject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        let newSubject = [] as Subject[];
        subjects?.forEach(x => {
            newSubject?.push({
                ...x,
                action: <Button label="Edit" className="p-button-info" onClick={() => editSubject(x)
                } />,
                gradeName: x?.grade?.grade,
                createdAt: convertTimeStamps(x?.createdAt),
                updatedAt: convertTimeStamps(x?.updatedAt)
            })
        });
        setUISubjects(newSubject);
    }, [subjects]);
    return (
        <>
            <div className="grid">
                <Dialog visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <AddAndEditSubject isNew={false} subject={subject} />
                </Dialog>
                <div className="col-12">
                    {UIsubjects?.length > 0 && <DataTableRenderer<Subject> data={UIsubjects} tableColumns={tableColumns} />}
                </div>
            </div>
        </>
    )
}

export default ViewSubject