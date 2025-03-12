/**
 * School District Model
 *
 * This file defines the SchoolDistrict model for the GRC-20 publisher.
 * It implements the relationship-based data model for school district entities.
 */
import { BaseModel } from './base-model.js';
import { Facility } from './facility.js';
import { EntityOp } from '../core/graph.js';
export interface SchoolDistrictProperties {
    districtName: string;
}
export declare class SchoolDistrict extends BaseModel {
    private properties;
    private facilities;
    constructor(id: string | null, name: string, properties: SchoolDistrictProperties);
    /**
     * Create a new School District entity
     *
     * @param properties The school district properties
     * @param typeId The school district type ID
     * @returns The created school district entity
     */
    static create(properties: SchoolDistrictProperties, typeId: string): SchoolDistrict;
    /**
     * Add a facility to this school district
     *
     * @param facility The facility entity
     */
    addFacility(facility: Facility): void;
    /**
     * Generate the operations to create this school district entity and its relations
     *
     * @param schoolDistrictTypeId The school district type ID
     * @returns The operations to create this school district entity and its relations
     */
    generateOps(schoolDistrictTypeId: string): EntityOp[];
}
