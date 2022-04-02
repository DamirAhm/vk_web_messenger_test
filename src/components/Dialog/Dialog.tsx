import React, { useCallback, useState } from 'react';

import styles from './Dialog.module.css';

import { Gif as GifType, Message } from '../../types';
import DialogHeader from './DialogHeader';
import DialogMessages from './DialogMessages';
import DialogNewMessage from './DialogNewMessage';

const Dialog: React.FC = () => {
    const [text, setText] = useState('');
    const [gifs, setGifs] = useState<Message[]>([]);

    const addGif = useCallback(
        (newGif: GifType) => {
            const newMessage = {
                gif: newGif,
                timestamp: Date.now(),
            };

            setGifs((prev) => [newMessage, ...prev]);
            setText('');
        },
        [setGifs]
    );

    return (
        <div className={styles.dialog}>
            <DialogHeader />

            <DialogMessages messages={gifs} />

            <DialogNewMessage addGif={addGif} setText={setText} text={text} />
        </div>
    );
};

export default Dialog;
