/**
 * License Model
 *
 * This file defines the License model for the GRC-20 publisher.
 * It implements the relationship-based data model for license entities.
 */
import { BaseModel } from './base-model.js';
import { Facility } from './facility.js';
import { LicenseType } from './licenseType.js';
import { DateEntity } from './date.js';
import { EntityOp } from '../core/graph.js';
export interface LicenseProperties {
    licenseNumber: string;
    dateOriginallyLicensed?: string;
    issueDate?: string;
    expiryDate?: string;
}
export declare class License extends BaseModel {
    private properties;
    private facility?;
    private licenseType?;
    private issueDate?;
    private expiryDate?;
    constructor(id: string | null, name: string, properties: LicenseProperties);
    /**
     * Create a new License entity
     *
     * @param properties The license properties
     * @param typeId The license type ID
     * @returns The created license entity
     */
    static create(properties: LicenseProperties, typeId: string): License;
    /**
     * Set the facility associated with this license
     *
     * @param facility The facility entity
     */
    setFacility(facility: Facility): void;
    /**
     * Set the license type
     *
     * @param licenseType The license type entity
     */
    setLicenseType(licenseType: LicenseType): void;
    /**
     * Set the issue date for the license
     *
     * @param issueDate The issue date entity
     */
    setIssueDate(issueDate: DateEntity): void;
    /**
     * Set the expiry date for the license
     *
     * @param expiryDate The expiry date entity
     */
    setExpiryDate(expiryDate: DateEntity): void;
    /**
     * Generate the operations to create this license entity and its relations
     *
     * @param licenseTypeId The license type ID
     * @param grantedToRelationTypeId The "Granted To" relation type ID
     * @param hasTypeRelationTypeId The "Has Type" relation type ID
     * @param issuedOnRelationTypeId The "Issued On" relation type ID
     * @param expiresOnRelationTypeId The "Expires On" relation type ID
     * @returns The operations to create this license entity and its relations
     */
    generateOps(licenseTypeId: string, grantedToRelationTypeId: string, hasTypeRelationTypeId: string, issuedOnRelationTypeId: string, expiresOnRelationTypeId: string): EntityOp[];
}
