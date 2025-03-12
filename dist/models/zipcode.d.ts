/**
 * ZipCode Model
 *
 * This file defines the ZipCode model for the GRC-20 publisher.
 * It implements the relationship-based data model for zip code entities.
 */
import { BaseModel } from './base-model.js';
import { City } from './city.js';
import { State } from './state.js';
import { EntityOp } from '../core/graph.js';
export interface ZipCodeProperties {
    zipCode: string;
}
export declare class ZipCode extends BaseModel {
    private properties;
    private city?;
    private state?;
    constructor(id: string | null, name: string, properties: ZipCodeProperties);
    /**
     * Create a new ZipCode entity
     *
     * @param properties The zip code properties
     * @param typeId The zip code type ID
     * @returns The created zip code entity
     */
    static create(properties: ZipCodeProperties, typeId: string): ZipCode;
    /**
     * Set the city for this zip code
     *
     * @param city The city entity
     */
    setCity(city: City): void;
    /**
     * Set the state for this zip code
     *
     * @param state The state entity
     */
    setState(state: State): void;
    /**
     * Generate the operations to create this zip code entity and its relations
     *
     * @param zipCodeTypeId The zip code type ID
     * @param cityRelationTypeId The city relation type ID
     * @param stateRelationTypeId The state relation type ID
     * @returns The operations to create this zip code entity and its relations
     */
    generateOps(zipCodeTypeId: string, cityRelationTypeId: string, stateRelationTypeId: string): EntityOp[];
}
