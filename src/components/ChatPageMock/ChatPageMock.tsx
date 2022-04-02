import React from 'react';

import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

import styles from './ChatPageMock.module.css';

const ChatPageMock: React.FC = ({ children }) => {
    return (
        <div className={styles.page}>
            <Header />
            <div className={styles.page_container}>
                <LeftSidebar />

                {children}

                <RightSidebar />
            </div>
        </div>
    );
};

export default ChatPageMock;
