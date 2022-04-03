import React, { useState } from 'react';

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
    const [loading, setLoading] = useState(true);

    return (
        <button
            aria-label={`Отправить изображение - ${title}`}
            onClick={onClick}
            className={styles.image_container}
            tabIndex={0}
        >
            <img
                onLoad={() => setLoading(false)}
                width={width}
                height={height}
                src={url}
                alt={title}
                className={loading ? styles.animated_background : ''}
            />
        </button>
    );
};

export default Gif;
