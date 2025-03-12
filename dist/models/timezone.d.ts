/**
 * TimeZone Model
 *
 * This file defines the TimeZone model for the GRC-20 publisher.
 * It implements the relationship-based data model for time zone entities.
 */
import { BaseModel } from './base-model.js';
import { Location } from './location.js';
import { EntityOp } from '../core/graph.js';
export interface TimeZoneProperties {
    name: string;
}
export declare class TimeZone extends BaseModel {
    private properties;
    private location?;
    constructor(id: string | null, name: string, properties: TimeZoneProperties);
    /**
     * Create a new TimeZone entity
     *
     * @param properties The time zone properties
     * @param typeId The time zone type ID
     * @returns The created time zone entity
     */
    static create(properties: TimeZoneProperties, typeId: string): TimeZone;
    /**
     * Set the location for this time zone
     *
     * @param location The location entity
     */
    setLocation(location: Location): void;
    /**
     * Generate the operations to create this time zone entity and its relations
     *
     * @param timeZoneTypeId The time zone type ID
     * @param locationRelationTypeId The location relation type ID
     * @returns The operations to create this time zone entity and its relations
     */
    generateOps(timeZoneTypeId: string, locationRelationTypeId: string): EntityOp[];
}
