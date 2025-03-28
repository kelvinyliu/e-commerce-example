
type User = {
    id: number,
    name: string,
    email: string,
    password: string, // hashed
    isAdmin: boolean,
}

export default User