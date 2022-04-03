import React from 'react';

import styles from './Dialog.module.css';

const DialogHeader: React.FC = () => {
    return (
        <div className={styles.dialog_header}>
            <a
                href="#"
                aria-label="Перейти на страницу диалогов"
                className={styles.dialog_header_back}
            >
                Назад
            </a>
            <div className={styles.dialog_info}>
                <span className={styles.dialog_info_name}>
                    Примите на стажировку
                </span>
                <span className={styles.dialog_info_online}>пожалуйста</span>
            </div>
            <div className={styles.dialog_controls}>
                <button
                    aria-label="Позвонить собеседнику"
                    className={styles.dialog_controls_call}
                />
                <button
                    aria-label="Окрыть свойства диалога"
                    className={styles.dialog_controls_options}
                />
                <a
                    href="#"
                    aria-label="Перейти в профиль собеседника"
                    className={styles.dialog_controls_avatar}
                />
            </div>
        </div>
    );
};

export default DialogHeader;
