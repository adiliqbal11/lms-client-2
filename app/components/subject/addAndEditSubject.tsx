import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel'
import { TextField } from '../../shared/components/TextField/TextField'
import { Button } from 'primereact/button'
import { useAppContext } from '../../../layout/context/layoutcontext'

import { Subject, Grade } from '../../shared/types'
import updateSubjectHandler from '../../context/server/subject/updateSubjectHandler'
import createSubjectHandler from '../../context/server/subject/createSubjectHandler'
import fetchGradesHandler from '../../context/server/grade/fetchGradesHandler'
import { Dropdown } from 'primereact/dropdown'
import { ErrorMessage } from '../../shared/components/ErrorMessage/ErrorMessage'

interface AddAndEditSubjectProps {
    subject?: Subject
    isNew: boolean,
}
const AddAndEditSubject: React.FC<AddAndEditSubjectProps> = (props) => {
    const [grades, setGrades] = useState<Grade[]>([] as Grade[]);
    const { control, handleSubmit, reset, setValue, formState: { errors: SubjectErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<Subject>({
        mode: 'onBlur',
    });
    const g = useAppContext();
    const fetchGrades = async () => {
        try {
            const response = await fetchGradesHandler();
            if (response?.status) {
                setGrades(response?.result?.data as Grade[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Subjects" });
        }
    };
    const updateSubject = async (subject: Subject) => {
        await updateSubjectHandler(subject, subject?.id);
    }
    const submitForm: SubmitHandler<Subject> = async (subject: Subject) => {
        try {
            if (props?.isNew) {
                await createSubjectHandler(subject);
                g?.newData?.subject?.setIsNewSubject(!g?.newData?.subject?.isNewSubject);
            } else {
                await updateSubject(subject);
                g?.newData?.subject?.setIsNewSubject(!g?.newData?.subject?.isNewSubject)
            }
        }
        catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something went wrong, Please try again later" })
        }
    }
    useEffect(() => {
        if (props?.subject) {
            setValue('subject', props?.subject?.subject);
            setValue('id', props?.subject?.id)
            reset(props.subject)
        }
    }
        , [props.subject, reset, setValue]);
    useEffect(() => {
        fetchGrades();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="card">
                <h5>{props?.isNew ? "New Subject" : "Update Subject"}</h5>
                <div className="field col-12 md:col-6">
                    <Controller
                        name='subject'
                        control={control}
                        defaultValue=""
                        rules={{ required: "Subject name is required", }}
                        render={({ field }) => (
                            <FormFieldWithLabel
                                label="Subject Name"
                                showCharLimit={false}
                                showOptionalText={false}
                                formField={
                                    <TextField placeholder="eg. javascript" dataAttribute='brand_name' errorMessage={SubjectErrors?.subject?.message} value={field?.value} onChange={field.onChange} />} />
                        )}
                    />
                </div>
                <div className="field col-12 md:col-6">
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
                                            onChange={field?.onChange}
                                            options={grades}
                                            optionLabel="grade"
                                            optionValue="id"
                                            placeholder="Select a Grade"
                                            filter
                                            className={`w-100 ${SubjectErrors?.gradeId?.message ? "p-invalid" : ""}`}
                                        />
                                        <ErrorMessage text={SubjectErrors?.gradeId?.message} />
                                    </>
                                }
                            />
                        )}
                    />

                </div>
                <div className="gap-2">
                    <Button label={`${props?.isNew ? "Save" : "Update"}`} onClick={handleSubmit(submitForm)} icon="pi pi-check" />
                </div>
            </div>
        </>
    )
}

export default AddAndEditSubject