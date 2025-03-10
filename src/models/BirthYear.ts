/**
 * BirthYear Model
 * 
 * This file defines the BirthYear model for the GRC-20 publisher.
 * It implements the relationship-based data model for birth year entities.
 */

import { BaseModel } from './base-model.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';

export interface BirthYearProperties {
  year: string;
}

export class BirthYear extends BaseModel {
  private properties: BirthYearProperties;
  private personId?: string; // Relates BirthYear to a Person

  constructor(id: string | null, name: string, properties: BirthYearProperties) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new BirthYear entity
   * 
   * @param properties The birth year properties
   * @param typeId The birth year type ID
   * @returns The created birth year entity
   */
  static create(properties: BirthYearProperties, typeId: string): BirthYear {
    return new BirthYear(null, `Birth Year: ${properties.year}`, properties);
  }

  /**
   * Set the person associated with this birth year
   * 
   * @param personId The ID of the person entity
   */
  setPerson(personId: string): void {
    this.personId = personId;
  }

  /**
   * Generate the operations to create this birth year entity and its relationships
   * 
   * @param birthYearTypeId The birth year type ID
   * @param bornInRelationTypeId The relation type ID for "BORN_IN"
   * @returns The operations to create this entity and its relationships
   */
  generateOps(birthYearTypeId: string, bornInRelationTypeId: string): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the BirthYear entity
    const { id: birthYearId, ops: birthYearOps } = Graph.createEntity({
      name: this.name,
      types: [birthYearTypeId],
      properties: {
        [PropertyIds.BIRTH_YEAR]: {
          type: 'TEXT',
          value: this.properties.year,
        },
      },
    });

    // Set the ID of this entity
    this.id = birthYearId;
    ops.push(...birthYearOps);

    // Create relation to Person entity
    if (this.personId) {
      const { ops: bornInOps } = Graph.createRelation({
        fromId: this.personId,
        toId: birthYearId,
        relationTypeId: bornInRelationTypeId,
      });
      ops.push(...bornInOps);
    }

    return ops;
  }

  /**
   * Get the birth year value of this entity
   * 
   * @returns The birth year value
   */
  getYear(): string {
    return this.properties.year;
  }
}
