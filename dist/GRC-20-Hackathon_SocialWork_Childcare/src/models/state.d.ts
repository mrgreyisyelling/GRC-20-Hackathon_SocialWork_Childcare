/**
 * State Model
 *
 * This file defines the State model for the GRC-20 publisher.
 * It implements the relationship-based data model for state entities.
 */
import { BaseModel } from './base-model.js';
import { EntityOp } from '../core/graph.js';
export interface StateProperties {
    name: string;
}
export declare class State extends BaseModel {
    private properties;
    constructor(id: string | null, name: string, properties: StateProperties);
    /**
     * Create a new State entity
     *
     * @param properties The state properties
     * @param typeId The state type ID
     * @returns The created state entity
     */
    static create(properties: StateProperties, typeId: string): State;
    /**
     * Generate the operations to create this state entity
     *
     * @param stateTypeId The state type ID
     * @returns The operations to create this state entity
     */
    generateOps(stateTypeId: string): EntityOp[];
}
