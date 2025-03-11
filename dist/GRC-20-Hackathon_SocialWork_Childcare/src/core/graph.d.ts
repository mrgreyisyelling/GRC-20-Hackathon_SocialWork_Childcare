/**
 * Graph
 *
 * This file provides utilities for working with the GRC-20 knowledge graph.
 * It handles the creation of entities, properties, and relations.
 */
/**
 * Property Value
 *
 * Represents a property value in the GRC-20 knowledge graph.
 */
export interface PropertyValue {
    type: 'TEXT' | 'NUMBER' | 'URL' | 'TIME' | 'POINT' | 'CHECKBOX' | 'BOOLEAN';
    value: string | number | boolean;
}
/**
 * Entity Operation
 *
 * Represents an operation on an entity in the GRC-20 knowledge graph.
 */
export type EntityOp = {
    type: 'CREATE_ENTITY';
    id: string;
    name: string;
    types: string[];
} | {
    type: 'SET_NAME';
    entityId: string;
    name: string;
} | {
    type: 'SET_PROPERTY';
    entityId: string;
    propertyId: string;
    value: PropertyValue;
} | {
    type: 'DELETE_PROPERTY';
    entityId: string;
    propertyId: string;
} | {
    type: 'CREATE_RELATION';
    id: string;
    fromId: string;
    toId: string;
    relationTypeId: string;
} | {
    type: 'DELETE_RELATION';
    relationId: string;
};
/**
 * Graph
 *
 * Provides utilities for working with the GRC-20 knowledge graph.
 */
export declare class Graph {
    /**
     * Create an entity in the GRC-20 knowledge graph
     *
     * @param options The entity options
     * @returns The entity ID and operations
     */
    static createEntity(options: {
        name: string;
        types: string[];
        properties?: Record<string, PropertyValue>;
    }): {
        id: string;
        ops: EntityOp[];
    };
    /**
     * Create a relation in the GRC-20 knowledge graph
     *
     * @param options The relation options
     * @returns The relation ID and operations
     */
    static createRelation(options: {
        fromId: string;
        toId: string;
        relationTypeId: string;
    }): {
        id: string;
        ops: EntityOp[];
    };
    /**
     * Delete a relation in the GRC-20 knowledge graph
     *
     * @param relationId The relation ID
     * @returns The operations
     */
    static deleteRelation(relationId: string): {
        ops: EntityOp[];
    };
}
