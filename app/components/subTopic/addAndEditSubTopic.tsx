import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel'
import { TextField } from '../../shared/components/TextField/TextField'
import { Button } from 'primereact/button'
import { useAppContext } from '../../../layout/context/layoutcontext'

import { SubTopic, Topic } from '../../shared/types'
import updateSubTopicHandler from '../../context/server/subTopic/updateSubTopicHandler'
import createSubTopicHandler from '../../context/server/subTopic/createSubTopicHandler'
import fetchTopicsHandler from '../../context/server/topic/fetchTopicsHandler'
import { Dropdown } from 'primereact/dropdown'
import { ErrorMessage } from '../../shared/components/ErrorMessage/ErrorMessage'

interface AddAndEditSubTopicProps {
    subTopic?: SubTopic
    isNew: boolean,
}
const AddAndEditSubTopic: React.FC<AddAndEditSubTopicProps> = (props) => {
    const [topics, setTopics] = useState<Topic[]>([] as Topic[]);
    const { control, handleSubmit, reset, setValue, formState: { errors: subTopicErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<SubTopic>({
        mode: 'onBlur',
    });
    const g = useAppContext();
    const fetchTopics = async () => {
        try {
            const response = await fetchTopicsHandler();
            if (response?.status) {
                setTopics(response?.result?.data as Topic[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching SubTopics" });
        }
    };
    const updateTopic = async (subTopic: SubTopic) => {
        await updateSubTopicHandler(subTopic, subTopic?.id);
    }
    const submitForm: SubmitHandler<SubTopic> = async (subTopic: SubTopic) => {
        try {
            if (props?.isNew) {
                await createSubTopicHandler(subTopic);
                g?.newData?.subTopic?.setIsNewSubTopic(!g?.newData?.subTopic?.isNewSubTopic);
            } else {
                await updateTopic(subTopic);
                g?.newData?.subTopic?.setIsNewSubTopic(!g?.newData?.subTopic?.isNewSubTopic);
            }
        }
        catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something went wrong, Please try again later" })
        }
    }
    useEffect(() => {
        if (props?.subTopic) {
            setValue('subTopic', props?.subTopic?.subTopic);
            setValue('id', props?.subTopic?.id)
            reset(props.subTopic)
        }
    }
        , [props.subTopic, reset, setValue]);
    useEffect(() => {
        fetchTopics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="card">
                <h5>{props?.isNew ? "New SubTopic" : "Update SubTopic"}</h5>
                <div className="field col-12 md:col-6">
                    <Controller
                        name='subTopic'
                        control={control}
                        defaultValue=""
                        rules={{ required: "SubTopic name is required", }}
                        render={({ field }) => (
                            <FormFieldWithLabel
                                label="SubTopic Name"
                                showCharLimit={false}
                                showOptionalText={false}
                                formField={
                                    <TextField placeholder="eg. Promises States" dataAttribute='brand_name' errorMessage={subTopicErrors?.subTopic?.message} value={field?.value} onChange={field.onChange} />} />
                        )}
                    />
                </div>
                <div className="field col-12 md:col-6">
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
                                            onChange={field?.onChange}
                                            options={topics}
                                            optionLabel="topic"
                                            optionValue="id"
                                            placeholder="Select a Topic"
                                            filter
                                            className={`w-100 ${subTopicErrors?.topicId?.message ? "p-invalid" : ""}`}
                                        />
                                    }
                                />
                                <ErrorMessage text={subTopicErrors?.topicId?.message} />
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

export default AddAndEditSubTopic