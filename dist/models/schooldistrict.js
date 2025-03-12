/**
 * School District Model
 *
 * This file defines the SchoolDistrict model for the GRC-20 publisher.
 * It implements the relationship-based data model for school district entities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';
export class SchoolDistrict extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.facilities = [];
        this.properties = properties;
    }
    /**
     * Create a new School District entity
     *
     * @param properties The school district properties
     * @param typeId The school district type ID
     * @returns The created school district entity
     */
    static create(properties, typeId) {
        const name = `School District: ${properties.districtName}`;
        return new SchoolDistrict(null, name, properties);
    }
    /**
     * Add a facility to this school district
     *
     * @param facility The facility entity
     */
    addFacility(facility) {
        this.facilities.push(facility);
    }
    /**
     * Generate the operations to create this school district entity and its relations
     *
     * @param schoolDistrictTypeId The school district type ID
     * @returns The operations to create this school district entity and its relations
     */
    generateOps(schoolDistrictTypeId) {
        const ops = [];
        // Create the school district entity
        const { id: schoolDistrictId, ops: schoolDistrictOps } = Graph.createEntity({
            name: this.name,
            types: [schoolDistrictTypeId],
            properties: {
                [PropertyIds.DISTRICT_NAME]: {
                    type: 'TEXT',
                    value: this.properties.districtName,
                },
            },
        });
        // Set the ID of this school district entity
        this.id = schoolDistrictId;
        ops.push(...schoolDistrictOps);
        // Add relationships to facilities if they exist
        for (const facility of this.facilities) {
            if (facility.getId()) {
                const { ops: facilityRelationOps } = Graph.createRelation({
                    fromId: schoolDistrictId,
                    toId: facility.getId(),
                    relationTypeId: RelationTypeIds.OVERSEES,
                });
                ops.push(...facilityRelationOps);
            }
        }
        return ops;
    }
}
//# sourceMappingURL=schooldistrict.js.map