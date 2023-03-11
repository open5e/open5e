import { DataType, IndexingMode, IndexKind } from "./index";
export interface IndexingPolicy {
    /** The indexing mode (consistent or lazy) {@link IndexingMode}. */
    indexingMode?: keyof typeof IndexingMode;
    automatic?: boolean;
    /** An array of {@link IncludedPath} represents the paths to be included for indexing. */
    includedPaths?: IndexedPath[];
    /** An array of {@link IncludedPath} represents the paths to be excluded for indexing. */
    excludedPaths?: IndexedPath[];
    spatialIndexes?: SpatialIndex[];
}
export declare enum SpatialType {
    LineString = "LineString",
    MultiPolygon = "MultiPolygon",
    Point = "Point",
    Polygon = "Polygon"
}
export interface SpatialIndex {
    path: string;
    types: SpatialType[];
    boundingBox: {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
    };
}
export interface IndexedPath {
    path: string;
    indexes?: Index[];
}
export interface Index {
    kind: keyof typeof IndexKind;
    dataType: keyof typeof DataType;
    precision?: number;
}
//# sourceMappingURL=IndexingPolicy.d.ts.map