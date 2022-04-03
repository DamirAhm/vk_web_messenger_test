import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Spinner from '../Spinner';
import Gif from '../Gif';
import { getTrendingGifs, getGifsBySearch } from '../../api';
import debounce from '../../utils/debounce';

import styles from './GifSuggestor.module.css';

import { Gif as GifType } from '../../types';

type Props = {
    search: string;
    onGifPicked: (gif: GifType) => void;
};

enum arrowKeys {
    ArrowUp = 'ArrowUp',
    ArrowRight = 'ArrowRight',
    ArrowDown = 'ArrowDown',
    ArrowLeft = 'ArrowLeft',
}

const observerOptions = (root: HTMLDivElement | null) => ({
    root,
    rootMargin: '0px',
    threshold: 0.1,
});

const CONTAINER_WIDTH = 470;
const GAP = 5;
const createRowsFromGifs = (gifs: GifType[]) => {
    return gifs.reduce<GifType[][]>(
        (acc, c) => {
            const currentRowWidth = acc
                .at(-1)!
                .reduce(
                    (acc, c) =>
                        acc +
                        Number(c.images.fixed_height_downsampled.width) / 2,
                    0
                );

            const {
                images: {
                    fixed_height_downsampled: { width },
                },
            } = c;

            // Check if current row's gifs width plus a new one's width
            // can fit into container with gaps of 5px
            const maxNewGifWidth = CONTAINER_WIDTH - acc.at(-1)!.length * GAP;
            if (
                currentRowWidth + Number(width) / 2 > maxNewGifWidth &&
                // When one gif can't fit into container and it's first we shouldn't create new row
                acc.at(-1)!.length > 0
            ) {
                acc.push([]);
            }

            // Add new gif to the last row
            acc.at(-1)!.push(c);
            return acc;
        },
        [[]]
    );
};

const GifSuggestor: React.FC<Props> = ({ search, onGifPicked }) => {
    const [displayableGifs, setDisplayableGifs] = useState<GifType[]>([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const lastRowRef = React.createRef<HTMLDivElement>();

    const addTrendingGifs = useCallback(async () => {
        const trandingGifs = await getTrendingGifs(offset);

        setDisplayableGifs((prev) => [...prev, ...trandingGifs]);
        setOffset((prev) => prev + trandingGifs.length);
    }, [offset]);

    const addGifsBySearch = useCallback(
        async (search: string) => {
            const gifsBySearch = await getGifsBySearch(search, offset);

            setDisplayableGifs((prev) => [...prev, ...gifsBySearch]);
            setOffset((prev) => prev + gifsBySearch.length);
        },
        [offset]
    );

    const addGifsDependsOnSearch = (search: string) => {
        if (search.trim() === '') {
            addTrendingGifs().then(() => setLoading(false));
        } else {
            addGifsBySearch(search).then(() => setLoading(false));
        }
    };
    const handleSearchChange = useMemo(
        () => debounce(addGifsDependsOnSearch, 500),
        [offset]
    );

    const containerRef = React.createRef<HTMLDivElement>();
    const observer = useMemo(
        () =>
            new IntersectionObserver((entries) => {
                for (let entrie of entries) {
                    if (entrie.intersectionRatio > 0)
                        observer.unobserve(entrie.target);
                }

                const isSomeEntriesInView = entries.some(
                    (entrie) => entrie.intersectionRatio > 0
                );

                if (isSomeEntriesInView) {
                    addGifsDependsOnSearch(search);
                }
            }, observerOptions(containerRef.current)),
        [search, addGifsBySearch, addTrendingGifs, offset]
    );

    // Starts observing last row (updates after new gifs are added)
    useEffect(() => {
        if (containerRef.current !== null && lastRowRef.current && !loading) {
            observer.observe(lastRowRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [offset, loading]);

    // Adds gifs after seach has changed
    useEffect(() => {
        setOffset(0);
        setDisplayableGifs([]);
        setLoading(true);

        handleSearchChange(search);
    }, [search]);

    const gifRows = useMemo(
        () => createRowsFromGifs(displayableGifs),
        [displayableGifs]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleArrowNavigation);

        return () =>
            document.removeEventListener('keydown', handleArrowNavigation);
    }, [containerRef]);

    const handleArrowNavigation = useCallback(
        (e: KeyboardEvent) => {
            const focusedElement = containerRef.current?.querySelector(
                `.${styles.gif_suggestions_image}:focus-within`
            ) as HTMLDivElement;

            if (containerRef.current && focusedElement) {
                const id = focusedElement.dataset.id as string;

                let rowIndex = gifRows.findIndex((row, i) =>
                    row.some((gif) => `${gif.id}_${i}` === id)
                );
                const gifIndex = gifRows[rowIndex].findIndex((gif) =>
                    id.startsWith(gif.id)
                );

                let gif: GifType | undefined;

                if (e.key === arrowKeys.ArrowUp && rowIndex > 0) {
                    rowIndex = rowIndex - 1;
                    const prevRow = gifRows[rowIndex];
                    gif = prevRow[Math.min(prevRow.length - 1, gifIndex)];
                } else if (
                    e.key === arrowKeys.ArrowRight &&
                    (rowIndex < gifRows.length - 1 ||
                        gifIndex + 1 < gifRows[rowIndex].length)
                ) {
                    if (gifIndex + 1 === gifRows[rowIndex].length) {
                        rowIndex = rowIndex + 1;
                        const nextRow = gifRows[rowIndex];
                        gif = nextRow[0];
                    } else {
                        gif = gifRows[rowIndex][gifIndex + 1];
                    }
                } else if (
                    e.key === arrowKeys.ArrowDown &&
                    rowIndex < gifRows.length - 1
                ) {
                    rowIndex = rowIndex + 1;
                    const nextRow = gifRows[rowIndex];
                    gif = nextRow[Math.min(nextRow.length - 1, gifIndex)];
                } else if (
                    e.key === arrowKeys.ArrowLeft &&
                    (rowIndex > 0 || gifIndex > 0)
                ) {
                    if (gifIndex === 0) {
                        rowIndex = rowIndex - 1;
                        const prevRow = gifRows[rowIndex];
                        gif = prevRow[prevRow.length - 1];
                    } else {
                        gif = gifRows[rowIndex][gifIndex - 1];
                    }
                }

                if (gif !== undefined) {
                    const elem = containerRef.current.querySelector(
                        `.${styles.gif_suggestions_image}[data-id="${gif.id}_${rowIndex}"] button`
                    ) as HTMLButtonElement;
                    elem?.focus();
                }
            }
        },
        [containerRef, gifRows]
    );

    if (loading) {
        return (
            <div className={styles.gif_suggestions} ref={containerRef}>
                <div className={styles.gif_suggestions_loading}>
                    <Spinner />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.gif_suggestions} ref={containerRef}>
            {displayableGifs.length > 0 ? (
                <div className={styles.gif_suggestions_images}>
                    {gifRows.map((row, i) => (
                        <div
                            key={`row_${i}`}
                            className={styles.gif_suggestions_images_row}
                            // Set ref only if its last row
                            ref={i === gifRows.length - 1 ? lastRowRef : null}
                        >
                            {row.map((gif) => {
                                const {
                                    id,
                                    title,
                                    images: { fixed_height_downsampled },
                                } = gif;
                                return (
                                    <div
                                        key={id}
                                        className={styles.gif_suggestions_image}
                                        data-id={`${id}_${i}`}
                                    >
                                        <Gif
                                            image={{
                                                ...fixed_height_downsampled,
                                                height: '100',
                                                width: (
                                                    Number(
                                                        fixed_height_downsampled.width
                                                    ) / 2
                                                ).toString(),
                                            }}
                                            title={title}
                                            onClick={() => {
                                                onGifPicked(gif);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            ) : (
                <span className={styles.gif_suggestions_not_found}>
                    Гифок не найдено ;(
                </span>
            )}
        </div>
    );
};

export default GifSuggestor;
