/**
 * Time Model
 * 
 * This file defines the Time model for the GRC-20 publisher.
 * It implements the relationship-based data model for time entities.
 */

import { BaseModel } from './base-model.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds } from '../config/constants.js';

export interface TimeProperties {
  timeValue: string;
}

export class Time extends BaseModel {
  private properties: TimeProperties;

  constructor(id: string | null, name: string, properties: TimeProperties) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new Time entity
   * 
   * @param properties The time properties
   * @param typeId The time type ID
   * @returns The created time entity
   */
  static create(properties: TimeProperties, typeId: string): Time {
    return new Time(null, `Time: ${properties.timeValue}`, properties);
  }

  /**
   * Generate the operations to create this time entity
   * 
   * @param timeTypeId The time type ID
   * @returns The operations to create this entity
   */
  generateOps(timeTypeId: string): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the Time entity
    const { id: timeId, ops: timeOps } = Graph.createEntity({
      name: this.name,
      types: [timeTypeId],
      properties: {
        [PropertyIds.TIME_VALUE]: {
          type: 'TEXT',
          value: this.properties.timeValue,
        },
      },
    });

    // Set the ID of this entity
    this.id = timeId;
    ops.push(...timeOps);

    return ops;
  }

  /**
   * Get the time value of this entity
   * 
   * @returns The time value
   */
  getTimeValue(): string {
    return this.properties.timeValue;
  }
}
