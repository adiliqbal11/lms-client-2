import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import React, { useEffect } from 'react'
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel'
import { TextField } from '../../shared/components/TextField/TextField'
import { Button } from 'primereact/button'
import { useAppContext } from '../../../layout/context/layoutcontext'
import createSchoolHandler from '../../context/server/school/createSchool'
import { School } from '../../shared/types'
import updateSchoolHandler from '../../context/server/school/updateSchoolHandler'

interface AddAndEditSchoolProps {
    school?: School
    isNew: boolean,
}
const AddAndEditSchool: React.FC<AddAndEditSchoolProps> = (props) => {
    const { control, handleSubmit, reset, setValue, formState: { errors: schoolErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<School>({
        mode: 'onBlur',
    });
    const g = useAppContext();
    const updateSchool = async (school: School) => {
        await updateSchoolHandler(school, school?.id);
    }
    const submitForm: SubmitHandler<School> = async (school: School) => {
        console.log(school)
        try {
            if (props?.isNew) {
                await createSchoolHandler(school);
                g?.newData?.school?.setIsNewSchool(!g?.newData?.school?.isNewSchool)
            } else {
                await updateSchool(school);
                g?.newData?.school?.setIsNewSchool(!g?.newData?.school?.isNewSchool)
            }
        }
        catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something went wrong, Please try again later" })
        }
    }
    useEffect(() => {
        if (props?.school) {
            setValue('type', props?.school?.type)
            setValue('id', props?.school?.id)
            reset(props.school)
        }
    }
        , [props.school, reset, setValue])
    return (
        <>
            <div className="card">
                <h5>{props?.isNew ? "New School" : "Update School"}</h5>
                <div className="field col-12 md:col-6">
                    <Controller
                        name='type'
                        control={control}
                        defaultValue=""
                        rules={{ required: "School type is required" }}
                        render={({ field }) => (
                            <FormFieldWithLabel
                                label="School Type"
                                showCharLimit={false}
                                showOptionalText={false}
                                formField={
                                    <TextField placeholder="eg. primary" dataAttribute='brand_name' errorMessage={schoolErrors?.type?.message} value={field?.value} onChange={field.onChange} />
                                } />
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

export default AddAndEditSchool