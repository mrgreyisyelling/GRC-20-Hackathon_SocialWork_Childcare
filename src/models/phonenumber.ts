/**
 * PhoneNumber Model
 * 
 * This file defines the PhoneNumber model for the GRC-20 publisher.
 * It implements the relationship-based data model for phone number entities.
 */

import { BaseModel } from './base-model.js';
import { Owner } from './owner.js';
import { Facility } from './facility.js';
import { Business } from './business.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';

export interface PhoneNumberProperties {
  number: string;
}

export class PhoneNumber extends BaseModel {
  private properties: PhoneNumberProperties;
  private owners: Owner[] = [];
  private facilities: Facility[] = [];
  private businesses: Business[] = [];

  constructor(
    id: string | null,
    name: string,
    properties: PhoneNumberProperties
  ) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new PhoneNumber entity
   * 
   * @param properties The phone number properties
   * @param typeId The phone number type ID
   * @returns The created phone number entity
   */
  static create(properties: PhoneNumberProperties, typeId: string): PhoneNumber {
    return new PhoneNumber(null, `Phone ${properties.number}`, properties);
  }

  /**
   * Add an owner to this phone number
   * 
   * @param owner The owner entity
   */
  addOwner(owner: Owner): void {
    this.owners.push(owner);
  }

  /**
   * Add a facility to this phone number
   * 
   * @param facility The facility entity
   */
  addFacility(facility: Facility): void {
    this.facilities.push(facility);
  }

  /**
   * Add a business to this phone number
   * 
   * @param business The business entity
   */
  addBusiness(business: Business): void {
    this.businesses.push(business);
  }

  /**
   * Generate the operations to create this phone number entity and its relations
   * 
   * @param phoneNumberTypeId The phone number type ID
   * @param usedByRelationTypeId The "Used By" relation type ID
   * @returns The operations to create this phone number entity and its relations
   */
  generateOps(
    phoneNumberTypeId: string,
    usedByRelationTypeId: string
  ): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the phone number entity
    const { id: phoneNumberId, ops: phoneNumberOps } = Graph.createEntity({
      name: this.name,
      types: [phoneNumberTypeId],
      properties: {
        [PropertyIds.PHONE_NUMBER]: {
          type: 'TEXT',
          value: this.properties.number,
        },
      },
    });

    // Set the ID of this phone number entity
    this.id = phoneNumberId;
    ops.push(...phoneNumberOps);

    // Add relationships to owners
    for (const owner of this.owners) {
      if (owner.getId()) {
        const { ops: ownerRelationOps } = Graph.createRelation({
          fromId: phoneNumberId,
          toId: owner.getId()!,
          relationTypeId: usedByRelationTypeId,
        });
        ops.push(...ownerRelationOps);
      }
    }

    // Add relationships to facilities
    for (const facility of this.facilities) {
      if (facility.getId()) {
        const { ops: facilityRelationOps } = Graph.createRelation({
          fromId: phoneNumberId,
          toId: facility.getId()!,
          relationTypeId: usedByRelationTypeId,
        });
        ops.push(...facilityRelationOps);
      }
    }

    // Add relationships to businesses
    for (const business of this.businesses) {
      if (business.getId()) {
        const { ops: businessRelationOps } = Graph.createRelation({
          fromId: phoneNumberId,
          toId: business.getId()!,
          relationTypeId: usedByRelationTypeId,
        });
        ops.push(...businessRelationOps);
      }
    }

    return ops;
  }
}
