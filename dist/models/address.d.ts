/**
 * Address Model
 *
 * This file defines the Address model for the GRC-20 publisher.
 * It implements the relationship-based data model for address entities.
 */
import { BaseModel } from './base-model.js';
import { Location } from './location.js';
import { EntityOp } from '../core/graph.js';
export interface AddressProperties {
    fullAddress: string;
}
export declare class Address extends BaseModel {
    private properties;
    private location?;
    constructor(id: string | null, name: string, properties: AddressProperties);
    /**
     * Create a new Address entity
     *
     * @param properties The address properties
     * @param typeId The address type ID
     * @returns The created address entity
     */
    static create(properties: AddressProperties, typeId: string): Address;
    /**
     * Set the location for this address
     *
     * @param location The location entity
     */
    setLocation(location: Location): void;
    /**
     * Generate the operations to create this address entity and its relations
     *
     * @param addressTypeId The address type ID
     * @param locationRelationTypeId The location relation type ID
     * @returns The operations to create this address entity and its relations
     */
    generateOps(addressTypeId: string, locationRelationTypeId: string): EntityOp[];
}
