'use client'
import React, { useEffect, useRef, useState } from 'react'
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel'
import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import { ExportAnswers, Grade, ImportInput, Question, School, SubTopic, Subject, Topic } from '../../shared/types'
import { Dropdown } from 'primereact/dropdown'
import { ErrorMessage } from '../../shared/components/ErrorMessage/ErrorMessage'
import { useAppContext } from '../../../layout/context/layoutcontext'
import fetchSchoolsHandler from '../../context/server/school/fetchSchoolsHandler'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import fetchGradeBySchoolIdHandler from '../../context/server/grade/fetchGradeBySchoolIdHandler'
import fetchSubjectByGradeIdHandler from '../../context/server/subject/fetchSubjectByGradeIdHandler'
import fetchTopicBySubjectIdHandler from '../../context/server/topic/fetchTopicBySubjectIdHandler'
import fetchSubTopicBySubTopicIdHandler from '../../context/server/subTopic/fetchSubTopicBySubTopicIdHandler'
import _ from 'lodash'
import { FileUpload } from 'primereact/fileupload'
import importsHandler from '../../context/server/import/importsHandler'


const Importer: React.FC = () => {
    const g = useAppContext();
    const toast = useRef<Toast>(null);
    const { control, handleSubmit, reset, setValue, formState: { errors: ExportErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<ImportInput>({
        mode: 'onBlur',
    });
    const [schools, setSchools] = useState<School[]>([] as School[]);
    const [grades, setGrades] = useState<Grade[]>([] as Grade[]);
    const [subjects, setSubjects] = useState<Subject[]>([] as Subject[]);
    const [topics, setTopics] = useState<Topic[]>([] as Topic[]);
    const [subTopics, setSubTopics] = useState<SubTopic[]>([] as SubTopic[]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isFileSelected, setIsFileSelected] = useState<boolean>(false);


    const submitForm: SubmitHandler<ImportInput> = async (ImportInput: ImportInput) => {
        try {
            if (_?.isEmpty(selectedFiles)) {
                if (isFileSelected) {
                    toast?.current?.show({ severity: 'warn', summary: 'Warning', detail: "Please confirm / save file, which you uploaded" });
                    return;
                }
                return;
            }
            const firstFile = selectedFiles[0];
            const fileNameParts = firstFile?.name?.split('.');
            const extension = fileNameParts?.slice(1)?.join('.')?.toLowerCase();
            // if(extension !== 'csv'){
            //     toast?.current?.show({ severity: 'error', summary: 'Error', detail: "Please Upload a CSV File" });
            //     return;
            // }
            const imports = await importsHandler(ImportInput, firstFile);
            if (imports?.status)
                toast?.current?.show({ severity: 'success', summary: 'Success', detail: "Questions & Answers are imported Successfully" });
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
    };
    const onFileSelect = (event: any) => {
        const files = event.files;
        setSelectedFiles(files);
    };

    useEffect(() => {
        fetchSchools();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Toast ref={toast} />
            <h5>Import Answers</h5>
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
                    <div className="field col-16 md:col-12">
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
                    <div className="field col-16 md:col-12">
                        <FormFieldWithLabel
                            label="Select Sub Topic"
                            showCharLimit={false}
                            showOptionalText={false}
                            formField={
                                <FileUpload
                                    mode="advanced"
                                    customUpload
                                    accept=".csv"
                                    maxFileSize={10000000}
                                    chooseLabel="Upload CSV"
                                    uploadLabel="Confirm"
                                    cancelLabel="Clear"
                                    onRemove={() => { setSelectedFiles([]); setIsFileSelected(false) }}
                                    onClear={() => { setSelectedFiles([]); setIsFileSelected(false) }}
                                    onSelect={() => { setIsFileSelected(true) }}
                                    uploadHandler={onFileSelect}
                                    emptyTemplate="No file chosen"
                                />
                            }
                        />
                        <div className="my-1"></div>
                        <ErrorMessage text={_?.isEmpty(selectedFiles) ? "Please Upload CSV" : ""} />
                    </div>
                </div>

                <div className="gap-2">
                    <Button label={`Apply`} onClick={handleSubmit(submitForm)} icon="pi pi-check" />
                </div>
            </div>
        </>
    )
}

export default Importer