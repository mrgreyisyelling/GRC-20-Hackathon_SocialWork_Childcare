/**
 * Schedule Model
 *
 * This file defines the Schedule model for the GRC-20 publisher.
 * It implements the relationship-based data model for schedule entities.
 */
import { BaseModel } from './base-model.js';
import { ScheduleEntry } from './ScheduleEntry.js';
import { EntityOp } from '../core/graph.js';
export interface ScheduleProperties {
    scheduleName: string;
}
export declare class Schedule extends BaseModel {
    private properties;
    private scheduleEntries;
    constructor(id: string | null, name: string, properties: ScheduleProperties);
    /**
     * Create a new Schedule entity
     *
     * @param properties The schedule properties
     * @param typeId The schedule type ID
     * @returns The created schedule entity
     */
    static create(properties: ScheduleProperties, typeId: string): Schedule;
    /**
     * Add a schedule entry to this schedule
     *
     * @param entry The schedule entry entity
     */
    addScheduleEntry(entry: ScheduleEntry): void;
    /**
     * Generate the operations to create this schedule entity and its relations
     *
     * @param scheduleTypeId The schedule type ID
     * @returns The operations to create this schedule entity and its relations
     */
    generateOps(scheduleTypeId: string): EntityOp[];
}
