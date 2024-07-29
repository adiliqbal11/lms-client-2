import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel'
import { TextField } from '../../shared/components/TextField/TextField'
import { Button } from 'primereact/button'
import { useAppContext } from '../../../layout/context/layoutcontext'
import { Answer, Question } from '../../shared/types'
import updateAnswerHandler from '../../context/server/answer/updateAnswerHandler'
import createAnswerHandler from '../../context/server/answer/createAnswerHandler'
import fetchQuestionsHandler from '../../context/server/question/fetchQuestionsHandler'
import { Dropdown } from 'primereact/dropdown'
import { ErrorMessage } from '../../shared/components/ErrorMessage/ErrorMessage'

interface EditHistoryProps {
    answer?: Answer
    isNew: boolean,
}
const EditHistory: React.FC<EditHistoryProps> = (props) => {
    const [questions, setQuestions] = useState<Question[]>([] as Question[]);
    const isCorrect = [
        { label: 'True', value: "true" },
        { label: 'False', value: "false" },
    ];
    const { control, handleSubmit, reset, setValue, formState: { errors: AnswerErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<Answer>({
        mode: 'onBlur',
    });
    const g = useAppContext();
    const fetchQuestions = async () => {
        try {
            const response = await fetchQuestionsHandler();
            if (response?.status) {
                setQuestions(response?.result?.data as Question[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Answers" });
        }
    };
    const updateAnswer = async (answer: Answer) => {
        await updateAnswerHandler(answer, answer?.id);
    }
    const submitForm: SubmitHandler<Answer> = async (answer: Answer) => {
        try {
            if (props?.isNew) {
                await createAnswerHandler(answer);
                g?.newData?.answer?.setIsNewAnswer(!g?.newData?.answer?.isNewAnswer);
            } else {
                await updateAnswer(answer);
                g?.newData?.answer?.setIsNewAnswer(!g?.newData?.answer?.isNewAnswer);
            }
        }
        catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something went wrong, Please try again later" })
        }
    }
    useEffect(() => {
        if (props?.answer) {
            setValue('answer', props?.answer?.answer);
            setValue('id', props?.answer?.id);
            setValue('isCorrect', props?.answer?.isCorrect?"true":"false");
            reset(props.answer)
        }
    }
        , [props.answer, reset, setValue]);
    useEffect(() => {
        fetchQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="card">
                <h5>{props?.isNew ? "New Answer" : "Update Answer"}</h5>
                <div className="grid p-fluid mt-3">
                    <div className="field col-12 md:col-5">
                        <Controller
                            name='answer'
                            control={control}
                            defaultValue=""
                            rules={{ required: "Answer name is required", }}
                            render={({ field }) => (
                                <FormFieldWithLabel
                                    label="Answer"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={
                                        <TextField placeholder="eg. What is pending state in promise" dataAttribute='brand_name' errorMessage={AnswerErrors?.answer?.message} value={field?.value} onChange={field.onChange} />} />
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-5">
                        <Controller
                            name='isCorrect'
                            control={control}
                            rules={{ required: "Select Answer Type" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Answer Type"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={isCorrect}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Type"
                                                filter
                                                className={`w-100 ${AnswerErrors?.isCorrect?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={AnswerErrors?.type?.message} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-5">
                        <Controller
                            name='questionId'
                            control={control}
                            rules={{ required: "Select Question" }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Question"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={questions}
                                                optionLabel="question"
                                                optionValue="id"
                                                placeholder="Select Question"
                                                filter
                                                className={`w-100 ${AnswerErrors?.questionId?.message ? "p-invalid" : ""}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={AnswerErrors?.questionId?.message} />
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="gap-2">
                    <Button label={`${props?.isNew ? "Save" : "Update"}`} onClick={handleSubmit(submitForm)} icon="pi pi-check" />
                </div>
            </div>
        </>
    )
}

export default EditHistory