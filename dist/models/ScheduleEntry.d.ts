/**
 * Schedule Entry Model
 *
 * This file defines the ScheduleEntry model for the GRC-20 publisher.
 * It implements the relationship-based data model for schedule-related entities.
 */
import { BaseModel } from 'models/base-model.js';
import { DayOfWeek } from 'models/dayoftheweek.js';
import { Time } from 'models/time.js';
import { Status } from 'models/status.js';
import { EntityOp } from 'core/graph.js';
export interface ScheduleEntryProperties {
    day: string;
    openTime: string;
    closeTime: string;
    status?: string;
}
export declare class ScheduleEntry extends BaseModel {
    private properties;
    private dayOfWeek?;
    private openTime?;
    private closeTime?;
    private status?;
    constructor(id: string | null, name: string, properties: ScheduleEntryProperties);
    /**
     * Create a new ScheduleEntry entity
     *
     * @param properties The schedule entry properties
     * @param typeId The schedule entry type ID
     * @returns The created schedule entry entity
     */
    static create(properties: ScheduleEntryProperties, typeId: string): ScheduleEntry;
    /**
     * Set the day of the week for this schedule entry
     *
     * @param dayOfWeek The DayOfWeek entity
     */
    setDayOfWeek(dayOfWeek: DayOfWeek): void;
    /**
     * Set the open time for this schedule entry
     *
     * @param openTime The Time entity
     */
    setOpenTime(openTime: Time): void;
    /**
     * Set the close time for this schedule entry
     *
     * @param closeTime The Time entity
     */
    setCloseTime(closeTime: Time): void;
    /**
     * Set the status for this schedule entry
     *
     * @param status The Status entity
     */
    setStatus(status: Status): void;
    /**
     * Generate the operations to create this schedule entry entity and its relations
     *
     * @param scheduleEntryTypeId The schedule entry type ID
     * @param dayOfWeekRelationTypeId The day of the week relation type ID
     * @param openTimeRelationTypeId The open time relation type ID
     * @param closeTimeRelationTypeId The close time relation type ID
     * @param statusRelationTypeId The status relation type ID
     * @returns The operations to create this schedule entry entity and its relations
     */
    generateOps(scheduleEntryTypeId: string, dayOfWeekRelationTypeId: string, openTimeRelationTypeId: string, closeTimeRelationTypeId: string, statusRelationTypeId: string): EntityOp[];
}
