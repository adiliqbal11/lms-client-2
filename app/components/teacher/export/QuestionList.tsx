'use client';
import React, { useState, useEffect, useRef } from 'react';
import { TreeTable, TreeTableSelectionKeysType } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import { InputText } from 'primereact/inputtext';
import { Question } from '../../../shared/types';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import QuestionPaper from './questionPaper';
import { InputSwitch } from 'primereact/inputswitch';
import ReserveQuestionAsPractice from '../../../context/server/export/reserveQuestionAsPractice';
import FormFieldWithLabel from '../../../shared/components/FormFieldWithLabel/FormFieldWithLabel';
import { TextField } from '../../../shared/components/TextField/TextField';
import _ from 'lodash';
import { Toast } from 'primereact/toast';

interface QuestionListProps {
    filteredMcqQuestions: Question[]
    filteredShortQuestions: Question[]
    filteredLongQuestions: Question[]
    filteredFillInTheBlanksQuestions: Question[]
    filteredMultiFillInTheBlanksQuestions: Question[]
    filteredMultipleShortQuestions: Question[]
    filteredSequenceQuestions: Question[]
    filteredMultipleTrueFalseQuestions: Question[]
    filteredMultipleQuestionV2Questions: Question[]
    selectedMcq: TreeTableSelectionKeysType;
    setSelectedMcq: (e: TreeTableSelectionKeysType) => void;
    selectedShortQuestion: TreeTableSelectionKeysType;
    setSelectedShortQuestion: (e: TreeTableSelectionKeysType) => void;
    selectedFillInTheBlanks: TreeTableSelectionKeysType;
    setSelectedFillInTheBlanks: (e: TreeTableSelectionKeysType) => void;
    selectedMultiFillInTheBlanks: TreeTableSelectionKeysType;
    setSelectedMultiFillInTheBlanks: (e: TreeTableSelectionKeysType) => void;
    selectedMultipleShort: TreeTableSelectionKeysType;
    setSelectedMultipleShort: (e: TreeTableSelectionKeysType) => void;
    selectedSequence: TreeTableSelectionKeysType;
    setSelectedSequence: (e: TreeTableSelectionKeysType) => void;
    selectedMultipleTrueFalse: TreeTableSelectionKeysType;
    setSelectedMultipleTrueFalse: (e: TreeTableSelectionKeysType) => void;
    selectedLongQuestion: TreeTableSelectionKeysType;
    setSelectedLongQuestion: (e: TreeTableSelectionKeysType) => void;
    selectedMultipleQuestionV2: TreeTableSelectionKeysType;
    setSelectedMultipleQuestionV2: (e: TreeTableSelectionKeysType) => void;
    loading: boolean;
    setVisible: (e: boolean) => void;
    questionMode: string;
}

const QuestionList: React.FC<QuestionListProps> = (props) => {
    const [mcq, setMcq] = useState<TreeNode[]>([]);
    const [shortQuestions, setShortQuestions] = useState<TreeNode[]>([]);
    const [longQuestions, setLongQuestions] = useState<TreeNode[]>([]);
    const [fillInTheBlanksQuestions, setFillInTheBlanksQuestions] = useState<TreeNode[]>([]);
    const [multiFillInTheBlanksQuestions, setMultiFillInTheBlanksQuestions] = useState<TreeNode[]>([]);
    const [multipleShortQuestions, setMultipleShortQuestions] = useState<TreeNode[]>([]);
    const [sequenceQuestions, setSequenceQuestions] = useState<TreeNode[]>([]);
    const [multipleTrueFalseQuestions, setMultipleTrueFalseQuestions] = useState<TreeNode[]>([]);
    const [multipleQuestionV2Questions, setMultipleQuestionV2Questions] = useState<TreeNode[]>([]);
    const [mcqGlobalFilter, setMcqGlobalFilter] = useState<string>('');
    const [shortQuestionGlobalFilter, setShortQuestionGlobalFilter] = useState<string>('');
    const [longQuestionGlobalFilter, setLongQUestionGlobalFilter] = useState<string>('');
    const [fillInTheBlanksGlobalFilter, setFillInTheBlanksGlobalFilter] = useState<string>('');
    const [multiFillInTheBlanksGlobalFilter, setMultiFillInTheBlanksGlobalFilter] = useState<string>('');
    const [multipleShortGlobalFilter, setMultipleShortGlobalFilter] = useState<string>('');
    const [sequenceGlobalFilter, setSequenceGlobalFilter] = useState<string>('');
    const [multipleTrueFalseGlobalFilter, setMultipleTrueFalseGlobalFilter] = useState<string>('');
    const [multipleQuestionV2GlobalFilter, setMultipleQuestionV2GlobalFilter] = useState<string>('');
    const [mode, setMode] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [download, setDownload] = useState<boolean>(false);
    const [exportName, setExportName] = useState<string>("")
    const [exportNameVisible, setExportNameVisible] = useState<boolean>(false)
    const toast = useRef<Toast>(null);

    const handleTriggerDownload = () => {
        if (_?.isEmpty(exportName) || exportName?.length < 5) {
            return toast?.current?.show({ severity: 'error', summary: 'Error', detail: "Please Input a name, Or name length must be greater than 5", life: 3000 });
        }
         
        reservedQuestions();
    }
    const handleGetExportName = () => {
        setExportNameVisible(true)
    }
    const createQuestionTree = (questions: Question[], type: string) => {
        const tree: TreeNode[] = [];
        questions?.forEach((question, index) => {
            const node: TreeNode = {
                key: index + 1,
                data: {
                    question: question?.question,
                    type: question?.type,
                    subTopic: question?.subTopic?.subTopic,
                },
                children: question?.answers?.map((answer, index) => {
                    return {
                        data: {
                            question: answer?.answer?.length > 14 ? answer?.answer?.substring(0, 14) + "..." : answer?.answer,
                            type: answer?.type,
                        },
                    }
                }),
            };
            tree?.push(node);
        });
        return tree
    };
    const onMcqInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMcqGlobalFilter(e.target.value);
    };
    const onShortQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShortQuestionGlobalFilter(e.target.value);
    };
    const onLongQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLongQUestionGlobalFilter(e.target.value);
    };
    const onFillInTheBlanksInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFillInTheBlanksGlobalFilter(e.target.value);
    };
    const onMultiFillInTheBlanksInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMultiFillInTheBlanksGlobalFilter(e.target.value);
    };
    const onMultipleShortQuestionsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMultipleShortGlobalFilter(e.target.value);
    };
    const onSequenceQuestionsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSequenceGlobalFilter(e.target.value);
    };
    const onMultipleTrueFalseQuestionsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMultipleTrueFalseGlobalFilter(e.target.value);
    };
    const onMultipleShortQuestionV2InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMultipleQuestionV2GlobalFilter(e.target.value);
    }

    const renderMcqHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={mcqGlobalFilter} onChange={onMcqInputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    };
    const mcqHeaderRender = renderMcqHeader();

    const renderShortQuestionHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={shortQuestionGlobalFilter} onChange={onShortQuestionInputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    };
    const shortQuestionHeaderRender = renderShortQuestionHeader();

    const renderLongQuestionHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={longQuestionGlobalFilter} onChange={onLongQuestionInputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    };
    const longQuestionHeaderRender = renderLongQuestionHeader();

    const renderFillInTheBlanksHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={fillInTheBlanksGlobalFilter} onChange={onFillInTheBlanksInputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    }
    const fillInTheBlanksHeaderRender = renderFillInTheBlanksHeader();

    const renderMultiFillInTheBlanksHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={multiFillInTheBlanksGlobalFilter} onChange={onMultiFillInTheBlanksInputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    }
    const multiFillInTheBlanksHeaderRender = renderMultiFillInTheBlanksHeader();

    const renderMultipleShortQuestionsHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={multipleShortGlobalFilter} onChange={onMultipleShortQuestionsInputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    }
    const multipleShortQuestionsHeaderRender = renderMultipleShortQuestionsHeader();

    const renderSequenceQuestionsHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={sequenceGlobalFilter} onChange={onSequenceQuestionsInputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    }
    const sequenceQuestionsHeaderRender = renderSequenceQuestionsHeader();

    const renderMultipleTrueFalseQuestionsHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={multipleTrueFalseGlobalFilter} onChange={onMultipleTrueFalseQuestionsInputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    }
    const multipleTrueFalseQuestionsHeaderRender = renderMultipleTrueFalseQuestionsHeader();

    const renderMultipleShortQuestionV2Header = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">

                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={multipleQuestionV2GlobalFilter} onChange={onMultipleShortQuestionV2InputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    }
    const multipleShortQuestionV2HeaderRender = renderMultipleShortQuestionV2Header();
    useEffect(() => {
        setMcq(createQuestionTree(props.filteredMcqQuestions, "mcq"));
        setShortQuestions(createQuestionTree(props.filteredShortQuestions, "shortQuestion"));
        setLongQuestions(createQuestionTree(props.filteredLongQuestions, "longQuestion"));
        setFillInTheBlanksQuestions(createQuestionTree(props.filteredFillInTheBlanksQuestions, "fillInTheBlanks"));
        setMultiFillInTheBlanksQuestions(createQuestionTree(props.filteredMultiFillInTheBlanksQuestions, "multiFillInTheBlanks"));
        setMultipleShortQuestions(createQuestionTree(props.filteredMultipleShortQuestions, "multipleShortQuestions"));
        setSequenceQuestions(createQuestionTree(props.filteredSequenceQuestions, "sequenceQuestions"));
        setMultipleTrueFalseQuestions(createQuestionTree(props.filteredMultipleTrueFalseQuestions, "multipleTrueFalseQuestions"));
        setMultipleQuestionV2Questions(createQuestionTree(props.filteredMultipleQuestionV2Questions, "multipleShortQuestionV2"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.filteredMcqQuestions, props?.filteredShortQuestions, props?.filteredLongQuestions, props?.selectedMcq, props?.selectedShortQuestion, props?.selectedLongQuestion, props?.filteredFillInTheBlanksQuestions, props?.filteredMultiFillInTheBlanksQuestions, props?.filteredMultipleShortQuestions, props?.filteredSequenceQuestions, props?.filteredMultipleTrueFalseQuestions, props?.filteredMultipleQuestionV2Questions]);
    const Header = () => {
        return (<>
            <div style={{ position: 'sticky', top: 0, zIndex: 1000 }} className='flex align-items-center'>
                <label htmlFor="" className='mr-3 font-bold'> {mode ? `Teacher Mode` : `Exam Mode`}</label>
                <InputSwitch checked={mode} onChange={(e) => setMode(!mode)} />
                <Button onClick={() => {
                    handleGetExportName()
                }} className='mx-2' label='Download' />
            </div>
        </>)
    }
    const reservedQuestions = async () => {
        try {
            const questionsIds = [] as string[]
            props?.filteredMcqQuestions?.forEach((question) => {
                questionsIds.push(question?.id)
            })
            props?.filteredShortQuestions?.forEach((question) => {
                questionsIds.push(question?.id)
            })
            props?.filteredLongQuestions?.forEach((question) => {
                questionsIds.push(question?.id)
            })
            props?.filteredFillInTheBlanksQuestions?.forEach((question) => {
                questionsIds.push(question?.id)
            })
            props?.filteredMultiFillInTheBlanksQuestions?.forEach((question) => {
                questionsIds.push(question?.id)
            })
            props?.filteredMultipleShortQuestions?.forEach((question) => {
                questionsIds.push(question?.id)
            })
            props?.filteredSequenceQuestions?.forEach((question) => {
                questionsIds.push(question?.id)
            })
            props?.filteredMultipleTrueFalseQuestions?.forEach((question) => {
                questionsIds.push(question?.id)
            })
            props?.filteredMultipleQuestionV2Questions?.forEach((question) => {
                questionsIds.push(question?.id)
            })
            const uniqueArray: string[] = Array?.from(new Set(questionsIds));
            const response = await ReserveQuestionAsPractice({ questionIds: uniqueArray, questionMode: props?.questionMode, name: exportName }, "callback");
            console.log("====>", response)
            if (response?.result?.status) {
                setDownload(!download);
                setExportNameVisible(false);
            } else {
                toast?.current?.show({ severity: 'error', summary: 'Error', detail: response?.result?.message, life: 3000 });
            }
        } catch (error) {
            toast?.current?.show({ severity: 'error', summary: 'Error', detail: "Something Went Wrong", life: 3000 });
        }
    }
    return (
        <div className="grid">
            <Toast ref={toast} />
            <Dialog header="Header" visible={exportNameVisible} style={{ width: '50vw' }} onHide={() => setExportNameVisible(false)}>

                <FormFieldWithLabel

                    label="Name for your export"
                    showCharLimit={false}
                    showOptionalText={false}
                    formField={
                        <div className="flex flex-column gap-2">
                            <Toast ref={toast} />
                            <label htmlFor="username">Name</label>
                            <InputText onChange={(e) => setExportName(e?.target.value)} id="username" aria-describedby="username-help" />
                            <small id="username-help">
                                Enter name for this export
                            </small>
                        </div>
                    }
                />
                <div className="gap-2">
                    <Button label={`Download`} onClick={handleTriggerDownload} icon="pi pi-check" />
                </div>
            </Dialog>
            <Dialog header={Header} visible={visible} maximizable style={{ width: '80vw', height: '100vh' }} onHide={() => setVisible(false)}>
                <QuestionPaper
                    filteredMcqQuestions={props?.filteredMcqQuestions}
                    filteredShortQuestions={props?.filteredShortQuestions}
                    filteredLongQuestions={props?.filteredLongQuestions}
                    filteredFillInTheBlanksQuestions={props?.filteredFillInTheBlanksQuestions}
                    filteredMultiFillInTheBlanksQuestions={props?.filteredMultiFillInTheBlanksQuestions}
                    filteredMultipleShortQuestions={props?.filteredMultipleShortQuestions}
                    filteredSequenceQuestions={props?.filteredSequenceQuestions}
                    filteredMultipleTrueFalseQuestions={props?.filteredMultipleTrueFalseQuestions}
                    filteredMultipleQuestionV2Questions={props?.filteredMultipleQuestionV2Questions}
                    download={download}
                    mode={mode}
                />
            </Dialog>
            <div className="col-12 my-3">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <Button label='Preview' icon="pi pi-eye" onClick={() => setVisible(!visible)} />
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>MCQ</h5>
                    <TreeTable value={mcq} globalFilter={mcqGlobalFilter} header={mcqHeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedMcq} onSelectionChange={(e) => props?.setSelectedMcq(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Short Questions</h5>
                    <TreeTable value={shortQuestions} globalFilter={shortQuestionGlobalFilter} header={shortQuestionHeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedShortQuestion} onSelectionChange={(e) => props?.setSelectedShortQuestion(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Fill in the blanks</h5>
                    <TreeTable value={fillInTheBlanksQuestions} globalFilter={fillInTheBlanksGlobalFilter} header={fillInTheBlanksHeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedFillInTheBlanks} onSelectionChange={(e) => props?.setSelectedFillInTheBlanks(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Multi Fill in the blanks</h5>
                    <TreeTable value={multiFillInTheBlanksQuestions} globalFilter={multiFillInTheBlanksGlobalFilter} header={multiFillInTheBlanksHeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedMultiFillInTheBlanks} onSelectionChange={(e) => props?.setSelectedMultiFillInTheBlanks(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Multiple Short Questions</h5>
                    <TreeTable value={multipleShortQuestions} globalFilter={multipleShortGlobalFilter} header={multipleShortQuestionsHeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedMultipleShort} onSelectionChange={(e) => props?.setSelectedMultipleShort(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Sequence Questions</h5>
                    <TreeTable value={sequenceQuestions} globalFilter={sequenceGlobalFilter} header={sequenceQuestionsHeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedSequence} onSelectionChange={(e) => props?.setSelectedSequence(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Multiple True False Questions</h5>
                    <TreeTable value={multipleTrueFalseQuestions} globalFilter={multipleTrueFalseGlobalFilter} header={multipleTrueFalseQuestionsHeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedMultipleTrueFalse} onSelectionChange={(e) => props?.setSelectedMultipleTrueFalse(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Multiple Short Questions V2</h5>
                    <TreeTable value={multipleQuestionV2Questions} globalFilter={multipleQuestionV2GlobalFilter} header={multipleShortQuestionV2HeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedMultipleShort} onSelectionChange={(e) => props?.setSelectedMultipleQuestionV2(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Long Question</h5>
                    <TreeTable value={longQuestions} globalFilter={longQuestionGlobalFilter} header={longQuestionHeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedLongQuestion} onSelectionChange={(e) => props?.setSelectedLongQuestion(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
        </div>
    );
};

export default QuestionList;