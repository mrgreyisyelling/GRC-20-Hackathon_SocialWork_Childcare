/**
 * State Model
 * 
 * This file defines the State model for the GRC-20 publisher.
 * It implements the relationship-based data model for state entities.
 */

import { BaseModel } from './base-model.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds } from '../config/constants.js';

export interface StateProperties {
  name: string;
}

export class State extends BaseModel {
  private properties: StateProperties;

  constructor(
    id: string | null,
    name: string,
    properties: StateProperties
  ) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new State entity
   * 
   * @param properties The state properties
   * @param typeId The state type ID
   * @returns The created state entity
   */
  static create(properties: StateProperties, typeId: string): State {
    return new State(null, properties.name, properties);
  }

  /**
   * Generate the operations to create this state entity
   * 
   * @param stateTypeId The state type ID
   * @returns The operations to create this state entity
   */
  generateOps(stateTypeId: string): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the state entity
    const { id: stateId, ops: stateOps } = Graph.createEntity({
      name: this.name,
      types: [stateTypeId],
      properties: {
        [PropertyIds.NAME]: {
          type: 'TEXT',
          value: this.properties.name,
        },
      },
    });

    // Set the ID of this state entity
    this.id = stateId;
    ops.push(...stateOps);

    return ops;
  }
}
