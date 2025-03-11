/**
 * BirthYear Model
 *
 * This file defines the BirthYear model for the GRC-20 publisher.
 * It implements the relationship-based data model for birth year entities.
 */
import { BaseModel } from './base-model.js';
import { EntityOp } from '../core/graph.js';
export interface BirthYearProperties {
    year: string;
}
export declare class BirthYear extends BaseModel {
    private properties;
    private personId?;
    constructor(id: string | null, name: string, properties: BirthYearProperties);
    /**
     * Create a new BirthYear entity
     *
     * @param properties The birth year properties
     * @param typeId The birth year type ID
     * @returns The created birth year entity
     */
    static create(properties: BirthYearProperties, typeId: string): BirthYear;
    /**
     * Set the person associated with this birth year
     *
     * @param personId The ID of the person entity
     */
    setPerson(personId: string): void;
    /**
     * Generate the operations to create this birth year entity and its relationships
     *
     * @param birthYearTypeId The birth year type ID
     * @param bornInRelationTypeId The relation type ID for "BORN_IN"
     * @returns The operations to create this entity and its relationships
     */
    generateOps(birthYearTypeId: string, bornInRelationTypeId: string): EntityOp[];
    /**
     * Get the birth year value of this entity
     *
     * @returns The birth year value
     */
    getYear(): string;
}
