import React from 'react'
import styles from './FormFieldWithLabel.module.scss';
interface FormFieldWithLabelProps {
  label: string;
  formField: React.ReactNode;
  showCharLimit?: boolean;
  maxChar?: number;
  showOptionalText?: boolean;
  charCount?: number
}
const FormFieldWithLabel: React.FC<FormFieldWithLabelProps> = ({ label, formField, showCharLimit, maxChar, showOptionalText, charCount })  => {
  return (
    <>
      <div className={`${styles["field"]}`}>
        <div className="flex justify-content-between">
          <label>
           <b> {label}</b>
            {showOptionalText ? <span className={styles.optionalText}>{`optional`}</span> : null}
          </label>
          {showCharLimit ? <span className={styles.charCounter}>{charCount} / {maxChar}</span> : null}
        </div>
        {formField}
      </div >
    </>
  )
}

export default FormFieldWithLabel