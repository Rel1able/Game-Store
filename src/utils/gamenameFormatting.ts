export function formatGenreName(name: string): string {
    if (name !== "role-playing-games-rpg"){
        const formattedName = name.split("");
        formattedName[0] = formattedName[0].toUpperCase();
        return formattedName.join("");
    }else {
        return "RPG";
    }

}