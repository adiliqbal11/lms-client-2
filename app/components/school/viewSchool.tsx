/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react'
import { School } from '../../shared/types'
import DataTableRenderer from '../../shared/components/Datatable/DatatableRenderer'
import { TableColumns } from '../../shared/components/Datatable/types'
import { Dialog } from 'primereact/dialog'
import AddAndEditSchool from './addAndEditSchool'
import fetchSchoolsHandler from '../../context/server/school/fetchSchoolsHandler'
import { useAppContext } from '../../../layout/context/layoutcontext'
import { Button } from 'primereact/button'
import { convertTimeStamps } from '../../shared/common'
interface ViewSchoolProps {
   fetchAgain?:boolean    
}   

const ViewSchool: React.FC<ViewSchoolProps> = ({fetchAgain}) => {
    const g = useAppContext();
    const [schools, setSchools] = useState<School[]>([] as School[]);
    const [uiSchools, setUISchools] = useState<School[]>([]);
    const [school, setSchool] = useState<School>({} as School);
    const [visible, setVisible] = useState<boolean>(false);

    const editSchool = (school: School) => {
        setSchool(school);
        setVisible(true);
    };
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
    const tableColumns: TableColumns[] = [
        {
            header: 'School Type',
            field: 'type',
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
        fetchSchools();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [g?.newData?.school?.isNewSchool]);
    useEffect(() => {
        fetchSchools();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAgain]);
    useEffect(() => {
        let newUISchools = [] as School[];
        schools?.forEach(x => {
            newUISchools?.push({
                ...x,
                action: <Button label="Edit" className="p-button-info" onClick={() => editSchool(x)} />,
                createdAt: convertTimeStamps(x?.createdAt),
                updatedAt: convertTimeStamps(x?.updatedAt),
            });
        });
        setUISchools(newUISchools);
    }, [schools]);
    return (
        <>
            <div className="grid">
                <Dialog visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <AddAndEditSchool isNew={false} school={school} />
                </Dialog>
                <div className="col-12">
                    {uiSchools?.length > 0 && <DataTableRenderer<School> data={uiSchools} tableColumns={tableColumns} />}
                </div>
            </div>
        </>
    )
}

export default ViewSchool