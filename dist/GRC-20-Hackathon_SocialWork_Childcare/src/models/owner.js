/**
 * Owner Model
 *
 * This file defines the Owner model for the GRC-20 publisher.
 * It implements the relationship-based data model for owner entities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { PropertyIds } from '../config/constants.js';
export class Owner extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.facilities = [];
        this.licenses = [];
        this.phoneNumbers = [];
        this.properties = properties;
    }
    /**
     * Create a new Owner entity
     *
     * @param properties The owner properties
     * @param typeId The owner type ID
     * @returns The created owner entity
     */
    static create(properties, typeId) {
        return new Owner(null, `Owner`, properties);
    }
    /**
     * Add a facility to this owner
     *
     * @param facility The facility entity
     */
    addFacility(facility) {
        this.facilities.push(facility);
    }
    /**
     * Add a license to this owner
     *
     * @param license The license entity
     */
    addLicense(license) {
        this.licenses.push(license);
    }
    /**
     * Add a phone number to this owner
     *
     * @param phoneNumber The phone number entity
     */
    addPhoneNumber(phoneNumber) {
        this.phoneNumbers.push(phoneNumber);
    }
    /**
     * Generate the operations to create this owner entity and its relations
     *
     * @param ownerTypeId The owner type ID
     * @param ownsFacilityRelationTypeId The "Owns Facility" relation type ID
     * @param holdsLicenseRelationTypeId The "Holds License" relation type ID
     * @param hasPhoneRelationTypeId The "Has Phone" relation type ID
     * @returns The operations to create this owner entity and its relations
     */
    generateOps(ownerTypeId, ownsFacilityRelationTypeId, holdsLicenseRelationTypeId, hasPhoneRelationTypeId) {
        const ops = [];
        // Create the owner entity
        const { id: ownerId, ops: ownerOps } = Graph.createEntity({
            name: this.name,
            types: [ownerTypeId],
            properties: {
                ...(this.properties.alternativeContactNumber && {
                    [PropertyIds.ALTERNATIVE_CONTACT_NUMBER]: {
                        type: 'TEXT',
                        value: this.properties.alternativeContactNumber,
                    },
                }),
            },
        });
        // Set the ID of this owner entity
        this.id = ownerId;
        ops.push(...ownerOps);
        // Add relationships to facilities
        for (const facility of this.facilities) {
            if (facility.getId()) {
                const { ops: facilityRelationOps } = Graph.createRelation({
                    fromId: ownerId,
                    toId: facility.getId(),
                    relationTypeId: ownsFacilityRelationTypeId,
                });
                ops.push(...facilityRelationOps);
            }
        }
        // Add relationships to licenses
        for (const license of this.licenses) {
            if (license.getId()) {
                const { ops: licenseRelationOps } = Graph.createRelation({
                    fromId: ownerId,
                    toId: license.getId(),
                    relationTypeId: holdsLicenseRelationTypeId,
                });
                ops.push(...licenseRelationOps);
            }
        }
        // Add relationships to phone numbers
        for (const phoneNumber of this.phoneNumbers) {
            if (phoneNumber.getId()) {
                const { ops: phoneRelationOps } = Graph.createRelation({
                    fromId: ownerId,
                    toId: phoneNumber.getId(),
                    relationTypeId: hasPhoneRelationTypeId,
                });
                ops.push(...phoneRelationOps);
            }
        }
        return ops;
    }
}
//# sourceMappingURL=owner.js.map