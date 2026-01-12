
    export function getGamePrice(rating: number): number{
        if (rating > 4.5){
            return 49.99;
        }else if (rating > 4.0){
            return 39.99;
        }else if (rating >= 3.5){
            return 29.99;
        }else{
            return 19.99;
        }
    }