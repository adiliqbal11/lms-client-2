import { Toast as Toaster } from 'primereact/toast';
import React, { useEffect, useRef } from 'react'

interface ToastProps {
    severity: string,
    summary: string,
    detail: string
    life: number
}
const PrimeReactToast: React.FC<ToastProps> = ({ severity ,summary, detail, life }) => {
    const toast = useRef<Toaster>(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const showToast = (severity: string, summary: string, detail: string) => {
        toast.current?.show({ severity: severity as "success" | "info" | "warn" | "error", summary, detail, life: life || 3000 });
    }
    useEffect(() => {
        showToast(severity, summary, detail);
    }
    , [detail, severity, summary, life, showToast])
    return (
        <>
            <Toaster ref={toast} />
        </>
    )
}

export default PrimeReactToast