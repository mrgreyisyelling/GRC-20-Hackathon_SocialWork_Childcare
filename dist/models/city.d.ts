/**
 * City Model
 *
 * This file defines the City model for the GRC-20 publisher.
 * It implements the relationship-based data model for city entities.
 */
import { BaseModel } from './base-model.js';
import { State } from './state.js';
import { EntityOp } from '../core/graph.js';
export interface CityProperties {
    name: string;
}
export declare class City extends BaseModel {
    private properties;
    private state?;
    constructor(id: string | null, name: string, properties: CityProperties);
    /**
     * Create a new City entity
     *
     * @param properties The city properties
     * @param typeId The city type ID
     * @returns The created city entity
     */
    static create(properties: CityProperties, typeId: string): City;
    /**
     * Set the state for this city
     *
     * @param state The state entity
     */
    setState(state: State): void;
    /**
     * Generate the operations to create this city entity and its relations
     *
     * @param cityTypeId The city type ID
     * @param inStateRelationTypeId The relation type ID for cities being in a state
     * @returns The operations to create this city entity and its relations
     */
    generateOps(cityTypeId: string, inStateRelationTypeId: string): EntityOp[];
}
