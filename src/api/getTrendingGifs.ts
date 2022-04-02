import axios from 'axios';

import { GIF_API_URL, GIF_LOADING_LIMIT, GIPHY_API_KEY } from '../constants';

import { Gif, Response } from '../types';

const getTrendingGifs = async (offset: number = 0): Promise<Gif[]> => {
    const data = axios
        .get<Response<Gif[]>>(
            `${GIF_API_URL}/trending?api_key=${GIPHY_API_KEY}&offset=${offset}&limit=${GIF_LOADING_LIMIT}&rating=g`
        )
        .then(({ data }) => data.data);

    return data;
};

export default getTrendingGifs;
