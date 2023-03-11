import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request/ResourceResponse";
import { Resource } from "../Resource";
import { ContainerDefinition } from "./ContainerDefinition";
import { Container } from "./index";
/** Response object for Container operations */
export declare class ContainerResponse extends ResourceResponse<ContainerDefinition & Resource> {
    constructor(resource: ContainerDefinition & Resource, headers: CosmosHeaders, statusCode: number, container: Container);
    /** A reference to the {@link Container} that the returned {@link ContainerDefinition} corresponds to. */
    readonly container: Container;
}
//# sourceMappingURL=ContainerResponse.d.ts.map