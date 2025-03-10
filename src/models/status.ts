/**
 * Status Model
 * 
 * This file defines the Status model for the GRC-20 publisher.
 * It implements the relationship-based data model for status entities.
 */

import { BaseModel } from './base-model.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';

export interface StatusProperties {
  status: string; // Example: "Open", "Closed", "Pending", "Inactive"
}

export class Status extends BaseModel {
  private properties: StatusProperties;
  private scheduleEntryId?: string; // Relates Status to a ScheduleEntry

  constructor(id: string | null, name: string, properties: StatusProperties) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new Status entity
   * 
   * @param properties The status properties
   * @param typeId The status type ID
   * @returns The created status entity
   */
  static create(properties: StatusProperties, typeId: string): Status {
    return new Status(null, `Status: ${properties.status}`, properties);
  }

  /**
   * Set the schedule entry associated with this status
   * 
   * @param scheduleEntryId The ID of the schedule entry entity
   */
  setScheduleEntry(scheduleEntryId: string): void {
    this.scheduleEntryId = scheduleEntryId;
  }

  /**
   * Generate the operations to create this status entity and its relationships
   * 
   * @param statusTypeId The status type ID
   * @param usedInRelationTypeId The relation type ID for "USED_IN"
   * @returns The operations to create this entity and its relationships
   */
  generateOps(statusTypeId: string, usedInRelationTypeId: string): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the Status entity
    const { id: statusId, ops: statusOps } = Graph.createEntity({
      name: this.name,
      types: [statusTypeId],
      properties: {
        [PropertyIds.STATUS_LABEL]: {
          type: 'TEXT',
          value: this.properties.status,
        },
      },
    });

    // Set the ID of this entity
    this.id = statusId;
    ops.push(...statusOps);

    // Create relation to ScheduleEntry entity
    if (this.scheduleEntryId) {
      const { ops: usedInOps } = Graph.createRelation({
        fromId: statusId,
        toId: this.scheduleEntryId,
        relationTypeId: usedInRelationTypeId,
      });
      ops.push(...usedInOps);
    }

    return ops;
  }

  /**
   * Get the status label of this entity
   * 
   * @returns The status label
   */
  getStatus(): string {
    return this.properties.status;
  }
}
