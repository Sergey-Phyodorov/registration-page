import styles from './entry-field.module.css';

export function EntryField({
                               nameField,
                               nameFieldLabel,
                               typeInputField,
                               placeholderField,
                               fieldValue,
                               onFiledValueChange,
                               errorField,
                           }) {


    return (
        <>
            <label className={styles.labelField}>{nameFieldLabel}</label>
            <input type={typeInputField}
                   name={nameField}
                   placeholder={placeholderField}
                   value={fieldValue}
                   onChange={onFiledValueChange}
                   className={styles.entryField} />
            {errorField &&
                <div className={styles.errorField}>{errorField}</div>}
        </>
    );
}