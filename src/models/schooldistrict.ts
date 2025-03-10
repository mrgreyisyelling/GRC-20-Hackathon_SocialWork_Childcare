/**
 * School District Model
 * 
 * This file defines the SchoolDistrict model for the GRC-20 publisher.
 * It implements the relationship-based data model for school district entities.
 */

import { BaseModel } from './base-model.js';
import { Facility } from './facility.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';

export interface SchoolDistrictProperties {
  districtName: string;
}

export class SchoolDistrict extends BaseModel {
  private properties: SchoolDistrictProperties;
  private facilities: Facility[] = [];

  constructor(
    id: string | null,
    name: string,
    properties: SchoolDistrictProperties
  ) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new School District entity
   * 
   * @param properties The school district properties
   * @param typeId The school district type ID
   * @returns The created school district entity
   */
  static create(properties: SchoolDistrictProperties, typeId: string): SchoolDistrict {
    const name = `School District: ${properties.districtName}`;
    return new SchoolDistrict(null, name, properties);
  }

  /**
   * Add a facility to this school district
   * 
   * @param facility The facility entity
   */
  addFacility(facility: Facility): void {
    this.facilities.push(facility);
  }

  /**
   * Generate the operations to create this school district entity and its relations
   * 
   * @param schoolDistrictTypeId The school district type ID
   * @returns The operations to create this school district entity and its relations
   */
  generateOps(schoolDistrictTypeId: string): EntityOp[] {
    const ops: EntityOp[] = [];

    // Create the school district entity
    const { id: schoolDistrictId, ops: schoolDistrictOps } = Graph.createEntity({
      name: this.name,
      types: [schoolDistrictTypeId],
      properties: {
        [PropertyIds.DISTRICT_NAME]: {
          type: 'TEXT',
          value: this.properties.districtName,
        },
      },
    });

    // Set the ID of this school district entity
    this.id = schoolDistrictId;
    ops.push(...schoolDistrictOps);

    // Add relationships to facilities if they exist
    for (const facility of this.facilities) {
      if (facility.getId()) {
        const { ops: facilityRelationOps } = Graph.createRelation({
          fromId: schoolDistrictId,
          toId: facility.getId()!,
          relationTypeId: RelationTypeIds.OVERSEES,
        });
        ops.push(...facilityRelationOps);
      }
    }

    return ops;
  }
}
