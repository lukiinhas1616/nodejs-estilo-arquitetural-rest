import db from "../db";
import User from "../models/user.model";
import DatabaseError  from "../models/errors/database.error.model";

class UserRepository {
    async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT uuid, email
            FROM application_user
        `;

        const { rows } = await db.query<User>(query);
        return rows || [];
    }

    async findById(uuid: string): Promise<User> {
        try {
            const query = `
            SELECT uuid, email
            FROM application_user
            WHERE uuid = $1
        `;

            const values = [uuid];

            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            return user;
        } catch (e) {
            throw new DatabaseError('Erro na consulta por ID',e);
        }
    }

    async create(user: User): Promise<String> {
        const query = `
            INSERT INTO application_user (
                email,
                password
            )
            VALUES ($1, crypt($2,'eleviisimaw123456789'))
            RETURNING uuid
        `;

        const values = [user.email, user.password];

        const { rows } = await db.query<{ uuid: string }>(query, values);
        const [newUser] = rows;
        return newUser.uuid;
    }

    async update(user: User): Promise<void> {
        const query = `
            UPDATE application_user
            SET email =  $1, password = crypt($2,'eleviisimaw123456789')
            WHERE uuid = $3
        `;

        const values = [user.email, user.password, user.uuid];
        await db.query(query, values);
    }

    async remove(uuid: string): Promise<void> {
        const query = `
            DELETE FROM application_user
            WHERE uuid = $1
        `;

        const values = [uuid];
        await db.query(query, values);
    }

}

export default new UserRepository();