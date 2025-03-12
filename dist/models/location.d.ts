/**
 * Location Model
 *
 * This file defines the Location model for the GRC-20 publisher.
 * It implements the relationship-based data model for location entities.
 */
import { BaseModel } from './base-model.js';
import { City } from './city.js';
import { State } from './state.js';
import { ZipCode } from './zipcode.js';
import { Address } from './address.js';
import { TimeZone } from './timezone.js';
import { EntityOp } from '../core/graph.js';
export interface LocationProperties {
}
export declare class Location extends BaseModel {
    private properties;
    private city?;
    private state?;
    private zipCode?;
    private address?;
    private timeZone?;
    constructor(id: string | null, name: string, properties: LocationProperties);
    /**
     * Create a new Location entity
     *
     * @param typeId The location type ID
     * @returns The created location entity
     */
    static create(typeId: string): Location;
    /**
     * Set the city for this location
     *
     * @param city The city entity
     */
    setCity(city: City): void;
    /**
     * Set the state for this location
     *
     * @param state The state entity
     */
    setState(state: State): void;
    /**
     * Set the zip code for this location
     *
     * @param zipCode The zip code entity
     */
    setZipCode(zipCode: ZipCode): void;
    /**
     * Set the address for this location
     *
     * @param address The address entity
     */
    setAddress(address: Address): void;
    /**
     * Set the time zone for this location
     *
     * @param timeZone The time zone entity
     */
    setTimeZone(timeZone: TimeZone): void;
    /**
     * Generate the operations to create this location entity and its relations
     *
     * @param locationTypeId The location type ID
     * @returns The operations to create this location entity and its relations
     */
    generateOps(locationTypeId: string): EntityOp[];
}
