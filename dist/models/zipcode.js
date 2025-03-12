/**
 * ZipCode Model
 *
 * This file defines the ZipCode model for the GRC-20 publisher.
 * It implements the relationship-based data model for zip code entities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { PropertyIds } from '../config/constants.js';
export class ZipCode extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.properties = properties;
    }
    /**
     * Create a new ZipCode entity
     *
     * @param properties The zip code properties
     * @param typeId The zip code type ID
     * @returns The created zip code entity
     */
    static create(properties, typeId) {
        return new ZipCode(null, `ZipCode ${properties.zipCode}`, properties);
    }
    /**
     * Set the city for this zip code
     *
     * @param city The city entity
     */
    setCity(city) {
        this.city = city;
    }
    /**
     * Set the state for this zip code
     *
     * @param state The state entity
     */
    setState(state) {
        this.state = state;
    }
    /**
     * Generate the operations to create this zip code entity and its relations
     *
     * @param zipCodeTypeId The zip code type ID
     * @param cityRelationTypeId The city relation type ID
     * @param stateRelationTypeId The state relation type ID
     * @returns The operations to create this zip code entity and its relations
     */
    generateOps(zipCodeTypeId, cityRelationTypeId, stateRelationTypeId) {
        const ops = [];
        // Create the zip code entity
        const { id: zipCodeId, ops: zipCodeOps } = Graph.createEntity({
            name: this.name,
            types: [zipCodeTypeId],
            properties: {
                [PropertyIds.ZIP_CODE]: {
                    type: 'TEXT',
                    value: this.properties.zipCode,
                },
            },
        });
        // Set the ID of this zip code entity
        this.id = zipCodeId;
        ops.push(...zipCodeOps);
        // Add relationships to city and state if they exist
        if (this.city && this.city.getId()) {
            const { ops: cityRelationOps } = Graph.createRelation({
                fromId: zipCodeId,
                toId: this.city.getId(),
                relationTypeId: cityRelationTypeId,
            });
            ops.push(...cityRelationOps);
        }
        if (this.state && this.state.getId()) {
            const { ops: stateRelationOps } = Graph.createRelation({
                fromId: zipCodeId,
                toId: this.state.getId(),
                relationTypeId: stateRelationTypeId,
            });
            ops.push(...stateRelationOps);
        }
        return ops;
    }
}
//# sourceMappingURL=zipcode.js.map