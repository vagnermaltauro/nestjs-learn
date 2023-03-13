export declare class UserController {
    create(body: any): Promise<{
        body: any;
    }>;
    list(): Promise<{
        users: any[];
    }>;
    readOne(params: any): Promise<{
        user: {};
        params: any;
    }>;
}
