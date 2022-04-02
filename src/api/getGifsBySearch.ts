import axios from 'axios';

import { GIF_API_URL, GIF_LOADING_LIMIT, GIPHY_API_KEY } from '../constants';

import { Gif, Response } from '../types';

const getTrendingGifs = async (
    search: string,
    offset: number = 0
): Promise<Gif[]> => {
    const data = axios
        .get<Response<Gif[]>>(
            `${GIF_API_URL}/search?api_key=${GIPHY_API_KEY}&q=${search}&limit=${GIF_LOADING_LIMIT}&offset=${offset}&rating=g&lang=en`
        )
        .then(({ data }) => data.data)
        .then((gifs) =>
            // Removes repeated gifs (for safety's sake)
            gifs.filter(
                ({ id }, i) => gifs.findIndex(({ id: fid }) => id === fid) === i
            )
        );

    return data;
};

export default getTrendingGifs;
