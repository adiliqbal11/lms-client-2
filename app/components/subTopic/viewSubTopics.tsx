/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react'
import { SubTopic } from '../../shared/types'
import DataTableRenderer from '../../shared/components/Datatable/DatatableRenderer'
import { TableColumns } from '../../shared/components/Datatable/types'
import { Dialog } from 'primereact/dialog'
import fetchSubTopicHandler from '../../context/server/subTopic/fetchSubTopicsHandler'
import { useAppContext } from '../../../layout/context/layoutcontext'
import { Button } from 'primereact/button'
import { convertTimeStamps } from '../../shared/common'
import AddAndEditSubTopic from './addAndEditSubTopic';


const ViewSubTopic = () => {
    const g = useAppContext();
    const [subTopics, setSubTopics] = useState<SubTopic[]>([] as SubTopic[]);
    const [UIsubTopics, setUISubTopics] = useState<SubTopic[]>([] as SubTopic[]);
    const [subTopic, setSubTopic] = useState<SubTopic>({} as SubTopic);
    const [visible, setVisible] = useState<boolean>(false);

    const editSubTopic = (subTopic: SubTopic) => {
        setSubTopic(subTopic);
        setVisible(true);
    };
    const fetchSubTopic = async () => {
        try {
            const response = await fetchSubTopicHandler();
            if (response?.status) {
                setSubTopics(response?.result?.data as SubTopic[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching SubTopic" });
        }
    };
    const tableColumns: TableColumns[] = [
        {
            header: 'Sub Topic',
            field: 'subTopic',
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
            header: 'Topic',
            field: 'topicName',
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
        fetchSubTopic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [g?.newData?.subTopic?.isNewSubTopic]);
    useEffect(() => {
        fetchSubTopic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        let newSubTopic = [] as SubTopic[];
        subTopics?.forEach(x => {
            newSubTopic?.push({
                ...x,
                action: <Button label="Edit" className="p-button-info" onClick={() => editSubTopic(x)
                } />,
                topicName: x?.topic?.topic,
                createdAt: convertTimeStamps(x?.createdAt),
                updatedAt: convertTimeStamps(x?.updatedAt)
            })
        });
        setUISubTopics(newSubTopic);
    }, [subTopics]);
    return (
        <>
            <div className="grid">
                <Dialog visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <AddAndEditSubTopic isNew={false} subTopic={subTopic} />
                </Dialog>
                <div className="col-12">
                    {UIsubTopics?.length > 0 && <DataTableRenderer<SubTopic> data={UIsubTopics} tableColumns={tableColumns} />}
                </div>
            </div>
        </>
    )
}

export default ViewSubTopic