/**
 * DayOfWeek Model
 * 
 * This file defines the DayOfWeek model for the GRC-20 publisher.
 * It implements the relationship-based data model for days of the week.
 */

import { BaseModel } from './base-model.js';
import { Graph, EntityOp } from 'core/graph.js';
import { PropertyIds } from 'config/constants.js';

export interface DayOfWeekProperties {
  day: string;
}

export class DayOfWeek extends BaseModel {
  private properties: DayOfWeekProperties;

  constructor(id: string | null, name: string, properties: DayOfWeekProperties) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new DayOfWeek entity
   * 
   * @param properties The day of the week properties
   * @param typeId The day of the week type ID
   * @returns The created day of the week entity
   */
  static create(properties: DayOfWeekProperties, typeId: string): DayOfWeek {
    return new DayOfWeek(null, `Day: ${properties.day}`, properties);
  }

  /**
   * Generate the operations to create this day of the week entity
   * 
   * @param dayOfWeekTypeId The day of the week type ID
   * @returns The operations to create this entity
   */
  generateOps(dayOfWeekTypeId: string): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the DayOfWeek entity
    const { id: dayOfWeekId, ops: dayOfWeekOps } = Graph.createEntity({
      name: this.name,
      types: [dayOfWeekTypeId],
      properties: {
        [PropertyIds.DAY]: {
          type: 'TEXT',
          value: this.properties.day,
        },
      },
    });

    // Set the ID of this entity
    this.id = dayOfWeekId;
    ops.push(...dayOfWeekOps);

    return ops;
  }

  /**
   * Get the day name of this entity
   * 
   * @returns The day name
   */
  getDay(): string {
    return this.properties.day;
  }
}
