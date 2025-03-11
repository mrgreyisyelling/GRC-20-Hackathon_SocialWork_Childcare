/**
 * City Model
 * 
 * This file defines the City model for the GRC-20 publisher.
 * It implements the relationship-based data model for city entities.
 */

import { BaseModel } from './base-model.js';
import { State } from './state.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';

export interface CityProperties {
  name: string;
}

export class City extends BaseModel {
  private properties: CityProperties;
  private state?: State;

  constructor(
    id: string | null,
    name: string,
    properties: CityProperties
  ) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new City entity
   * 
   * @param properties The city properties
   * @param typeId The city type ID
   * @returns The created city entity
   */
  static create(properties: CityProperties, typeId: string): City {
    return new City(null, properties.name, properties);
  }

  /**
   * Set the state for this city
   * 
   * @param state The state entity
   */
  setState(state: State): void {
    this.state = state;
  }

  /**
   * Generate the operations to create this city entity and its relations
   * 
   * @param cityTypeId The city type ID
   * @param inStateRelationTypeId The relation type ID for cities being in a state
   * @returns The operations to create this city entity and its relations
   */
  generateOps(cityTypeId: string, inStateRelationTypeId: string): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the city entity
    const { id: cityId, ops: cityOps } = Graph.createEntity({
      name: this.name,
      types: [cityTypeId],
      properties: {
        [PropertyIds.CITY_NAME]: {
          type: 'TEXT',
          value: this.properties.name,
        },
      },
    });

    // Set the ID of this city entity
    this.id = cityId;
    ops.push(...cityOps);

    // Add relationship to state if available
    if (this.state && this.state.getId()) {
      const { ops: stateRelationOps } = Graph.createRelation({
        fromId: cityId,
        toId: this.state.getId()!,
        relationTypeId: inStateRelationTypeId,
      });
      ops.push(...stateRelationOps);
    }

    return ops;
  }
}
