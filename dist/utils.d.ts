import { EntityOp } from 'core/graph.js';
/** Ensures an entity exists and returns only a CREATE_ENTITY operation */
export declare function getOrCreateEntity(type: string, data: any): Extract<EntityOp, {
    type: 'CREATE_ENTITY';
}>;
/** Extracts attributes for a given entity, returning an array of SET_PROPERTY operations */
export declare function getOrCreateAttributes(type: string, data: any): Extract<EntityOp, {
    type: 'SET_PROPERTY';
}>[];
/** Creates relationships between entities, returning a CREATE_RELATION operation */
export declare function getOrCreateRelationship(fromId: string, toId: string, relationType: string): Extract<EntityOp, {
    type: 'CREATE_RELATION';
}>;
