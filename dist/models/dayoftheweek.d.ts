/**
 * DayOfWeek Model
 *
 * This file defines the DayOfWeek model for the GRC-20 publisher.
 * It implements the relationship-based data model for days of the week.
 */
import { BaseModel } from './base-model.js';
import { EntityOp } from 'core/graph.js';
export interface DayOfWeekProperties {
    day: string;
}
export declare class DayOfWeek extends BaseModel {
    private properties;
    constructor(id: string | null, name: string, properties: DayOfWeekProperties);
    /**
     * Create a new DayOfWeek entity
     *
     * @param properties The day of the week properties
     * @param typeId The day of the week type ID
     * @returns The created day of the week entity
     */
    static create(properties: DayOfWeekProperties, typeId: string): DayOfWeek;
    /**
     * Generate the operations to create this day of the week entity
     *
     * @param dayOfWeekTypeId The day of the week type ID
     * @returns The operations to create this entity
     */
    generateOps(dayOfWeekTypeId: string): EntityOp[];
    /**
     * Get the day name of this entity
     *
     * @returns The day name
     */
    getDay(): string;
}
