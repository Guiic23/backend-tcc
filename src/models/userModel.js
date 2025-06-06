import  database from "../../db/connection.js";

export async function findAll() {
    try {
        const query = "SELECT id, username, email, photo from users;";
        const statement = database.prepare(query);
        const users = statement.all();
        //statement.finalize();
        return users;


    } catch (error) {
        console.error(error);
        throw new Error("Error fetching users :" + error.message);
    } finally {
        
        database.close();
       
    }

    
}