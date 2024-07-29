import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel'
import { TextField } from '../../shared/components/TextField/TextField'
import { Button } from 'primereact/button'
import { useAppContext } from '../../../layout/context/layoutcontext'

import { Topic, Subject } from '../../shared/types'
import updateTopicHandler from '../../context/server/topic/updateTopicHandler'
import createTopicHandler from '../../context/server/topic/createTopicHandler'
import fetchSubjectsHandler from '../../context/server/subject/fetchSubjectsHandler'
import { Dropdown } from 'primereact/dropdown'
import { ErrorMessage } from '../../shared/components/ErrorMessage/ErrorMessage'

interface AddAndEditTopicProps {
    topic?: Topic
    isNew: boolean,
}
const AddAndEditTopic: React.FC<AddAndEditTopicProps> = (props) => {
    const [subjects, setSubjects] = useState<Subject[]>([] as Subject[]);
    const { control, handleSubmit, reset, setValue, formState: { errors: TopicErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<Topic>({
        mode: 'onBlur',
    });
    const g = useAppContext();
    const fetchSubjects = async () => {
        try {
            const response = await fetchSubjectsHandler();
            if (response?.status) {
                setSubjects(response?.result?.data as Subject[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Topics" });
        }
    };
    const updateTopic = async (topic: Topic) => {
        await updateTopicHandler(topic, topic?.id);
    }
    const submitForm: SubmitHandler<Topic> = async (topic: Topic) => {
        try {
            if (props?.isNew) {
                await createTopicHandler(topic);
                g?.newData?.topic?.setIsNewTopic(!g?.newData?.topic?.isNewTopic);
            } else {
                await updateTopic(topic);
                g?.newData?.topic?.setIsNewTopic(!g?.newData?.topic?.isNewTopic);
            }
        }
        catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something went wrong, Please try again later" })
        }
    }
    useEffect(() => {
        if (props?.topic) {
            setValue('topic', props?.topic?.topic);
            setValue('id', props?.topic?.id)
            reset(props.topic)
        }
    }
        , [props.topic, reset, setValue]);
    useEffect(() => {
        fetchSubjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="card">
                <h5>{props?.isNew ? "New Topic" : "Update Topic"}</h5>
                <div className="field col-12 md:col-6">
                    <Controller
                        name='topic'
                        control={control}
                        defaultValue=""
                        rules={{ required: "Topic name is required", }}
                        render={({ field }) => (
                            <FormFieldWithLabel
                                label="Topic Name"
                                showCharLimit={false}
                                showOptionalText={false}
                                formField={
                                    <TextField placeholder="eg. Promises" dataAttribute='brand_name' errorMessage={TopicErrors?.topic?.message} value={field?.value} onChange={field.onChange} />} />
                        )}
                    />
                </div>
                <div className="field col-12 md:col-6">
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
                                            onChange={field?.onChange}
                                            options={subjects}
                                            optionLabel="subject"
                                            optionValue="id"
                                            placeholder="Select a Subject"
                                            filter
                                            className={`w-100 ${TopicErrors?.subjectId?.message ? "p-invalid" : ""}`}
                                        />
                                    }
                                />
                                <ErrorMessage text={TopicErrors?.subjectId?.message} />
                            </>
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

export default AddAndEditTopic