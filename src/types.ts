export type Gif = {
    images: {
        original: Image;
        fixed_height_downsampled: Image;
    };
    id: string;
    title: string;
};

export type Image = {
    url: string;
    height: string;
    width: string;
};

export type Message = {
    gif: Gif;
    timestamp: number;
};

export type Response<T> = { data: T };
