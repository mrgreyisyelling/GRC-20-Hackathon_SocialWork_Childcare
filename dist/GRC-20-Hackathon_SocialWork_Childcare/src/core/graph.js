/**
 * Graph
 *
 * This file provides utilities for working with the GRC-20 knowledge graph.
 * It handles the creation of entities, properties, and relations.
 */
import { Id } from '@graphprotocol/grc-20';
/**
 * Graph
 *
 * Provides utilities for working with the GRC-20 knowledge graph.
 */
export class Graph {
    /**
     * Create an entity in the GRC-20 knowledge graph
     *
     * @param options The entity options
     * @returns The entity ID and operations
     */
    static createEntity(options) {
        const id = Id.generate();
        const ops = [
            {
                type: 'CREATE_ENTITY',
                id,
                name: options.name,
                types: options.types,
            },
        ];
        if (options.properties) {
            for (const [propertyId, value] of Object.entries(options.properties)) {
                ops.push({
                    type: 'SET_PROPERTY',
                    entityId: id,
                    propertyId,
                    value,
                });
            }
        }
        return { id, ops };
    }
    /**
     * Create a relation in the GRC-20 knowledge graph
     *
     * @param options The relation options
     * @returns The relation ID and operations
     */
    static createRelation(options) {
        const id = Id.generate();
        const ops = [
            {
                type: 'CREATE_RELATION',
                id,
                fromId: options.fromId,
                toId: options.toId,
                relationTypeId: options.relationTypeId,
            },
        ];
        return { id, ops };
    }
    /**
     * Delete a relation in the GRC-20 knowledge graph
     *
     * @param relationId The relation ID
     * @returns The operations
     */
    static deleteRelation(relationId) {
        const ops = [
            {
                type: 'DELETE_RELATION',
                relationId,
            },
        ];
        return { ops };
    }
}
//# sourceMappingURL=graph.js.map