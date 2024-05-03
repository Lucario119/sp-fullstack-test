import { UserDataProps } from "../types/types";
import { getDB } from "./db";

getDB()?.serialize(() => {
    getDB()?.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT)");
});

 export function insertUser(user: UserDataProps): Promise<void> {
    const { name, city, country, favorite_sport } = user;
    return new Promise<void>((resolve, reject) => {
        getDB()?.run('INSERT INTO users (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)', [name, city, country, favorite_sport], (err: Error | null) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function searchUsers(searchTerm: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
        const query: string = `SELECT * FROM users WHERE name LIKE '%${searchTerm}%' OR city LIKE '%${searchTerm}%' OR country LIKE '%${searchTerm}%' OR favorite_sport LIKE '%${searchTerm}%' `;
        getDB()?.all(query, (err: Error | null, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
