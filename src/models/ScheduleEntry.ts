/**
 * Schedule Entry Model
 * 
 * This file defines the ScheduleEntry model for the GRC-20 publisher.
 * It implements the relationship-based data model for schedule-related entities.
 */

import { BaseModel } from 'models/base-model.js';
import { DayOfWeek } from 'models/dayoftheweek.js';
import { Time } from 'models/time.js';
import { Status } from 'models/status.js';
import { Graph, EntityOp } from 'core/graph.js';
import { PropertyIds, RelationTypeIds } from 'config/constants.js';

export interface ScheduleEntryProperties {
  day: string;
  openTime: string;
  closeTime: string;
  status?: string;
}

export class ScheduleEntry extends BaseModel {
  private properties: ScheduleEntryProperties;
  private dayOfWeek?: DayOfWeek;
  private openTime?: Time;
  private closeTime?: Time;
  private status?: Status;

  constructor(id: string | null, name: string, properties: ScheduleEntryProperties) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new ScheduleEntry entity
   * 
   * @param properties The schedule entry properties
   * @param typeId The schedule entry type ID
   * @returns The created schedule entry entity
   */
  static create(properties: ScheduleEntryProperties, typeId: string): ScheduleEntry {
    const name = `Schedule for ${properties.day}`;
    return new ScheduleEntry(null, name, properties);
  }

  /**
   * Set the day of the week for this schedule entry
   * 
   * @param dayOfWeek The DayOfWeek entity
   */
  setDayOfWeek(dayOfWeek: DayOfWeek): void {
    this.dayOfWeek = dayOfWeek;
  }

  /**
   * Set the open time for this schedule entry
   * 
   * @param openTime The Time entity
   */
  setOpenTime(openTime: Time): void {
    this.openTime = openTime;
  }

  /**
   * Set the close time for this schedule entry
   * 
   * @param closeTime The Time entity
   */
  setCloseTime(closeTime: Time): void {
    this.closeTime = closeTime;
  }

  /**
   * Set the status for this schedule entry
   * 
   * @param status The Status entity
   */
  setStatus(status: Status): void {
    this.status = status;
  }

  /**
   * Generate the operations to create this schedule entry entity and its relations
   * 
   * @param scheduleEntryTypeId The schedule entry type ID
   * @param dayOfWeekRelationTypeId The day of the week relation type ID
   * @param openTimeRelationTypeId The open time relation type ID
   * @param closeTimeRelationTypeId The close time relation type ID
   * @param statusRelationTypeId The status relation type ID
   * @returns The operations to create this schedule entry entity and its relations
   */
  generateOps(
    scheduleEntryTypeId: string,
    dayOfWeekRelationTypeId: string,
    openTimeRelationTypeId: string,
    closeTimeRelationTypeId: string,
    statusRelationTypeId: string
  ): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the schedule entry entity
    const { id: scheduleEntryId, ops: scheduleEntryOps } = Graph.createEntity({
      name: this.name,
      types: [scheduleEntryTypeId],
      properties: {
        [PropertyIds.DAY]: {
          type: 'TEXT',
          value: this.properties.day,
        },
        [PropertyIds.OPEN_TIME]: {
          type: 'TEXT',
          value: this.properties.openTime,
        },
        [PropertyIds.CLOSE_TIME]: {
          type: 'TEXT',
          value: this.properties.closeTime,
        },
        ...(this.properties.status && {
          [PropertyIds.STATUS]: {
            type: 'TEXT',
            value: this.properties.status,
          },
        }),
      },
    });

    // Set the ID of this schedule entry entity
    this.id = scheduleEntryId;
    ops.push(...scheduleEntryOps);

    // Add relations if they exist
    if (this.dayOfWeek && this.dayOfWeek.getId()) {
      const { ops: dayOfWeekOps } = Graph.createRelation({
        fromId: scheduleEntryId,
        toId: this.dayOfWeek.getId()!,
        relationTypeId: dayOfWeekRelationTypeId,
      });
      ops.push(...dayOfWeekOps);
    }

    if (this.openTime && this.openTime.getId()) {
      const { ops: openTimeOps } = Graph.createRelation({
        fromId: scheduleEntryId,
        toId: this.openTime.getId()!,
        relationTypeId: openTimeRelationTypeId,
      });
      ops.push(...openTimeOps);
    }

    if (this.closeTime && this.closeTime.getId()) {
      const { ops: closeTimeOps } = Graph.createRelation({
        fromId: scheduleEntryId,
        toId: this.closeTime.getId()!,
        relationTypeId: closeTimeRelationTypeId,
      });
      ops.push(...closeTimeOps);
    }

    if (this.status && this.status.getId()) {
      const { ops: statusOps } = Graph.createRelation({
        fromId: scheduleEntryId,
        toId: this.status.getId()!,
        relationTypeId: statusRelationTypeId,
      });
      ops.push(...statusOps);
    }

    return ops;
  }
}
