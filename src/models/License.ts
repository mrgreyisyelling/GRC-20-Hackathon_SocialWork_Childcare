/**
 * License Model
 * 
 * This file defines the License model for the GRC-20 publisher.
 * It implements the relationship-based data model for license entities.
 */

import { BaseModel } from './base-model.js';
import { Facility } from './facility.js';
import { LicenseType } from './license-type.js';
import { DateEntity } from './date.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';

export interface LicenseProperties {
  licenseNumber: string;
  dateOriginallyLicensed?: string;
}

export class License extends BaseModel {
  private properties: LicenseProperties;
  private facility?: Facility;
  private licenseType?: LicenseType;
  private issueDate?: DateEntity;
  private expiryDate?: DateEntity;

  constructor(
    id: string | null,
    name: string,
    properties: LicenseProperties
  ) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new License entity
   * 
   * @param properties The license properties
   * @param typeId The license type ID
   * @returns The created license entity
   */
  static create(properties: LicenseProperties, typeId: string): License {
    const name = `License #${properties.licenseNumber}`;
    return new License(null, name, properties);
  }

  /**
   * Set the facility for this license
   * 
   * @param facility The facility entity
   */
  setFacility(facility: Facility): void {
    this.facility = facility;
  }

  /**
   * Set the license type for this license
   * 
   * @param licenseType The license type entity
   */
  setLicenseType(licenseType: LicenseType): void {
    this.licenseType = licenseType;
  }

  /**
   * Set the issue date for this license
   * 
   * @param issueDate The issue date entity
   */
  setIssueDate(issueDate: DateEntity): void {
    this.issueDate = issueDate;
  }

  /**
   * Set the expiry date for this license
   * 
   * @param expiryDate The expiry date entity
   */
  setExpiryDate(expiryDate: DateEntity): void {
    this.expiryDate = expiryDate;
  }

  /**
   * Generate the operations to create this license entity and its relations
   * 
   * @param licenseTypeId The license type ID
   * @returns The operations to create this license entity and its relations
   */
  generateOps(licenseTypeId: string): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the license entity
    const { id: licenseId, ops: licenseOps } = Graph.createEntity({
      name: this.name,
      types: [licenseTypeId],
      properties: {
        [PropertyIds.LICENSE_NUMBER]: {
          type: 'TEXT',
          value: this.properties.licenseNumber,
        },
        ...(this.properties.dateOriginallyLicensed && {
          [PropertyIds.DATE_ORIGINALLY_LICENSED]: {
            type: 'TEXT',
            value: this.properties.dateOriginallyLicensed,
          },
        }),
      },
    });

    // Set the ID of this license entity
    this.id = licenseId;
    ops.push(...licenseOps);

    // Add relations to Facility, LicenseType, Issue Date, and Expiry Date if they exist
    if (this.facility && this.facility.getId()) {
      const { ops: facilityRelationOps } = Graph.createRelation({
        fromId: licenseId,
        toId: this.facility.getId()!,
        relationTypeId: RelationTypeIds.GRANTED_TO,
      });
      ops.push(...facilityRelationOps);
    }

    if (this.licenseType && this.licenseType.getId()) {
      const { ops: licenseTypeRelationOps } = Graph.createRelation({
        fromId: licenseId,
        toId: this.licenseType.getId()!,
        relationTypeId: RelationTypeIds.HAS_TYPE,
      });
      ops.push(...licenseTypeRelationOps);
    }

