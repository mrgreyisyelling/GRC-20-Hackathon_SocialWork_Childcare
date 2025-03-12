import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from '../utils.js';

export function processSchoolDistrict(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  // Create SchoolDistrict entity and attributes
  const schoolDistrictOp = getOrCreateEntity("SchoolDistrict", data);
  const attributes = getOrCreateAttributes("SchoolDistrict", data);

  // Create related entity
  const facilityOp = getOrCreateEntity("Facility", data);

  // Create relationship
  const relationship = getOrCreateRelationship(schoolDistrictOp.id, facilityOp.id, "OVERSEES");

  return [schoolDistrictOp, ...attributes, facilityOp, relationship];
}
