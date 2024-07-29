/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react'
import { Grade } from '../../shared/types'
import DataTableRenderer from '../../shared/components/Datatable/DatatableRenderer'
import { TableColumns } from '../../shared/components/Datatable/types'
import { Dialog } from 'primereact/dialog'
import fetchGradeHandler from '../../context/server/grade/fetchGradesHandler'
import { useAppContext } from '../../../layout/context/layoutcontext'
import { Button } from 'primereact/button'
import { convertTimeStamps } from '../../shared/common'
import AddAndEditGrade from './addAndEditGrade'


const ViewGrade = () => {
    const g = useAppContext();
    const [grades, setGrades] = useState<Grade[]>([] as Grade[]);
    const [UIgrades, setUIGrades] = useState<Grade[]>([] as Grade[]);
    const [grade, setGrade] = useState<Grade>({} as Grade);
    const [visible, setVisible] = useState<boolean>(false);

    const editGrade = (grade: Grade) => {
        setGrade(grade);
        setVisible(true);
    };
    const fetchGrade = async () => {
        try {
            const response = await fetchGradeHandler();
            if (response?.status) {
                setGrades(response?.result?.data as Grade[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Grade" });
        }
    };
    const tableColumns: TableColumns[] = [
        {
            header: 'Grade',
            field: 'grade',
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
            header: 'School',
            field: 'schoolName',
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
        fetchGrade();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [g?.newData?.grade?.isNewGrade]);
    useEffect(() => {
        fetchGrade();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        let newGrade = [] as Grade[];
        grades?.forEach(x => {
            newGrade?.push({
                ...x,
                action: <Button label="Edit" className="p-button-info" onClick={() => editGrade(x)
                } />,
                schoolName: x?.school?.type,
                createdAt: convertTimeStamps(x?.createdAt),
                updatedAt: convertTimeStamps(x?.updatedAt)
            })
        });
        setUIGrades(newGrade);
    }, [grades]);
    return (
        <>
            <div className="grid">
                <Dialog visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <AddAndEditGrade isNew={false} grade={grade} />
                </Dialog>
                <div className="col-12">
                    {UIgrades?.length > 0 && <DataTableRenderer<Grade> data={UIgrades} tableColumns={tableColumns} />}
                </div>
            </div>
        </>
    )
}

export default ViewGrade