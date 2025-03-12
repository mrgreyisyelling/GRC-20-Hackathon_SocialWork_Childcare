/**
 * LicenseType Model
 *
 * This file defines the LicenseType model for the GRC-20 publisher.
 * It implements the relationship-based data model for license type entities.
 */
import { BaseModel } from './base-model.js';
import { EntityOp } from '../core/graph.js';
export interface LicenseTypeProperties {
    name: string;
}
export declare class LicenseType extends BaseModel {
    private properties;
    constructor(id: string | null, name: string, properties: LicenseTypeProperties);
    /**
     * Create a new LicenseType entity
     *
     * @param properties The license type properties
     * @param typeId The license type ID
     * @returns The created license type entity
     */
    static create(properties: LicenseTypeProperties, typeId: string): LicenseType;
    /**
     * Generate the operations to create this license type entity
     *
     * @param licenseTypeId The license type ID
     * @returns The operations to create this license type entity
     */
    generateOps(licenseTypeId: string): EntityOp[];
}
