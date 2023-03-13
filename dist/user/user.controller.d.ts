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
    update(body: any, params: any): Promise<{
        method: string;
        body: any;
        params: any;
    }>;
    updatePartial(body: any, params: any): Promise<{
        method: string;
        body: any;
        params: any;
    }>;
    delete(params: any): Promise<{
        params: any;
    }>;
}
