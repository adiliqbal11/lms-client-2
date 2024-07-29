/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react'
import { Answer } from '../../shared/types'
import DataTableRenderer from '../../shared/components/Datatable/DatatableRenderer'
import { TableColumns } from '../../shared/components/Datatable/types'
import { Dialog } from 'primereact/dialog'
import fetchAnswerHandler from '../../context/server/answer/fetchAnswersHandler'
import { useAppContext } from '../../../layout/context/layoutcontext'
import { Button } from 'primereact/button'
import { convertTimeStamps } from '../../shared/common'
import AddAndEditAnswer from './addAndEditAnswer';


const ViewAnswer = () => {
    const g = useAppContext();
    const [answers, setAnswers] = useState<Answer[]>([] as Answer[]);
    const [UIanswers, setUIAnswers] = useState<Answer[]>([] as Answer[]);
    const [answer, setAnswer] = useState<Answer>({} as Answer);
    const [visible, setVisible] = useState<boolean>(false);

    const editAnswer = (answer: Answer) => {
        setAnswer(answer);
        setVisible(true);
    };
    const fetchAnswer = async () => {
        try {
            const response = await fetchAnswerHandler();
            if (response?.status) {
                setAnswers(response?.result?.data as Answer[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Answer" });
        }
    };
    const tableColumns: TableColumns[] = [
        {
            header: 'Answer',
            field: 'answer',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Type',
            field: 'type',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Dificulty Level',
            field: 'difficultyLevel',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Question',
            field: 'questionName',
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
            header: 'Action',
            field: 'action',
            style: { width: '15rem' },
        },
    ];
    useEffect(() => {
        fetchAnswer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [g?.newData?.answer?.isNewAnswer]);
    useEffect(() => {
        fetchAnswer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        let newAnswer = [] as Answer[];
        answers?.forEach(x => {
            newAnswer?.push({
                ...x,
                action: <Button label="Edit" className="p-button-info" onClick={() => editAnswer(x)
                } />,
                questionName: x?.question?.question,
                difficultyLevel: x?.question?.difficultyLevel as unknown as string,
                createdAt: convertTimeStamps(x?.createdAt),
                updatedAt: convertTimeStamps(x?.updatedAt)
            })
        });
        setUIAnswers(newAnswer);
    }, [answers]);
    return (
        <>
            <div className="grid">
                <Dialog visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <AddAndEditAnswer isNew={false} answer={answer} />
                </Dialog>
                <div className="col-12">
                    {UIanswers?.length > 0 && <DataTableRenderer<Answer> data={UIanswers} tableColumns={tableColumns} />}
                </div>
            </div>
        </>
    )
}

export default ViewAnswer