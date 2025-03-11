/**
 * Schedule Model
 * 
 * This file defines the Schedule model for the GRC-20 publisher.
 * It implements the relationship-based data model for schedule entities.
 */

import { BaseModel } from './base-model.js';
import { ScheduleEntry } from './ScheduleEntry.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';

export interface ScheduleProperties {
  scheduleName: string;
}

export class Schedule extends BaseModel {
  private properties: ScheduleProperties;
  private scheduleEntries: ScheduleEntry[] = [];

  constructor(
    id: string | null,
    name: string,
    properties: ScheduleProperties
  ) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new Schedule entity
   * 
   * @param properties The schedule properties
   * @param typeId The schedule type ID
   * @returns The created schedule entity
   */
  static create(properties: ScheduleProperties, typeId: string): Schedule {
    const name = `Schedule: ${properties.scheduleName}`;
    return new Schedule(null, name, properties);
  }

  /**
   * Add a schedule entry to this schedule
   * 
   * @param entry The schedule entry entity
   */
  addScheduleEntry(entry: ScheduleEntry): void {
    this.scheduleEntries.push(entry);
  }

  /**
   * Generate the operations to create this schedule entity and its relations
   * 
   * @param scheduleTypeId The schedule type ID
   * @returns The operations to create this schedule entity and its relations
   */
  generateOps(scheduleTypeId: string): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the schedule entity
    const { id: scheduleId, ops: scheduleOps } = Graph.createEntity({
      name: this.name,
      types: [scheduleTypeId],
      properties: {
        [PropertyIds.SCHEDULE_NAME]: {
          type: 'TEXT',
          value: this.properties.scheduleName,
        },
      },
    });

    // Set the ID of this schedule entity
    this.id = scheduleId;
    ops.push(...scheduleOps);

    // Add relationships to schedule entries if they exist
    for (const entry of this.scheduleEntries) {
      if (entry.getId()) {
        const { ops: entryRelationOps } = Graph.createRelation({
          fromId: scheduleId,
          toId: entry.getId()!,
          relationTypeId: RelationTypeIds.HAS_OPERATION_HOURS,
        });
        ops.push(...entryRelationOps);
      }
    }

    return ops;
  }
}
