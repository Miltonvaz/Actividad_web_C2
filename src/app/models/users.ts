        export interface Users {
            id?:number,
            email:string
            username?:string
            password:string
            access_token: string;
        }
        export interface LoginResponse {
            user: {
                id: number;
                username: string;
                email: string;
            };
            token: string;
        }
