import { HTTPMethod, ResourceType } from "../common";
export declare function generateHeaders(masterKey: string, method: HTTPMethod, resourceType?: ResourceType, resourceId?: string, date?: Date): Promise<{
    [x: string]: string;
}>;
//# sourceMappingURL=headers.d.ts.map