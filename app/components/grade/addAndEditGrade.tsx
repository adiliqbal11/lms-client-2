import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel'
import { TextField } from '../../shared/components/TextField/TextField'
import { Button } from 'primereact/button'
import { useAppContext } from '../../../layout/context/layoutcontext'
import { Grade, School } from '../../shared/types'
import updateGradeHandler from '../../context/server/grade/updateGradeHandler'
import createGradeHandler from '../../context/server/grade/createGradeHandler'
import fetchSchoolsHandler from '../../context/server/school/fetchSchoolsHandler'
import { Dropdown } from 'primereact/dropdown'
import { ErrorMessage } from '../../shared/components/ErrorMessage/ErrorMessage'

interface AddAndEditGradeProps {
    grade?: Grade
    isNew: boolean,
}
const AddAndEditGrade: React.FC<AddAndEditGradeProps> = (props) => {
    const [schools, setSchools] = useState<School[]>([] as School[]);
    const { control, handleSubmit, reset, setValue, formState: { errors: GradeErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<Grade>({
        mode: 'onBlur',
    });
    const g = useAppContext();
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
    const updateGrade = async (grade: Grade) => {
        await updateGradeHandler(grade, grade?.id);
    }
    const submitForm: SubmitHandler<Grade> = async (grade: Grade) => {
        try {
            if (props?.isNew) {
                await createGradeHandler(grade);
                g?.newData?.grade?.setIsNewGrade(!g?.newData?.grade?.isNewGrade)
            } else {
                await updateGrade(grade);
                g?.newData?.grade?.setIsNewGrade(!g?.newData?.grade?.isNewGrade)
            }
        }
        catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something went wrong, Please try again later" })
        }
    }
    useEffect(() => {
        if (props?.grade) {
            setValue('grade', props?.grade?.grade);
            setValue('id', props?.grade?.id)
            reset(props.grade)
        }
    }
        , [props.grade, reset, setValue]);
    useEffect(() => {
        fetchSchools();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="card">
                <h5>{props?.isNew ? "New Grade" : "Update Grade"}</h5>
                <div className="field col-12 md:col-6">
                    <Controller
                        name='grade'
                        control={control}
                        defaultValue=""
                        rules={{ required: "Grade name is required", }}
                        render={({ field }) => (
                            <FormFieldWithLabel
                                label="Grade Name"
                                showCharLimit={false}
                                showOptionalText={false}
                                formField={
                                    <TextField placeholder="eg. seventh" dataAttribute='brand_name' errorMessage={GradeErrors?.grade?.message} value={field?.value} onChange={field.onChange} />} />
                        )}
                    />
                </div>
                <div className="field col-12 md:col-6">
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
                                        onChange={field?.onChange}
                                        options={schools}
                                        optionLabel="type"  
                                        optionValue="id"  
                                        placeholder="Select a School"
                                        filter
                                        className={`w-100 ${GradeErrors?.schoolId?.message ? "p-invalid" : ""}`}
                                        />
                                        <ErrorMessage text={GradeErrors?.schoolId?.message} />
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

export default AddAndEditGrade