import React from 'react'
interface PageHeaderProps {
    title: string;
}
const PageHeader = ({ title }: PageHeaderProps) => {
    return (
        <div className="page-header">
            <h6>{title}</h6>
        </div>
    )
}

export default PageHeader