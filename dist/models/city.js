/**
 * City Model
 *
 * This file defines the City model for the GRC-20 publisher.
 * It implements the relationship-based data model for city entities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { PropertyIds } from '../config/constants.js';
export class City extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.properties = properties;
    }
    /**
     * Create a new City entity
     *
     * @param properties The city properties
     * @param typeId The city type ID
     * @returns The created city entity
     */
    static create(properties, typeId) {
        return new City(null, properties.name, properties);
    }
    /**
     * Set the state for this city
     *
     * @param state The state entity
     */
    setState(state) {
        this.state = state;
    }
    /**
     * Generate the operations to create this city entity and its relations
     *
     * @param cityTypeId The city type ID
     * @param inStateRelationTypeId The relation type ID for cities being in a state
     * @returns The operations to create this city entity and its relations
     */
    generateOps(cityTypeId, inStateRelationTypeId) {
        const ops = [];
        // Create the city entity
        const { id: cityId, ops: cityOps } = Graph.createEntity({
            name: this.name,
            types: [cityTypeId],
            properties: {
                [PropertyIds.CITY_NAME]: {
                    type: 'TEXT',
                    value: this.properties.name,
                },
            },
        });
        // Set the ID of this city entity
        this.id = cityId;
        ops.push(...cityOps);
        // Add relationship to state if available
        if (this.state && this.state.getId()) {
            const { ops: stateRelationOps } = Graph.createRelation({
                fromId: cityId,
                toId: this.state.getId(),
                relationTypeId: inStateRelationTypeId,
            });
            ops.push(...stateRelationOps);
        }
        return ops;
    }
}
//# sourceMappingURL=city.js.map