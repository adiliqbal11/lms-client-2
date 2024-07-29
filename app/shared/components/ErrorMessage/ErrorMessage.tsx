import React from 'react'

export interface ErrorMessageProps {
  text: string | undefined
}

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  return (
    <>
      {props?.text && <div className={`p-error`}>{props?.text}</div>}
    </>
  )
}
