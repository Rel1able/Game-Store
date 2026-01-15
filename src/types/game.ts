type Genre = {
    name: string;
}

export type Game = {
    rating: number;
    name: string;
    background_image: string;
    description_raw?: string;
    website: string;
    genres: Genre[];
    released: string;
    id: number;
    price: number;
}