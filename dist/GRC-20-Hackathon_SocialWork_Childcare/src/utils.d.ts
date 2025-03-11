import { EntityOp } from '../core/graph.js';
/** Ensures an entity exists and returns its operation */
export declare function getOrCreateEntity(type: string, data: any): EntityOp;
/** Extracts attributes for a given entity */
export declare function getOrCreateAttributes(type: string, data: any): EntityOp[];
/** Creates relationships between entities */
export declare function getOrCreateRelationship(fromId: string, toId: string, relationType: string): EntityOp;
