/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef, useState } from 'react'
import { Histories } from '../../shared/types'
import DataTableRenderer from '../../shared/components/Datatable/DatatableRenderer'
import { TableColumns } from '../../shared/components/Datatable/types'
import { useAppContext } from '../../../layout/context/layoutcontext'
import { Button } from 'primereact/button'
import { convertTimeStamps } from '../../shared/common'
import fetchReserveQuestionsHandler from '../../context/server/answer/fetchReserveQuestionsHandler';
import RemoveDownloadHistoryCommandHandler from '../../context/server/export/removeDownloadHistoryCommandHandler';
import { Toast } from "primereact/toast";


const ViewHistory = () => {
    const g = useAppContext();
    const [histories, setHistories] = useState<Histories[]>([] as Histories[]);
    const [UIHistories, setUIHistories] = useState<Histories[]>([] as Histories[]);
    const [visible, setVisible] = useState<boolean>(false);
    const toast = useRef<Toast>(null);

    const fetchDownloadHistory = async () => {
        try {
            const response = await fetchReserveQuestionsHandler();
            if (response?.status) {
                setHistories(response?.result?.data as Histories[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Answer" });
        }
    };
    const removeHistory = async (id: string) => {
        try {
            const history = await RemoveDownloadHistoryCommandHandler(id);
            if(history?.status){
               toast?.current?.show({severity: 'success', summary: 'Success', detail: history?.result?.message, life: 3000});
            } else {
                toast?.current?.show({severity: 'error', summary: 'Error', detail: history?.result?.message, life: 3000});      
            }
            await fetchDownloadHistory();
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Deleting Answer" });
        }
    }

    const tableColumns: TableColumns[] = [
        {
            header: 'Type',
            field: 'exportType',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Date',
            field: 'createdAt',
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
        fetchDownloadHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let newHistories = [] as Histories[];
        histories?.forEach(x => {
            newHistories?.push({
                id: x?.id,
                exportType: x?.exportType, 
                question: x?.question,
                createdAt: convertTimeStamps(x?.createdAt),
                action: <Button label="Remove" className="p-button-info" onClick={() => removeHistory(x?.id)} />
            })
        });
        setUIHistories(newHistories);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [histories]);
    return (
        <>
         <Toast ref={toast} />
            <div className="grid">
                <div className="col-12">
                    {UIHistories?.length > 0 && <DataTableRenderer<Histories> data={UIHistories} tableColumns={tableColumns} />}
                </div>
            </div>
        </>
    )
}

export default ViewHistory