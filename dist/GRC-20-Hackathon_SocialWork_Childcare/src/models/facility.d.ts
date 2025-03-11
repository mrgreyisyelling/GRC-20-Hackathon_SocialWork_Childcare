/**
 * Facility Model
 *
 * This file defines the Facility model for the GRC-20 publisher.
 * It implements the relationship-based data model for childcare facilities.
 */
import { BaseModel } from './base-model.js';
import { Owner } from './owner.js';
import { Location } from './location.js';
import { License } from './license.js';
import { SchoolDistrict } from './schooldistrict.js';
import { Schedule } from './schedule.js';
import { EntityOp } from '../core/graph.js';
export interface FacilityProperties {
    facilityName: string;
    facilityStatus?: string;
    facilityType?: string;
    acceptsSubsidies?: boolean;
}
export declare class Facility extends BaseModel {
    private properties;
    private location?;
    private owner?;
    private license?;
    private schoolDistrict?;
    private schedule?;
    constructor(id: string | null, name: string, properties: FacilityProperties);
    /**
     * Create a new Facility entity
     *
     * @param properties The facility properties
     * @param typeId The facility type ID
     * @returns The created facility entity
     */
    static create(properties: FacilityProperties, typeId: string): Facility;
    /**
     * Set the location for this facility
     *
     * @param location The location entity
     */
    setLocation(location: Location): void;
    /**
     * Set the owner for this facility
     *
     * @param owner The owner entity
     */
    setOwner(owner: Owner): void;
    /**
     * Set the license for this facility
     *
     * @param license The license entity
     */
    setLicense(license: License): void;
    /**
     * Set the school district for this facility
     *
     * @param schoolDistrict The school district entity
     */
    setSchoolDistrict(schoolDistrict: SchoolDistrict): void;
    /**
     * Set the schedule for this facility
     *
     * @param schedule The schedule entity
     */
    setSchedule(schedule: Schedule): void;
    /**
     * Generate the operations to create this facility entity and its relations
     *
     * @param facilityTypeId The facility type ID
     * @returns The operations to create this facility entity and its relations
     */
    generateOps(facilityTypeId: string): EntityOp[];
    /**
     * Get the facility name
     *
     * @returns The facility name
     */
    getFacilityName(): string;
    /**
     * Generate operations to update the name of this facility
     *
     * @returns The operations to update the name
     */
    generateNameUpdateOps(): EntityOp[];
}
