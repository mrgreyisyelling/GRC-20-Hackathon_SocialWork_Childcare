/**
 * Owner Model
 *
 * This file defines the Owner model for the GRC-20 publisher.
 * It implements the relationship-based data model for owner entities.
 */
import { BaseModel } from './base-model.js';
import { Facility } from './facility.js';
import { License } from './license.js';
import { PhoneNumber } from './phonenumber.js';
import { EntityOp } from '../core/graph.js';
export interface OwnerProperties {
    alternativeContactNumber?: string;
}
export declare class Owner extends BaseModel {
    private properties;
    private facilities;
    private licenses;
    private phoneNumbers;
    constructor(id: string | null, name: string, properties: OwnerProperties);
    /**
     * Create a new Owner entity
     *
     * @param properties The owner properties
     * @param typeId The owner type ID
     * @returns The created owner entity
     */
    static create(properties: OwnerProperties, typeId: string): Owner;
    /**
     * Add a facility to this owner
     *
     * @param facility The facility entity
     */
    addFacility(facility: Facility): void;
    /**
     * Add a license to this owner
     *
     * @param license The license entity
     */
    addLicense(license: License): void;
    /**
     * Add a phone number to this owner
     *
     * @param phoneNumber The phone number entity
     */
    addPhoneNumber(phoneNumber: PhoneNumber): void;
    /**
     * Generate the operations to create this owner entity and its relations
     *
     * @param ownerTypeId The owner type ID
     * @param ownsFacilityRelationTypeId The "Owns Facility" relation type ID
     * @param holdsLicenseRelationTypeId The "Holds License" relation type ID
     * @param hasPhoneRelationTypeId The "Has Phone" relation type ID
     * @returns The operations to create this owner entity and its relations
     */
    generateOps(ownerTypeId: string, ownsFacilityRelationTypeId: string, holdsLicenseRelationTypeId: string, hasPhoneRelationTypeId: string): EntityOp[];
}
