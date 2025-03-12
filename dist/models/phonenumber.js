/**
 * PhoneNumber Model
 *
 * This file defines the PhoneNumber model for the GRC-20 publisher.
 * It implements the relationship-based data model for phone number entities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { PropertyIds } from '../config/constants.js';
export class PhoneNumber extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.owners = [];
        this.facilities = [];
        this.properties = properties;
    }
    /**
     * Create a new PhoneNumber entity
     *
     * @param properties The phone number properties
     * @param typeId The phone number type ID
     * @returns The created phone number entity
     */
    static create(properties, typeId) {
        return new PhoneNumber(null, `Phone ${properties.number}`, properties);
    }
    /**
     * Add an owner to this phone number
     *
     * @param owner The owner entity
     */
    addOwner(owner) {
        this.owners.push(owner);
    }
    /**
     * Add a facility to this phone number
     *
     * @param facility The facility entity
     */
    addFacility(facility) {
        this.facilities.push(facility);
    }
    /**
     * Generate the operations to create this phone number entity and its relations
     *
     * @param phoneNumberTypeId The phone number type ID
     * @param usedByRelationTypeId The "Used By" relation type ID
     * @returns The operations to create this phone number entity and its relations
     */
    generateOps(phoneNumberTypeId, usedByRelationTypeId) {
        const ops = [];
        // Create the phone number entity
        const { id: phoneNumberId, ops: phoneNumberOps } = Graph.createEntity({
            name: this.name,
            types: [phoneNumberTypeId],
            properties: {
                [PropertyIds.PHONE_NUMBER]: {
                    type: 'TEXT',
                    value: this.properties.number,
                },
            },
        });
        // Set the ID of this phone number entity
        this.id = phoneNumberId;
        ops.push(...phoneNumberOps);
        // Add relationships to owners
        for (const owner of this.owners) {
            if (owner.getId()) {
                const { ops: ownerRelationOps } = Graph.createRelation({
                    fromId: phoneNumberId,
                    toId: owner.getId(),
                    relationTypeId: usedByRelationTypeId,
                });
                ops.push(...ownerRelationOps);
            }
        }
        // Add relationships to facilities
        for (const facility of this.facilities) {
            if (facility.getId()) {
                const { ops: facilityRelationOps } = Graph.createRelation({
                    fromId: phoneNumberId,
                    toId: facility.getId(),
                    relationTypeId: usedByRelationTypeId,
                });
                ops.push(...facilityRelationOps);
            }
        }
        return ops;
    }
}
//# sourceMappingURL=phonenumber.js.map