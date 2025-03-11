import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from '../utils.js';

export function processSchoolDistrict(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  // Retrieve or create SchoolDistrict entity
  const schoolDistrictId = getOrCreateEntity("SchoolDistrict", data);
  const attributes = getOrCreateAttributes("SchoolDistrict", data);

  // Retrieve related entities
  const facilityId = getOrCreateEntity("Facility", data);

  // Relationships
  const relationships = [
    getOrCreateRelationship(schoolDistrictId, facilityId, "OVERSEES"),
  ];

  return [...ops, ...attributes, ...relationships];
}
