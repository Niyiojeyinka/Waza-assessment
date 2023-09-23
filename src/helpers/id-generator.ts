export const generateUniqueId = (): string => {
    /**
     * For simplicity, we'll just use a random math mehtod to generate a string, in real life we'd use a UUID/DB generated ID
     * i personally like to have an id  column which serve as primary key in the database and another unique
       id called publicKey which is used for the client to identify the object ofcourse indexed
    **/
    return Math.random().toString(36).substr(2, 9);
}
