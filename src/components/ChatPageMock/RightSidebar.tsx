import React from 'react';

import styles from './ChatPageMock.module.css';

const RightSidebar: React.FC = () => {
    return (
        <div className={styles.right_sidebar}>
            <div className={styles.right_sidebar_item}>Все чаты</div>
            <div className={styles.right_sidebar_item}>Непрочитанные</div>
            <div className={styles.right_sidebar_item}>Бизнес-уведомления</div>
        </div>
    );
};

export default RightSidebar;
