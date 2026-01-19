export type LibraryGame = {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    price: number;
    favorite?: boolean;
    toggleFavorite: (id: number) => void;
};
