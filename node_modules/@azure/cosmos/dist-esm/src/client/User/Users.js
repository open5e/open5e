import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType } from "../../common";
import { QueryIterator } from "../../queryIterator";
import { User } from "./User";
import { UserResponse } from "./UserResponse";
/**
 * Used to create, upsert, query, and read all users.
 *
 * @see {@link User} to read, replace, or delete a specific User by id.
 */
export class Users {
    /**
     * @hidden
     * @param database - The parent {@link Database}.
     */
    constructor(database, clientContext) {
        this.database = database;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = getPathFromLink(this.database.url, ResourceType.user);
        const id = getIdFromLink(this.database.url);
        return new QueryIterator(this.clientContext, query, options, (innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: ResourceType.user,
                resourceId: id,
                resultFn: (result) => result.Users,
                query,
                options: innerOptions,
            });
        });
    }
    /**
     * Read all users.-
     * @example Read all users to array.
     * ```typescript
     * const {body: usersList} = await database.users.readAll().fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
    /**
     * Create a database user with the specified {@link UserDefinition}.
     * @param body - The specified {@link UserDefinition}.
     */
    async create(body, options) {
        const err = {};
        if (!isResourceValid(body, err)) {
            throw err;
        }
        const path = getPathFromLink(this.database.url, ResourceType.user);
        const id = getIdFromLink(this.database.url);
        const response = await this.clientContext.create({
            body,
            path,
            resourceType: ResourceType.user,
            resourceId: id,
            options,
        });
        const ref = new User(this.database, response.result.id, this.clientContext);
        return new UserResponse(response.result, response.headers, response.code, ref);
    }
    /**
     * Upsert a database user with a specified {@link UserDefinition}.
     * @param body - The specified {@link UserDefinition}.
     */
    async upsert(body, options) {
        const err = {};
        if (!isResourceValid(body, err)) {
            throw err;
        }
        const path = getPathFromLink(this.database.url, ResourceType.user);
        const id = getIdFromLink(this.database.url);
        const response = await this.clientContext.upsert({
            body,
            path,
            resourceType: ResourceType.user,
            resourceId: id,
            options,
        });
        const ref = new User(this.database, response.result.id, this.clientContext);
        return new UserResponse(response.result, response.headers, response.code, ref);
    }
}
//# sourceMappingURL=Users.js.map