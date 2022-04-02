import React from 'react';

import * as Icons from '../Icons';

import styles from './ChatPageMock.module.css';

const LeftSidebar: React.FC = () => {
    return (
        <ul className={styles.left_sidebar}>
            <li className={styles.left_sidebar_link}>
                <div className={styles.left_sidebar_link_logo}>
                    <Icons.MyPageIcon />
                </div>
                <a href="#" className={styles.left_sidebar_link_text}>
                    Моя страница
                </a>
            </li>
            <li className={styles.left_sidebar_link}>
                <div className={styles.left_sidebar_link_logo}>
                    <Icons.NewsIcon />
                </div>
                <a href="#" className={styles.left_sidebar_link_text}>
                    Новости
                </a>
            </li>
            <li className={styles.left_sidebar_link}>
                <div className={styles.left_sidebar_link_logo}>
                    <Icons.MessengerIcon />
                </div>
                <a href="#" className={styles.left_sidebar_link_text}>
                    Мессенджер
                </a>
            </li>
            <li className={styles.left_sidebar_link}>
                <div className={styles.left_sidebar_link_logo}>
                    <Icons.CallsIcon />
                </div>
                <a href="#" className={styles.left_sidebar_link_text}>
                    Звонки
                </a>
            </li>
            <li className={styles.left_sidebar_link}>
                <div className={styles.left_sidebar_link_logo}>
                    <Icons.FriendsIcon />
                </div>
                <a href="#" className={styles.left_sidebar_link_text}>
                    Друзья
                </a>
            </li>
            <li className={styles.left_sidebar_link}>
                <div className={styles.left_sidebar_link_logo}>
                    <Icons.CommunitiesIcon />
                </div>
                <a href="#" className={styles.left_sidebar_link_text}>
                    Сообщества
                </a>
            </li>
            <li className={styles.left_sidebar_link}>
                <div className={styles.left_sidebar_link_logo}>
                    <Icons.MusicIcon />
                </div>
                <a href="#" className={styles.left_sidebar_link_text}>
                    Музыка
                </a>
            </li>
            <li className={styles.left_sidebar_link}>
                <div className={styles.left_sidebar_link_logo}>
                    <Icons.VideosIcon />
                </div>
                <a href="#" className={styles.left_sidebar_link_text}>
                    Видео
                </a>
            </li>
            <li className={styles.left_sidebar_link}>
                <div className={styles.left_sidebar_link_logo}>
                    <Icons.ClipsIcon />
                </div>
                <a href="#" className={styles.left_sidebar_link_text}>
                    Клипы
                </a>
            </li>
        </ul>
    );
};

export default LeftSidebar;
