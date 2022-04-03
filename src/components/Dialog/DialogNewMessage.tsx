import React, { useCallback, useMemo, useState } from 'react';

import GifSuggestor from '../GifSuggestor';

import styles from './Dialog.module.css';

import { Gif } from '../../types';

type Props = {
    sendGif: (newGif: Gif) => void;
};

const GIF_START = '/gif';

const gifSearchRegExp = new RegExp(`^${GIF_START} (.*)$`);
const getSearchText = (searchText: string) => {
    const match = searchText.match(gifSearchRegExp);

    // If undefined then return null
    return match?.[1] ?? null;
};

const DialogNewMessage: React.FC<Props> = ({ sendGif }) => {
    const [text, setText] = useState('');

    const search = useMemo(
        () => (gifSearchRegExp.test(text) ? getSearchText(text) : null),
        [text]
    );

    const onGifPicked = useCallback((newGif: Gif) => {
        setText('');
        sendGif(newGif);
    }, []);

    return (
        <div className={styles.dialog_chat_new_message}>
            <button
                aria-label="Отправить вложение"
                className={styles.dialog_chat_new_message_attachment}
            />
            <div className={styles.dialog_chat_new_message_input_container}>
                <input
                    autoFocus
                    type="text"
                    className={styles.dialog_chat_new_message_input}
                    placeholder="Напишите сообщение..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                {search !== null && (
                    <GifSuggestor onGifPicked={onGifPicked} search={search} />
                )}
            </div>
            <button
                aria-label="Отправить сообщение"
                className={styles.dialog_chat_new_message_send}
            />
        </div>
    );
};

export default DialogNewMessage;
