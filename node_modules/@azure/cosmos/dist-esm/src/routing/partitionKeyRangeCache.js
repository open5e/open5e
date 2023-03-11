import { getIdFromLink } from "../common/helper";
import { createCompleteRoutingMap } from "./CollectionRoutingMapFactory";
/** @hidden */
export class PartitionKeyRangeCache {
    constructor(clientContext) {
        this.clientContext = clientContext;
        this.collectionRoutingMapByCollectionId = {};
    }
    /**
     * Finds or Instantiates the requested Collection Routing Map
     * @param collectionLink - Requested collectionLink
     * @hidden
     */
    async onCollectionRoutingMap(collectionLink) {
        const collectionId = getIdFromLink(collectionLink);
        if (this.collectionRoutingMapByCollectionId[collectionId] === undefined) {
            this.collectionRoutingMapByCollectionId[collectionId] =
                this.requestCollectionRoutingMap(collectionLink);
        }
        return this.collectionRoutingMapByCollectionId[collectionId];
    }
    /**
     * Given the query ranges and a collection, invokes the callback on the list of overlapping partition key ranges
     * @hidden
     */
    async getOverlappingRanges(collectionLink, queryRange) {
        const crm = await this.onCollectionRoutingMap(collectionLink);
        return crm.getOverlappingRanges(queryRange);
    }
    async requestCollectionRoutingMap(collectionLink) {
        const { resources } = await this.clientContext
            .queryPartitionKeyRanges(collectionLink)
            .fetchAll();
        return createCompleteRoutingMap(resources.map((r) => [r, true]));
    }
}
//# sourceMappingURL=partitionKeyRangeCache.js.map