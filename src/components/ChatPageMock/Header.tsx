import React from 'react';

import { VKLogo } from '../Icons';

import styles from './ChatPageMock.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <ul className={styles.header_nav}>
                <li className={styles.header_logo}>
                    <a href="#">
                        <VKLogo />
                    </a>
                </li>
                <li className={styles.header_input}>
                    <input type="text" placeholder="Поиск" />
                </li>
                <li className={styles.header_others} />
                <li className={styles.header_avatar}>
                    <button className={styles.header_avatar_photo} />
                </li>
            </ul>
        </header>
    );
};

export default Header;
