/**
 * Date Model
 *
 * This file defines the Date model for the GRC-20 publisher.
 * It implements the relationship-based data model for date-related entities.
 */
import { BaseModel } from './base-model.js';
import { EntityOp } from '../core/graph.js';
export interface DateProperties {
    dateValue: string;
}
export declare class DateEntity extends BaseModel {
    private properties;
    constructor(id: string | null, name: string, properties: DateProperties);
    /**
     * Create a new Date entity
     *
     * @param properties The date properties
     * @param typeId The date type ID
     * @returns The created date entity
     */
    static create(properties: DateProperties, typeId: string): DateEntity;
    /**
     * Generate the operations to create this date entity
     *
     * @param dateTypeId The date type ID
     * @returns The operations to create this date entity
     */
    generateOps(dateTypeId: string): EntityOp[];
}
