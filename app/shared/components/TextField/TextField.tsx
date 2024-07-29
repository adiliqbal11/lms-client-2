import _ from 'lodash';
import React from 'react'
import { InputText } from "primereact/inputtext";
import styles from './TextField.module.scss';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

interface TextFieldProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  maxLength?: number
  errorMessage?: string
  disabled?: boolean
  className?: string
  dataAttribute?: string
  inputType?: React.HTMLInputTypeAttribute
  type?: string
}

export const TextField: React.FC<TextFieldProps> = (props) => {
  const handleNumberOnChange = (value: string) => {
    const containsOnlyDigits = /^\d+$/.test(value);
    if (containsOnlyDigits || value === '') { props?.onChange(value); }
  }

  return (
    <>
      <InputText
        type={props?.type ?? 'text'}
        value={props?.value ?? ""}
        className={` ${styles["inputText"]} ${props?.errorMessage ? "p-invalid" : ''} ${props?.className}`}
        placeholder={props?.placeholder}
        maxLength={props?.maxLength ?? undefined}
        onChange={(e) => !_.isUndefined(props?.inputType) && props?.inputType == 'number' ? handleNumberOnChange(e?.target?.value) : props?.onChange(e?.target?.value)}
        disabled={props?.disabled}
        data-test={props?.dataAttribute}
      />
      <ErrorMessage text={props?.errorMessage} />
    </>
  )
}