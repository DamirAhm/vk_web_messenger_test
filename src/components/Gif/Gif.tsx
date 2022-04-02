import React from 'react';

import { Image } from '../../types';

import styles from './Gif.module.css';

type Props = {
    onClick?: () => void;
    title: string;
    image: Image;
};

const Gif: React.FC<Props> = ({
    image: { url, width, height },
    title,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={styles.image_container}
            tabIndex={0}
        >
            <img width={width} height={height} src={url} alt={title} />
        </button>
    );
};

export default Gif;
