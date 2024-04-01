import * as argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
    try {
        const combinedPassword: string = password + process.env.PEPPER;
        const hash: string = await argon2.hash(combinedPassword, {
            type: argon2.argon2id
        });
        return hash;
    } catch (e) {
        throw e;
    }
}