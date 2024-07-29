/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react'
import { Topic } from '../../shared/types'
import DataTableRenderer from '../../shared/components/Datatable/DatatableRenderer'
import { TableColumns } from '../../shared/components/Datatable/types'
import { Dialog } from 'primereact/dialog'
import fetchTopicHandler from '../../context/server/topic/fetchTopicsHandler'
import { useAppContext } from '../../../layout/context/layoutcontext'
import { Button } from 'primereact/button'
import { convertTimeStamps } from '../../shared/common'
import AddAndEditTopic from '../../components/topic/addAndEditTopic';


const ViewTopic = () => {
    const g = useAppContext();
    const [topics, setTopics] = useState<Topic[]>([] as Topic[]);
    const [UItopics, setUITopics] = useState<Topic[]>([] as Topic[]);
    const [topic, setTopic] = useState<Topic>({} as Topic);
    const [visible, setVisible] = useState<boolean>(false);

    const editTopic = (topic: Topic) => {
        setTopic(topic);
        setVisible(true);
    };
    const fetchTopic = async () => {
        try {
            const response = await fetchTopicHandler();
            if (response?.status) {
                setTopics(response?.result?.data as Topic[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Topic" });
        }
    };
    const tableColumns: TableColumns[] = [
        {
            header: 'Topic',
            field: 'topic',
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
            header: 'Subject',
            field: 'subjectName',
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
        fetchTopic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [g?.newData?.topic?.isNewTopic]);
    useEffect(() => {
        fetchTopic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        let newTopic = [] as Topic[];
        topics?.forEach(x => {
            newTopic?.push({
                ...x,
                action: <Button label="Edit" className="p-button-info" onClick={() => editTopic(x)
                } />,
                subjectName: x?.subject?.subject,
                createdAt: convertTimeStamps(x?.createdAt),
                updatedAt: convertTimeStamps(x?.updatedAt)
            })
        });
        setUITopics(newTopic);
    }, [topics]);
    return (
        <>
            <div className="grid">
                <Dialog visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <AddAndEditTopic isNew={false} topic={topic} />
                </Dialog>
                <div className="col-12">
                    {UItopics?.length > 0 && <DataTableRenderer<Topic> data={UItopics} tableColumns={tableColumns} />}
                </div>
            </div>
        </>
    )
}

export default ViewTopic