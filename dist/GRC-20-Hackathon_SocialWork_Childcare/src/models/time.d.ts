/**
 * Time Model
 *
 * This file defines the Time model for the GRC-20 publisher.
 * It implements the relationship-based data model for time entities.
 */
import { BaseModel } from './base-model.js';
import { EntityOp } from '../core/graph.js';
export interface TimeProperties {
    timeValue: string;
}
export declare class Time extends BaseModel {
    private properties;
    constructor(id: string | null, name: string, properties: TimeProperties);
    /**
     * Create a new Time entity
     *
     * @param properties The time properties
     * @param typeId The time type ID
     * @returns The created time entity
     */
    static create(properties: TimeProperties, typeId: string): Time;
    /**
     * Generate the operations to create this time entity
     *
     * @param timeTypeId The time type ID
     * @returns The operations to create this entity
     */
    generateOps(timeTypeId: string): EntityOp[];
    /**
     * Get the time value of this entity
     *
     * @returns The time value
     */
    getTimeValue(): string;
}
