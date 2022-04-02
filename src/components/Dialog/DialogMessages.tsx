import React, { useEffect, useMemo } from 'react';

import timeFromTimestamp from '../../utils/timeFromTimestamp';
import Gif from '../Gif';

import styles from './Dialog.module.css';

import { Message } from '../../types';

type Props = {
    messages: Message[];
};

const DialogMessages: React.FC<Props> = ({ messages }) => {
    const messagesContainer = React.createRef<HTMLDivElement>();

    // Scroll to the last message after senging one
    useEffect(() => {
        if (messagesContainer.current) {
            messagesContainer.current.scroll({
                top: messagesContainer.current.scrollHeight,
            });
        }
    }, [messages]);

    const gifsData = useMemo(() => {
        return messages.map(({ timestamp, gif }) => {
            const {
                images: { original },
                title,
                id,
            } = gif;

            const imageWidth = Math.min(Number(original.width), 300);
            const imageHeight =
                (imageWidth / Number(original.width)) * Number(original.height);

            const timeString = timeFromTimestamp(timestamp);

            return {
                width: imageWidth.toString(),
                height: imageHeight.toString(),
                timeString,
                title,
                url: original.url,
                id,
            };
        });
    }, [messages]);

    return (
        <div className={styles.dialog_messages} ref={messagesContainer}>
            {gifsData.map(({ id, height, width, timeString, title, url }) => (
                <div key={id} className={styles.dialog_messeges_message}>
                    <Gif
                        image={{
                            url,
                            width,
                            height,
                        }}
                        title={title}
                    />
                    <span className={styles.message_timestamp}>
                        {timeString}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default DialogMessages;
