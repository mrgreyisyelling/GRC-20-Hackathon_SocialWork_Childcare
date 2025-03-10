/**
 * Date Model
 * 
 * This file defines the Date model for the GRC-20 publisher.
 * It implements the relationship-based data model for date-related entities.
 */

import { BaseModel } from './base-model.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';

export interface DateProperties {
  dateValue: string;
}

export class DateEntity extends BaseModel {
  private properties: DateProperties;

  constructor(id: string | null, name: string, properties: DateProperties) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new Date entity
   * 
   * @param properties The date properties
   * @param typeId The date type ID
   * @returns The created date entity
   */
  static create(properties: DateProperties, typeId: string): DateEntity {
    return new DateEntity(null, `Date: ${properties.dateValue}`, properties);
  }

  /**
   * Generate the operations to create this date entity
   * 
   * @param dateTypeId The date type ID
   * @returns The operations to create this date entity
   */
  generateOps(dateTypeId: string): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the date entity
    const { id: dateId, ops: dateOps } = Graph.createEntity({
      name: this.name,
      types: [dateTypeId],
      properties: {
        [PropertyIds.DATE_VALUE]: {
          type: 'TEXT',
          value: this.properties.dateValue,
        },
      },
    });

    // Set the ID of this date entity
    this.id = dateId;
    ops.push(...dateOps);

    return ops;
  }
}
