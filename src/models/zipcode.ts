/**
 * ZipCode Model
 * 
 * This file defines the ZipCode model for the GRC-20 publisher.
 * It implements the relationship-based data model for zip code entities.
 */

import { BaseModel } from './base-model.js';
import { City } from './city.js';
import { State } from './state.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';

export interface ZipCodeProperties {
  zipCode: string;
}

export class ZipCode extends BaseModel {
  private properties: ZipCodeProperties;
  private city?: City;
  private state?: State;

  constructor(
    id: string | null,
    name: string,
    properties: ZipCodeProperties
  ) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new ZipCode entity
   * 
   * @param properties The zip code properties
   * @param typeId The zip code type ID
   * @returns The created zip code entity
   */
  static create(properties: ZipCodeProperties, typeId: string): ZipCode {
    return new ZipCode(null, `ZipCode ${properties.zipCode}`, properties);
  }

  /**
   * Set the city for this zip code
   * 
   * @param city The city entity
   */
  setCity(city: City): void {
    this.city = city;
  }

  /**
   * Set the state for this zip code
   * 
   * @param state The state entity
   */
  setState(state: State): void {
    this.state = state;
  }

  /**
   * Generate the operations to create this zip code entity and its relations
   * 
   * @param zipCodeTypeId The zip code type ID
   * @param cityRelationTypeId The city relation type ID
   * @param stateRelationTypeId The state relation type ID
   * @returns The operations to create this zip code entity and its relations
   */
  generateOps(
    zipCodeTypeId: string,
    cityRelationTypeId: string,
    stateRelationTypeId: string
  ): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the zip code entity
    const { id: zipCodeId, ops: zipCodeOps } = Graph.createEntity({
      name: this.name,
      types: [zipCodeTypeId],
      properties: {
        [PropertyIds.ZIP_CODE]: {
          type: 'TEXT',
          value: this.properties.zipCode,
        },
      },
    });

    // Set the ID of this zip code entity
    this.id = zipCodeId;
    ops.push(...zipCodeOps);

    // Add relationships to city and state if they exist
    if (this.city && this.city.getId()) {
      const { ops: cityRelationOps } = Graph.createRelation({
        fromId: zipCodeId,
        toId: this.city.getId()!,
        relationTypeId: cityRelationTypeId,
      });
      ops.push(...cityRelationOps);
    }

    if (this.state && this.state.getId()) {
      const { ops: stateRelationOps } = Graph.createRelation({
        fromId: zipCodeId,
        toId: this.state.getId()!,
        relationTypeId: stateRelationTypeId,
      });
      ops.push(...stateRelationOps);
    }

    return ops;
  }
}
