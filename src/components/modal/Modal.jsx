import React from 'react'
import styles from './modal.module.css'

const Modal = ({ children, onClose }) => {
    return (
        <>
            <div className={styles.backdrop} onClick={onClose} />
            <dialog open className={styles.modal}>
                {children}
            </dialog>
        </>
    )

}

export default Modal
