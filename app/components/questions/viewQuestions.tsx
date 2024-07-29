/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react'
import { Question } from '../../shared/types'
import DataTableRenderer from '../../shared/components/Datatable/DatatableRenderer'
import { TableColumns } from '../../shared/components/Datatable/types'
import { Dialog } from 'primereact/dialog'
import fetchQuestionHandler from '../../context/server/question/fetchQuestionsHandler'
import { useAppContext } from '../../../layout/context/layoutcontext'
import { Button } from 'primereact/button'
import { convertTimeStamps } from '../../shared/common'
import AddAndEditQuestion from './addAndEditQuestion';


const ViewQuestion = () => {
    const g = useAppContext();
    const [questions, setQuestions] = useState<Question[]>([] as Question[]);
    const [UIquestions, setUIQuestions] = useState<Question[]>([] as Question[]);
    const [question, setQuestion] = useState<Question>({} as Question);
    const [visible, setVisible] = useState<boolean>(false);

    const editQuestion = (question: Question) => {
        setQuestion(question);
        setVisible(true);
    };
    const fetchQuestion = async () => {
        try {
            const response = await fetchQuestionHandler();
            if (response?.status) {
                setQuestions(response?.result?.data as Question[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Question" });
        }
    };
    const tableColumns: TableColumns[] = [
        {
            header: 'Question',
            field: 'question',
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
            header: 'Marks',
            field: 'marks',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Sub Topic Name',
            field: 'subTopicName',
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
        fetchQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [g?.newData?.question?.isNewQuestion]);
    useEffect(() => {
        fetchQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        let newQuestion = [] as Question[];
        questions?.forEach(x => {
            newQuestion?.push({
                ...x,
                action: <Button label="Edit" className="p-button-info" onClick={() => editQuestion(x)
                } />,
                subTopicName: x?.subTopic?.subTopic,
                createdAt: convertTimeStamps(x?.createdAt),
                updatedAt: convertTimeStamps(x?.updatedAt)
            })
        });
        setUIQuestions(newQuestion);
    }, [questions]);
    return (
        <>
            <div className="grid">
                <Dialog visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <AddAndEditQuestion isNew={false} question={question} />
                </Dialog>
                <div className="col-12">
                    {UIquestions?.length > 0 && <DataTableRenderer<Question> data={UIquestions} tableColumns={tableColumns} />}
                </div>
            </div>
        </>
    )
}

export default ViewQuestion