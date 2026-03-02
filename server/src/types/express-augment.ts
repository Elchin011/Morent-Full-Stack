declare global {
    namespace Express {
        interface User {
            _id: any;
            name: string;
            surname: string;
            email: string;
            role: "admin" | "user";
            [key: string]: any;
        }
        interface Request {
            matchedData: Record<string, any>;
        }
    }
}

export {};
