import React from 'react';

import styles from './Dialog.module.css';

const DialogHeader: React.FC = () => {
    return (
        <div className={styles.dialog_header}>
            <button className={styles.dialog_header_back}>Назад</button>
            <div className={styles.dialog_info}>
                <span className={styles.dialog_info_name}>
                    Примите на стажировку
                </span>
                <span className={styles.dialog_info_online}>пожалуйста</span>
            </div>
            <div className={styles.dialog_controls}>
                <button className={styles.dialog_controls_call} />
                <button className={styles.dialog_controls_options} />
                <button className={styles.dialog_controls_avatar} />
            </div>
        </div>
    );
};

export default DialogHeader;
