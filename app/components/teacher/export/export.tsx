'use client'
import React, { useEffect, useRef, useState } from 'react'
import FormFieldWithLabel from '../../../shared/components/FormFieldWithLabel/FormFieldWithLabel'
import { TextField } from '../../../shared/components/TextField/TextField'
import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import { ExportAnswers, Grade, Question, School, SubTopic, Subject, Topic } from '../../../shared/types'
import { Dropdown } from 'primereact/dropdown'
import { ErrorMessage } from '../../../shared/components/ErrorMessage/ErrorMessage'
import { useAppContext } from '../../../../layout/context/layoutcontext'
import fetchSchoolsHandler from '../../../context/server/school/fetchSchoolsHandler'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'
import { Toast } from 'primereact/toast'
import fetchGradeBySchoolIdHandler from '../../../context/server/grade/fetchGradeBySchoolIdHandler'
import fetchSubjectByGradeIdHandler from '../../../context/server/subject/fetchSubjectByGradeIdHandler'
import fetchTopicBySubjectIdHandler from '../../../context/server/topic/fetchTopicBySubjectIdHandler'
import fetchSubTopicBySubTopicIdHandler from '../../../context/server/subTopic/fetchSubTopicBySubTopicIdHandler'
import _, { set } from 'lodash'
import { Dialog } from 'primereact/dialog'
import QuestionList from './QuestionList'
import { TreeTableSelectionKeysType } from 'primereact/treetable'
import fetchQuestionsForExportHandler from '../../../context/server/export/fetchQuestionsForExportHandler'
import { ExportTypes } from './types'


const Export: React.FC = () => {
    const g = useAppContext();
    const toast = useRef<Toast>(null);
    const { control, handleSubmit, watch, reset, setValue, formState: { errors: ExportErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<ExportAnswers>({
        mode: 'onBlur',
    });
    const [schools, setSchools] = useState<School[]>([] as School[]);
    const [grades, setGrades] = useState<Grade[]>([] as Grade[]);
    const [subjects, setSubjects] = useState<Subject[]>([] as Subject[]);
    const [topics, setTopics] = useState<Topic[]>([] as Topic[]);
    const [subTopics, setSubTopics] = useState<SubTopic[]>([] as SubTopic[]);
    const [MCQVisible, setMCQVisible] = useState<boolean>(false);
    const [shortQuestionVisible, setShortQuestionVisible] = useState<boolean>(false);
    const [longQuestionVisible, setLongQuestionVisible] = useState<boolean>(false);
    const [practiceMode, setPracticeMode] = useState<boolean>(false);
    const [fillInTheBlanksVisible, setFillInTheBlanksVisible] = useState<boolean>(false);
    const [multiFillInTheBlanksVisible, setMultiFillInTheBlanksVisible] = useState<boolean>(false);
    const [multipleShortVisible, setMultipleShortVisible] = useState<boolean>(false);
    const [sequenceVisible, setSequenceVisible] = useState<boolean>(false);
    const [multipleTrueFalseVisible, setMultipleTrueFalseVisible] = useState<boolean>(false);
    const [multipleQuestionV2Visible, setMultipleQuestionV2Visible] = useState<boolean>(false);
    const [filteredMcqQuestions, setFilteredMcqQuestions] = useState<Question[]>([] as Question[]);
    const [filteredShortQuestions, setFilteredShortQuestions] = useState<Question[]>([] as Question[]);
    const [filteredLongQuestions, setFilteredLongQuestions] = useState<Question[]>([] as Question[]);
    const [filteredFillInTheBlanksQuestions, setFilteredFillInTheBlanksQuestions] = useState<Question[]>([] as Question[]);
    const [filteredMultiFillInTheBlanksQuestions, setFilteredMultiFillInTheBlanksQuestions] = useState<Question[]>([] as Question[]);
    const [filteredMultipleShortQuestions, setFilteredMultipleShortQuestions] = useState<Question[]>([] as Question[]);
    const [filteredSequenceQuestions, setFilteredSequenceQuestions] = useState<Question[]>([] as Question[]);
    const [filteredMultipleTrueFalseQuestions, setFilteredMultipleTrueFalseQuestions] = useState<Question[]>([] as Question[]);
    const [filteredMultipleQuestionV2Questions, setFilteredMultipleQuestionV2Questions] = useState<Question[]>([] as Question[]);
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedMqs, setSelectedMcq] = useState<TreeTableSelectionKeysType>({} as TreeTableSelectionKeysType);
    const [selectedShortQuestion, setSelectedShortQuestion] = useState<TreeTableSelectionKeysType>({} as TreeTableSelectionKeysType);
    const [selectedLongQuestion, setSelectedLongQuestion] = useState<TreeTableSelectionKeysType>({} as TreeTableSelectionKeysType);
    const [selectedFillInTheBlanks, setSelectedFillInTheBlanks] = useState<TreeTableSelectionKeysType>({} as TreeTableSelectionKeysType);
    const [selectedMultiFillInTheBlanks, setSelectedMultiFillInTheBlanks] = useState<TreeTableSelectionKeysType>({} as TreeTableSelectionKeysType);
    const [selectedMultipleShort, setSelectedMultipleShort] = useState<TreeTableSelectionKeysType>({} as TreeTableSelectionKeysType);
    const [selectedSequence, setSelectedSequence] = useState<TreeTableSelectionKeysType>({} as TreeTableSelectionKeysType);
    const [selectedMultipleTrueFalse, setSelectedMultipleTrueFalse] = useState<TreeTableSelectionKeysType>({} as TreeTableSelectionKeysType);
    const [selectedMultipleQuestionV2, setSelectedMultipleQuestionV2] = useState<TreeTableSelectionKeysType>({} as TreeTableSelectionKeysType);
    const [filterQuestionsLoading, setFilterQuestionsLoading] = useState<boolean>(false)

    const dificultyLevel = [
        { label: 'EASY', value: 'EASY' },
        { label: 'MEDIUM', value: 'MEDIUM' },
        { label: 'HARD', value: 'HARD' },
    ];
    const exportMode = [
        { label: 'Practice', value: ExportTypes.PRACTICE },
        { label: 'Paper', value: ExportTypes.PAPER },
    ]

    const fetchSuggestQuestions = async (data: ExportAnswers) => {
        try {
            setFilterQuestionsLoading(true);
            const questions = await fetchQuestionsForExportHandler(data, "callback");
            if (questions?.status) {
                setFilteredMcqQuestions(questions?.result?.data?.mcqQuestion as Question[]);
                setFilteredShortQuestions(questions?.result?.data?.shortQuestion as Question[]);
                setFilteredLongQuestions(questions?.result?.data?.longQuestion as Question[]);
                setFilteredFillInTheBlanksQuestions(questions?.result?.data?.fillInTheBlanksQuestion as Question[]);
                setFilteredMultiFillInTheBlanksQuestions(questions?.result?.data?.multiFillInTheBlanksQuestion as Question[]);
                setFilteredMultipleShortQuestions(questions?.result?.data?.multipleShortQuestion as Question[]);
                setFilteredSequenceQuestions(questions?.result?.data?.sequenceQuestion as Question[]);
                setFilteredMultipleTrueFalseQuestions(questions?.result?.data?.multipleTrueFalseQuestion as Question[]);
                setFilteredMultipleQuestionV2Questions(questions?.result?.data?.multipleShortQuestionV2 as Question[]);
                setFilterQuestionsLoading(false);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Questions" });
        }
    }
    const submitForm: SubmitHandler<ExportAnswers> = async (ExportAnswers: ExportAnswers) => {
        try {
            if ((!(MCQVisible) && !(shortQuestionVisible) && !(longQuestionVisible) && !(fillInTheBlanksVisible) && !(multiFillInTheBlanksVisible) && !(multipleShortVisible) && !(sequenceVisible) && !(multipleTrueFalseVisible))) {
                toast?.current?.show({ severity: "warn", summary: "Warning", detail: "Please select at least one type of question", life: 3000 });
                return;
            }
            setVisible(true);
            console.log("ExportAnswers====>", ExportAnswers);
            ExportAnswers.isPracticeMode = practiceMode;
            await fetchSuggestQuestions(ExportAnswers);
        }
        catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something went wrong, Please try again later" })
        }
    }
    const fetchSchools = async () => {
        try {
            const response = await fetchSchoolsHandler();
            if (response?.status) {
                setSchools(response?.result?.data as School[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Schools" });
        }
    };

    const onSchoolChange = async (e: string, field: any) => {
        try {
            field?.onChange(e);
            const response = await fetchGradeBySchoolIdHandler(e as string);
            if (response?.status) {
                if (_?.isEmpty(response?.result?.data)) {
                    setValue('gradeId', '');
                    setValue('subjectId', '');
                    setValue('topicId', '');
                    setValue('subTopicId', '');
                }
                setGrades(response?.result?.data as Grade[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Topics" });
        }
    }

    const onChangeGrade = async (e: string, field: any) => {
        try {
            field?.onChange(e);
            const response = await fetchSubjectByGradeIdHandler(e as string);
            if (response?.status) {
                if (_?.isEmpty(response?.result?.data)) {
                    setValue('subjectId', '');
                    setValue('topicId', '');
                    setValue('subTopicId', '');
                }
                setSubjects(response?.result?.data as Subject[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching SubTopics" });
        }
    }
    const onChangeSubject = async (e: string, field: any) => {
        try {
            field?.onChange(e);
            const response = await fetchTopicBySubjectIdHandler(e as string);
            if (response?.status) {
                if (_?.isEmpty(response?.result?.data)) {
                    setValue('topicId', '');
                    setValue('subTopicId', '');
                }
                setTopics(response?.result?.data as Topic[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching SubTopics" });
        }
    }

    const onChangeTopic = async (e: string, field: any) => {
        try {
            field?.onChange(e);
            const response = await fetchSubTopicBySubTopicIdHandler(e as string);
            if (response?.status) {
                if (_?.isEmpty(response?.result?.data)) {
                    setValue('subTopicId', '');
                }
                setSubTopics(response?.result?.data as SubTopic[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching SubTopics" });
        }
    }

    useEffect(() => {
        fetchSchools();
        setValue('MCQVisible', MCQVisible);
        setValue('shortQuestionVisible', shortQuestionVisible);
        setValue('longQuestionVisible', longQuestionVisible);
        setValue('fillInTheBlanksVisible', fillInTheBlanksVisible);
        setValue('multiFillInTheBlanksVisible', multiFillInTheBlanksVisible);
        setValue('multipleShortVisible', multipleShortVisible);
        setValue('sequenceVisible', sequenceVisible);
        setValue('multipleTrueFalseVisible', multipleTrueFalseVisible);
        setValue('multipleQuestionV2Visible', multipleQuestionV2Visible);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setValue('MCQVisible', MCQVisible);
        setValue('shortQuestionVisible', shortQuestionVisible);
        setValue('longQuestionVisible', longQuestionVisible);
        setValue('fillInTheBlanksVisible', fillInTheBlanksVisible);
        setValue('multiFillInTheBlanksVisible', multiFillInTheBlanksVisible);
        setValue('multipleShortVisible', multipleShortVisible);
        setValue('sequenceVisible', sequenceVisible);
        setValue('multipleTrueFalseVisible', multipleTrueFalseVisible);
        setValue('multipleQuestionV2Visible', multipleQuestionV2Visible);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [MCQVisible, shortQuestionVisible, longQuestionVisible, fillInTheBlanksVisible, multiFillInTheBlanksVisible, multipleShortVisible, sequenceVisible, multipleTrueFalseVisible, multipleQuestionV2Visible]);

    return (
        <>
            <Toast ref={toast} />
            <Dialog visible={visible} maximizable style={{ width: '80vw' }} onHide={() => setVisible(false)}>
                <QuestionList
                    setVisible={setVisible}
                    filteredMcqQuestions={filteredMcqQuestions}
                    filteredShortQuestions={filteredShortQuestions}
                    filteredLongQuestions={filteredLongQuestions}
                    filteredFillInTheBlanksQuestions={filteredFillInTheBlanksQuestions}
                    filteredMultiFillInTheBlanksQuestions={filteredMultiFillInTheBlanksQuestions}
                    filteredMultipleShortQuestions={filteredMultipleShortQuestions}
                    filteredSequenceQuestions={filteredSequenceQuestions}
                    filteredMultipleTrueFalseQuestions={filteredMultipleTrueFalseQuestions}
                    filteredMultipleQuestionV2Questions={filteredMultipleQuestionV2Questions}
                    selectedMcq={selectedMqs}
                    setSelectedMcq={setSelectedMcq}
                    loading={filterQuestionsLoading}
                    selectedShortQuestion={selectedShortQuestion}
                    setSelectedShortQuestion={setSelectedShortQuestion}
                    selectedLongQuestion={selectedLongQuestion}
                    setSelectedLongQuestion={setSelectedLongQuestion}
                    selectedFillInTheBlanks={selectedFillInTheBlanks}
                    setSelectedFillInTheBlanks={setSelectedFillInTheBlanks}
                    selectedMultiFillInTheBlanks={selectedMultiFillInTheBlanks}
                    setSelectedMultiFillInTheBlanks={setSelectedMultiFillInTheBlanks}
                    selectedMultipleShort={selectedMultipleShort}
                    setSelectedMultipleShort={setSelectedMultipleShort}
                    selectedSequence={selectedSequence}
                    setSelectedSequence={setSelectedSequence}
                    selectedMultipleTrueFalse={selectedMultipleTrueFalse}
                    setSelectedMultipleTrueFalse={setSelectedMultipleTrueFalse}
                    selectedMultipleQuestionV2={selectedMultipleQuestionV2}
                    setSelectedMultipleQuestionV2={setSelectedMultipleQuestionV2}
                    questionMode={watch('exportMode')}
                />
            </Dialog>
            <h5>Export Answers</h5>
            <div className="card">
                <div className="grid p-fluid mt-3">
                    <div className="field col-12 md:col-3">
                        <Controller
                            name='schoolId'
                            control={control}
                            defaultValue=""
                            rules={{ required: "Select School" }}
                            render={({ field }) => (
                                <FormFieldWithLabel
                                    label="Select School"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={
                                        <>
                                            <Dropdown
                                                value={field?.value}
                                                onChange={(e) => { onSchoolChange(e?.value, field) }}
                                                options={schools}
                                                optionLabel="type"
                                                optionValue="id"
                                                placeholder="Select a School"
                                                filter
                                                className={`w-100 ${ExportErrors?.schoolId?.message ? "p-invalid" : ""}`}
                                            />
                                            <ErrorMessage text={ExportErrors?.schoolId?.message} />
                                        </>
                                    }
                                />
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-3">
                        <Controller
                            name='gradeId'
                            control={control}
                            defaultValue=""
                            rules={{ required: "Select Grade" }}
                            render={({ field }) => (
                                <FormFieldWithLabel
                                    label="Select Grade"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={
                                        <>
                                            <Dropdown
                                                value={field?.value}
                                                onChange={(e) => { onChangeGrade(e?.value, field) }}
                                                options={grades}
                                                optionLabel="grade"
                                                optionValue="id"
                                                placeholder="Select a Grade"
                                                filter
                                                className={`w-100 ${ExportErrors?.gradeId?.message ? "p-invalid" : ""}`}
                                            />
                                            <ErrorMessage text={ExportErrors?.gradeId?.message} />
                                        </>
                                    }
                                />
                            )}
                        />

                    </div>
                    <div className="field col-12 md:col-3">
                        <Controller
                            name='subjectId'
                            control={control}
                            defaultValue=""
                            rules={{ required: "Select Subject" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Subject"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={(e) => onChangeSubject(e?.value, field)}
                                                options={subjects}
                                                optionLabel="subject"
                                                optionValue="id"
                                                placeholder="Select a Subject"
                                                filter
                                                className={`w-100 ${ExportErrors?.subjectId?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.subjectId?.message} />
                                </>
                            )}
                        />

                    </div>
                    <div className="field col-12 md:col-3">
                        <Controller
                            name='topicId'
                            control={control}
                            defaultValue=""
                            rules={{ required: "Select Topic" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Topic"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={(e) => onChangeTopic(e?.value, field)}
                                                options={topics}
                                                optionLabel="topic"
                                                optionValue="id"
                                                placeholder="Select a Topic"
                                                filter
                                                className={`w-100 ${ExportErrors?.topicId?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.topicId?.message} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-16 md:col-6">
                        <Controller
                            name='subTopicId'
                            control={control}
                            rules={{ required: "Select Sub Topic" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Sub Topic"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={subTopics}
                                                optionLabel="subTopic"
                                                optionValue="id"
                                                placeholder="Select Sub Topic"
                                                filter
                                                className={`w-100 ${ExportErrors?.subTopicId?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.subTopicId?.message} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <Controller
                            name='exportMode'
                            control={control}
                            rules={{ required: "Select Export Mode" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Export Mode"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={exportMode}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Export Mode"
                                                filter
                                                className={`w-100 ${ExportErrors?.exportMode?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.exportMode?.message} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className='flex align-items-center'>
                            <label htmlFor="" className='mr-3 font-bold'> {`Use MCQ's`}</label>
                            <InputSwitch checked={MCQVisible} onChange={(e) => setMCQVisible(!MCQVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className='flex align-items-center'>
                            <label htmlFor="" className='mr-3 font-bold'> {`Use Short Question`}</label>
                            <InputSwitch checked={shortQuestionVisible} onChange={(e) => setShortQuestionVisible(!shortQuestionVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className='flex align-items-center'>
                            <label htmlFor="" className='mr-3 font-bold'> {`Use Long Answer`}</label>
                            <InputSwitch checked={longQuestionVisible} onChange={(e) => setLongQuestionVisible(!longQuestionVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className='flex align-items-center'>
                            <label htmlFor="" className='mr-3 font-bold'> {`File in the blanks`}</label>
                            <InputSwitch checked={fillInTheBlanksVisible} onChange={(e) => setFillInTheBlanksVisible(!fillInTheBlanksVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className='flex align-items-center'>
                            <label htmlFor="" className='mr-3 font-bold'> {`Multiple Short Question`}</label>
                            <InputSwitch checked={multipleShortVisible} onChange={(e) => setMultipleShortVisible(!multipleShortVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className='flex align-items-center'>
                            <label htmlFor="" className='mr-3 font-bold'> {`Sequence`}</label>
                            <InputSwitch checked={sequenceVisible} onChange={(e) => setSequenceVisible(!sequenceVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className='flex align-items-center'>
                            <label htmlFor="" className='mr-3 font-bold'> {`Multiple True False`}</label>
                            <InputSwitch checked={multipleTrueFalseVisible} onChange={(e) => setMultipleTrueFalseVisible(!multipleTrueFalseVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className='flex align-items-center'>
                            <label htmlFor="" className='mr-3 font-bold'> {`Multiple Fill in the blanks`}</label>
                            <InputSwitch checked={multiFillInTheBlanksVisible} onChange={(e) => setMultiFillInTheBlanksVisible(!multiFillInTheBlanksVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className='flex align-items-center'>
                            <label htmlFor="" className='mr-3 font-bold'> {`Group Short Question`}</label>
                            <InputSwitch checked={multipleQuestionV2Visible} onChange={(e) => setMultipleQuestionV2Visible(!multipleQuestionV2Visible)} />
                        </div>
                    </div>
                </div>

                {MCQVisible && <div className="grid p-fluid mt-4">
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='mcqQuestionQuantity'
                            control={control}
                            rules={MCQVisible ? {
                                required: "Select MCQ's Quantity",
                                validate: {
                                    minValue: value => (value >= 5) || "Minimum MCQ's Quantity Should be 5",
                                    maxValue: value => (value <= 15) || "Maximum MCQ's Quantity Should be 15"
                                }
                            } : {}

                            }
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select MCQ's Quantity"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <TextField type='number' placeholder="eg. 10" errorMessage={ExportErrors?.mcqQuestionQuantity?.message} value={String(field?.value)} onChange={field.onChange} />} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='mcqDifficultyLevel'
                            control={control}
                            rules={{ required: "Select MCQ's Dificulty Level" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Dificulty Level"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={dificultyLevel}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Dificulty Level"
                                                filter
                                                className={`w-100 ${ExportErrors?.mcqDifficultyLevel?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.mcqDifficultyLevel?.message} />
                                </>
                            )}
                        />
                    </div>

                </div>}

                {shortQuestionVisible && <div className="grid p-fluid mt-4">
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='shortQuestionQuantity'
                            control={control}
                            rules={shortQuestionVisible ? {
                                required: "Select Short Quantity",
                                validate: {
                                    minValue: value => (value >= 5) || "Minimum Short Quantity Should be 5",
                                    maxValue: value => (value <= 15) || "Maximum Short Quantity Should be 15"
                                }
                            } : {}

                            }
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Short Quantity"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <TextField type='number' placeholder="eg. 10" errorMessage={ExportErrors?.shortQuestionQuantity?.message} value={String(field?.value)} onChange={field.onChange} />} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='shortQuestionDifficultyLevel'
                            control={control}
                            rules={{ required: "Select Short Question Dificulty Level" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Dificulty Level"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={dificultyLevel}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Dificulty Level"
                                                filter
                                                className={`w-100 ${ExportErrors?.shortQuestionDifficultyLevel?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.shortQuestionDifficultyLevel?.message} />
                                </>
                            )}
                        />
                    </div>
                </div>}

                {longQuestionVisible && <div className="grid p-fluid mt-4">
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='longQuestionQuantity'
                            control={control}
                            rules={longQuestionVisible ? {
                                required: "Select Long Questions Quantity",
                                validate: {
                                    minValue: value => (value >= 2) || "Minimum Long Quantity Should be 2",
                                    maxValue: value => (value <= 5) || "Maximum Long Quantity Should be 5"
                                }
                            } : {}}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Long Question Quantity"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <TextField type='number' placeholder="eg. 10" errorMessage={ExportErrors?.longQuestionQuantity?.message} value={String(field?.value)} onChange={field.onChange} />} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='longQuestionDifficultyLevel'
                            control={control}
                            rules={{ required: "Select Long Question Dificulty Level" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Dificulty Level"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={dificultyLevel}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Dificulty Level"
                                                filter
                                                className={`w-100 ${ExportErrors?.longQuestionDifficultyLevel?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.longQuestionDifficultyLevel?.message} />
                                </>
                            )}
                        />
                    </div>
                </div>}

                {fillInTheBlanksVisible && <div className="grid p-fluid mt-4">
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='fillInTheBlanksQuantity'
                            control={control}
                            rules={fillInTheBlanksVisible ? {
                                required: "Select Fill in the blanks Quantity",
                                validate: {
                                    minValue: value => (value >= 5) || "Minimum Fill in the blanks Should be 5",
                                    maxValue: value => (value <= 15) || "Maximum Fill in the blanks Should be 15"
                                }
                            } : {}}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Fill in the blanks Quantity"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <TextField type='number' placeholder="eg. 10" errorMessage={ExportErrors?.fillInTheBlanksQuantity?.message} value={String(field?.value)} onChange={field.onChange} />} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='fillInTheBlanksDifficultyLevel'
                            control={control}
                            rules={{ required: "Select Fill in the blanks Dificulty Level" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Dificulty Level"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={dificultyLevel}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Dificulty Level"
                                                filter
                                                className={`w-100 ${ExportErrors?.fillInTheBlanksDifficultyLevel?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.fillInTheBlanksDifficultyLevel?.message} />
                                </>
                            )}
                        />
                    </div>
                </div>}

                {multiFillInTheBlanksVisible && <div className="grid p-fluid mt-4">
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='multiFillInTheBlanksQuantity'
                            control={control}
                            rules={multiFillInTheBlanksVisible ? {
                                required: "Select Multifill in the blanks Quantity",
                                validate: {
                                    minValue: value => (value >= 5) || "Minimum Multifill in the blanks Should be 5",
                                    maxValue: value => (value <= 15) || "Maximum Multifill in the blanks Should be 15"
                                }
                            } : {}}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Multifill in the blanks Quantity"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <TextField type='number' placeholder="eg. 10" errorMessage={ExportErrors?.multiFillInTheBlanksQuantity?.message} value={String(field?.value)} onChange={field.onChange} />} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='multiFillInTheBlanksDifficultyLevel'
                            control={control}
                            rules={{ required: "Select Fill in the blanks Dificulty Level" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Dificulty Level"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={dificultyLevel}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Dificulty Level"
                                                filter
                                                className={`w-100 ${ExportErrors?.multiFillInTheBlanksDifficultyLevel?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.multiFillInTheBlanksDifficultyLevel?.message} />
                                </>
                            )}
                        />
                    </div>
                </div>}

                {multipleShortVisible && <div className="grid p-fluid mt-4">
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='multipleShortQuantity'
                            control={control}
                            rules={multipleShortVisible ? {
                                required: "Select Multiple Short Question Quantity",
                                validate: {
                                    minValue: value => (value >= 5) || "Minimum Multiple Short Question Should be 5",
                                    maxValue: value => (value <= 15) || "Maximum Multiple Short Question Should be 15"
                                }
                            } : {}}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Multiple Short Question Quantity"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <TextField type='number' placeholder="eg. 10" errorMessage={ExportErrors?.multipleShortQuantity?.message} value={String(field?.value)} onChange={field.onChange} />} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='multipleShortDifficultyLevel'
                            control={control}
                            rules={{ required: "Select Fill in the blanks Dificulty Level" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Dificulty Level"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={dificultyLevel}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Dificulty Level"
                                                filter
                                                className={`w-100 ${ExportErrors?.multipleShortDifficultyLevel?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.multipleShortDifficultyLevel?.message} />
                                </>
                            )}
                        />
                    </div>
                </div>}

                {sequenceVisible && <div className="grid p-fluid mt-4">
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='sequenceQuantity'
                            control={control}
                            rules={sequenceVisible ? {
                                required: "Select Sequence Question Quantity",
                                validate: {
                                    minValue: value => (value >= 5) || "Minimum Sequence Question Quantity Should be 5",
                                    maxValue: value => (value <= 15) || "Maximum Sequence Question Quantity Should be 15"
                                }
                            } : {}}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Sequence Question Quantity"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <TextField type='number' placeholder="eg. 10" errorMessage={ExportErrors?.sequenceQuantity?.message} value={String(field?.value)} onChange={field.onChange} />} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='sequenceDifficultyLevel'
                            control={control}
                            rules={{ required: "Select Fill in the blanks Dificulty Level" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Dificulty Level"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={dificultyLevel}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Dificulty Level"
                                                filter
                                                className={`w-100 ${ExportErrors?.sequenceDifficultyLevel?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.sequenceDifficultyLevel?.message} />
                                </>
                            )}
                        />
                    </div>
                </div>}

                {multipleTrueFalseVisible && <div className="grid p-fluid mt-4">
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='multipleTrueFalseQuantity'
                            control={control}
                            rules={multipleTrueFalseVisible ? {
                                required: "Select Multiple True & False Question Quantity",
                                validate: {
                                    minValue: value => (value >= 5) || "Minimum Multiple True & False Quantity Should be 5",
                                    maxValue: value => (value <= 15) || "Maximum Multiple True & False Quantity Should be 15"
                                }
                            } : {}}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Multiple True & False Question Quantity"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <TextField type='number' placeholder="eg. 10" errorMessage={ExportErrors?.multipleTrueFalseQuantity?.message} value={String(field?.value)} onChange={field.onChange} />} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='multipleTrueFalseDifficultyLevel'
                            control={control}
                            rules={{ required: "Select Multiple True & False Questions Dificulty Level" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Dificulty Level"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={dificultyLevel}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Dificulty Level"
                                                filter
                                                className={`w-100 ${ExportErrors?.multipleTrueFalseDifficultyLevel?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.multipleTrueFalseDifficultyLevel?.message} />
                                </>
                            )}
                        />
                    </div>
                </div>}

                {multipleQuestionV2Visible && <div className="grid p-fluid mt-4">
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='multipleQuestionV2Quantity'
                            control={control}
                            rules={multipleQuestionV2Visible ? {
                                required: "Select Multiple Group Question Quantity",
                                validate: {
                                    minValue: value => (value >= 5) || "Minimum Multiple Group Question Quantity Should be 5",
                                    maxValue: value => (value <= 15) || "Maximum Multiple Group Question Quantity Should be 15"
                                }
                            } : {}}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Group Question Quantity"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <TextField type='number' placeholder="eg. 10" errorMessage={ExportErrors?.multipleQuestionV2Quantity?.message} value={String(field?.value)} onChange={field.onChange} />} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <Controller
                            name='multipleQuestionV2DifficultyLevel'
                            control={control}
                            rules={{ required: "Select Multiple True & False Questions Dificulty Level" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Dificulty Level"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={dificultyLevel}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Dificulty Level"
                                                filter
                                                className={`w-100 ${ExportErrors?.multipleQuestionV2DifficultyLevel?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.multipleQuestionV2DifficultyLevel?.message} />
                                </>
                            )}
                        />
                    </div>
                </div>}

                <div className="gap-2">
                    <Button label={`Apply`} onClick={handleSubmit(submitForm)} icon="pi pi-check" />
                </div>
            </div>
        </>
    )
}

export default Export