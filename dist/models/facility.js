/**
 * Facility Model
 *
 * This file defines the Facility model for the GRC-20 publisher.
 * It implements the relationship-based data model for childcare facilities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';
export class Facility extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.properties = properties;
    }
    /**
     * Create a new Facility entity
     *
     * @param properties The facility properties
     * @param typeId The facility type ID
     * @returns The created facility entity
     */
    static create(properties, typeId) {
        const name = `Facility: ${properties.facilityName}`;
        return new Facility(null, name, properties);
    }
    /**
     * Set the location for this facility
     *
     * @param location The location entity
     */
    setLocation(location) {
        this.location = location;
    }
    /**
     * Set the owner for this facility
     *
     * @param owner The owner entity
     */
    setOwner(owner) {
        this.owner = owner;
    }
    /**
     * Set the license for this facility
     *
     * @param license The license entity
     */
    setLicense(license) {
        this.license = license;
    }
    /**
     * Set the school district for this facility
     *
     * @param schoolDistrict The school district entity
     */
    setSchoolDistrict(schoolDistrict) {
        this.schoolDistrict = schoolDistrict;
    }
    /**
     * Set the schedule for this facility
     *
     * @param schedule The schedule entity
     */
    setSchedule(schedule) {
        this.schedule = schedule;
    }
    /**
     * Generate the operations to create this facility entity and its relations
     *
     * @param facilityTypeId The facility type ID
     * @returns The operations to create this facility entity and its relations
     */
    generateOps(facilityTypeId) {
        const ops = [];
        // Create the facility entity
        const { id: facilityId, ops: facilityOps } = Graph.createEntity({
            name: this.name,
            types: [facilityTypeId],
            properties: {
                [PropertyIds.FACILITY_NAME]: { type: 'TEXT', value: this.properties.facilityName },
                ...(this.properties.facilityStatus && {
                    [PropertyIds.FACILITY_STATUS]: { type: 'TEXT', value: this.properties.facilityStatus },
                }),
                ...(this.properties.facilityType && {
                    [PropertyIds.FACILITY_TYPE]: { type: 'TEXT', value: this.properties.facilityType },
                }),
                ...(this.properties.acceptsSubsidies !== undefined && {
                    [PropertyIds.ACCEPTS_SUBSIDIES]: { type: 'BOOLEAN', value: this.properties.acceptsSubsidies },
                }),
            },
        });
        // Set the ID of this facility entity
        this.id = facilityId;
        ops.push(...facilityOps);
        // Add relations to Location, Owner, License, SchoolDistrict, and Schedule if they exist
        if (this.location && this.location.getId()) {
            const { ops: locationRelationOps } = Graph.createRelation({
                fromId: facilityId,
                toId: this.location.getId(),
                relationTypeId: RelationTypeIds.LOCATED_AT,
            });
            ops.push(...locationRelationOps);
        }
        if (this.owner && this.owner.getId()) {
            const { ops: ownerRelationOps } = Graph.createRelation({
                fromId: facilityId,
                toId: this.owner.getId(),
                relationTypeId: RelationTypeIds.OWNED_BY,
            });
            ops.push(...ownerRelationOps);
        }
        if (this.license && this.license.getId()) {
            const { ops: licenseRelationOps } = Graph.createRelation({
                fromId: facilityId,
                toId: this.license.getId(),
                relationTypeId: RelationTypeIds.LICENSED_UNDER,
            });
            ops.push(...licenseRelationOps);
        }
        if (this.schoolDistrict && this.schoolDistrict.getId()) {
            const { ops: schoolDistrictRelationOps } = Graph.createRelation({
                fromId: facilityId,
                toId: this.schoolDistrict.getId(),
                relationTypeId: RelationTypeIds.AFFILIATED_WITH,
            });
            ops.push(...schoolDistrictRelationOps);
        }
        if (this.schedule && this.schedule.getId()) {
            const { ops: scheduleRelationOps } = Graph.createRelation({
                fromId: facilityId,
                toId: this.schedule.getId(),
                relationTypeId: RelationTypeIds.FOLLOWS_SCHEDULE,
            });
            ops.push(...scheduleRelationOps);
        }
        return ops;
    }
    /**
     * Get the facility name
     *
     * @returns The facility name
     */
    getFacilityName() {
        return this.properties.facilityName;
    }
    /**
     * Generate operations to update the name of this facility
     *
     * @returns The operations to update the name
     */
    generateNameUpdateOps() {
        if (!this.id) {
            return [];
        }
        return [
            {
                type: 'SET_NAME',
                entityId: this.id,
                name: this.name,
            },
        ];
    }
}
//# sourceMappingURL=facility.js.map