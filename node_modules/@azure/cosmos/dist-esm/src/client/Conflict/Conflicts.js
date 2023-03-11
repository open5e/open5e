import { getIdFromLink, getPathFromLink, ResourceType } from "../../common";
import { QueryIterator } from "../../queryIterator";
/**
 * Use to query or read all conflicts.
 *
 * @see {@link Conflict} to read or delete a given {@link Conflict} by id.
 */
export class Conflicts {
    constructor(container, clientContext) {
        this.container = container;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = getPathFromLink(this.container.url, ResourceType.conflicts);
        const id = getIdFromLink(this.container.url);
        return new QueryIterator(this.clientContext, query, options, (innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: ResourceType.conflicts,
                resourceId: id,
                resultFn: (result) => result.Conflicts,
                query,
                options: innerOptions,
            });
        });
    }
    /**
     * Reads all conflicts
     * @param options - Use to set options like response page size, continuation tokens, etc.
     */
    readAll(options) {
        return this.query(undefined, options);
    }
}
//# sourceMappingURL=Conflicts.js.map