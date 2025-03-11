/**
 * Status Model
 *
 * This file defines the Status model for the GRC-20 publisher.
 * It implements the relationship-based data model for status entities.
 */
import { BaseModel } from './base-model.js';
import { EntityOp } from '../core/graph.js';
export interface StatusProperties {
    status: string;
}
export declare class Status extends BaseModel {
    private properties;
    private scheduleEntryId?;
    constructor(id: string | null, name: string, properties: StatusProperties);
    /**
     * Create a new Status entity
     *
     * @param properties The status properties
     * @param typeId The status type ID
     * @returns The created status entity
     */
    static create(properties: StatusProperties, typeId: string): Status;
    /**
     * Set the schedule entry associated with this status
     *
     * @param scheduleEntryId The ID of the schedule entry entity
     */
    setScheduleEntry(scheduleEntryId: string): void;
    /**
     * Generate the operations to create this status entity and its relationships
     *
     * @param statusTypeId The status type ID
     * @param usedInRelationTypeId The relation type ID for "USED_IN"
     * @returns The operations to create this entity and its relationships
     */
    generateOps(statusTypeId: string, usedInRelationTypeId: string): EntityOp[];
    /**
     * Get the status label of this entity
     *
     * @returns The status label
     */
    getStatus(): string;
}
