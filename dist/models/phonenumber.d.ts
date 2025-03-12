/**
 * PhoneNumber Model
 *
 * This file defines the PhoneNumber model for the GRC-20 publisher.
 * It implements the relationship-based data model for phone number entities.
 */
import { BaseModel } from './base-model.js';
import { Owner } from './owner.js';
import { Facility } from './facility.js';
import { EntityOp } from '../core/graph.js';
export interface PhoneNumberProperties {
    number: string;
}
export declare class PhoneNumber extends BaseModel {
    private properties;
    private owners;
    private facilities;
    constructor(id: string | null, name: string, properties: PhoneNumberProperties);
    /**
     * Create a new PhoneNumber entity
     *
     * @param properties The phone number properties
     * @param typeId The phone number type ID
     * @returns The created phone number entity
     */
    static create(properties: PhoneNumberProperties, typeId: string): PhoneNumber;
    /**
     * Add an owner to this phone number
     *
     * @param owner The owner entity
     */
    addOwner(owner: Owner): void;
    /**
     * Add a facility to this phone number
     *
     * @param facility The facility entity
     */
    addFacility(facility: Facility): void;
    /**
     * Generate the operations to create this phone number entity and its relations
     *
     * @param phoneNumberTypeId The phone number type ID
     * @param usedByRelationTypeId The "Used By" relation type ID
     * @returns The operations to create this phone number entity and its relations
     */
    generateOps(phoneNumberTypeId: string, usedByRelationTypeId: string): EntityOp[];
}
