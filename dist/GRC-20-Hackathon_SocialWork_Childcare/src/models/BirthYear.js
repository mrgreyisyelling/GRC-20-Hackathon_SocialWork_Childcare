/**
 * BirthYear Model
 *
 * This file defines the BirthYear model for the GRC-20 publisher.
 * It implements the relationship-based data model for birth year entities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { PropertyIds } from '../config/constants.js';
export class BirthYear extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.properties = properties;
    }
    /**
     * Create a new BirthYear entity
     *
     * @param properties The birth year properties
     * @param typeId The birth year type ID
     * @returns The created birth year entity
     */
    static create(properties, typeId) {
        return new BirthYear(null, `Birth Year: ${properties.year}`, properties);
    }
    /**
     * Set the person associated with this birth year
     *
     * @param personId The ID of the person entity
     */
    setPerson(personId) {
        this.personId = personId;
    }
    /**
     * Generate the operations to create this birth year entity and its relationships
     *
     * @param birthYearTypeId The birth year type ID
     * @param bornInRelationTypeId The relation type ID for "BORN_IN"
     * @returns The operations to create this entity and its relationships
     */
    generateOps(birthYearTypeId, bornInRelationTypeId) {
        const ops = [];
        // Create the BirthYear entity
        const { id: birthYearId, ops: birthYearOps } = Graph.createEntity({
            name: this.name,
            types: [birthYearTypeId],
            properties: {
                [PropertyIds.BIRTH_YEAR]: {
                    type: 'TEXT',
                    value: this.properties.year,
                },
            },
        });
        // Set the ID of this entity
        this.id = birthYearId;
        ops.push(...birthYearOps);
        // Create relation to Person entity
        if (this.personId) {
            const { ops: bornInOps } = Graph.createRelation({
                fromId: this.personId,
                toId: birthYearId,
                relationTypeId: bornInRelationTypeId,
            });
            ops.push(...bornInOps);
        }
        return ops;
    }
    /**
     * Get the birth year value of this entity
     *
     * @returns The birth year value
     */
    getYear() {
        return this.properties.year;
    }
}
//# sourceMappingURL=BirthYear.js.map