import { createDatabaseUri, getIdFromLink, getPathFromLink, ResourceType } from "../../common";
import { Container, Containers } from "../Container";
import { User, Users } from "../User";
import { DatabaseResponse } from "./DatabaseResponse";
import { OfferResponse, Offer } from "../Offer";
/**
 * Operations for reading or deleting an existing database.
 *
 * @see {@link Databases} for creating new databases, and reading/querying all databases; use `client.databases`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `database.read()` before every single `item.read()` call, to ensure the database exists;
 * do this once on application start up.
 */
export class Database {
    /** Returns a new {@link Database} instance.
     *
     * Note: the intention is to get this object from {@link CosmosClient} via `client.database(id)`, not to instantiate it yourself.
     */
    constructor(client, id, clientContext) {
        this.client = client;
        this.id = id;
        this.clientContext = clientContext;
        this.containers = new Containers(this, this.clientContext);
        this.users = new Users(this, this.clientContext);
    }
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return createDatabaseUri(this.id);
    }
    /**
     * Used to read, replace, or delete a specific, existing {@link Database} by id.
     *
     * Use `.containers` creating new containers, or querying/reading all containers.
     *
     * @example Delete a container
     * ```typescript
     * await client.database("<db id>").container("<container id>").delete();
     * ```
     */
    container(id) {
        return new Container(this, id, this.clientContext);
    }
    /**
     * Used to read, replace, or delete a specific, existing {@link User} by id.
     *
     * Use `.users` for creating new users, or querying/reading all users.
     */
    user(id) {
        return new User(this, id, this.clientContext);
    }
    /** Read the definition of the given Database. */
    async read(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.read({
            path,
            resourceType: ResourceType.database,
            resourceId: id,
            options,
        });
        return new DatabaseResponse(response.result, response.headers, response.code, this);
    }
    /** Delete the given Database. */
    async delete(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.delete({
            path,
            resourceType: ResourceType.database,
            resourceId: id,
            options,
        });
        return new DatabaseResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Gets offer on database. If none exists, returns an OfferResponse with undefined.
     */
    async readOffer(options = {}) {
        const { resource: record } = await this.read();
        const path = "/offers";
        const url = record._self;
        const response = await this.clientContext.queryFeed({
            path,
            resourceId: "",
            resourceType: ResourceType.offer,
            query: `SELECT * from root where root.resource = "${url}"`,
            resultFn: (result) => result.Offers,
            options,
        });
        const offer = response.result[0]
            ? new Offer(this.client, response.result[0].id, this.clientContext)
            : undefined;
        return new OfferResponse(response.result[0], response.headers, response.code, offer);
    }
}
//# sourceMappingURL=Database.js.map