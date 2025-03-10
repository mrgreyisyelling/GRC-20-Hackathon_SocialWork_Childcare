import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from './utils.js';

export function processFacility(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  // Retrieve or create Facility entity
  const facilityId = getOrCreateEntity("Facility", data);
  const attributes = getOrCreateAttributes("Facility", data);

  // Retrieve related entities
  const locationId = getOrCreateEntity("Location", data);
  const ownerId = getOrCreateEntity("Owner", data);
  const licenseId = getOrCreateEntity("License", data);
  const schoolDistrictId = getOrCreateEntity("SchoolDistrict", data);
  const scheduleId = getOrCreateEntity("Schedule", data);

  // Relationships
  const relationships = [
    getOrCreateRelationship(facilityId, locationId, "LOCATED_AT"),
    getOrCreateRelationship(facilityId, ownerId, "OWNED_BY"),
    getOrCreateRelationship(facilityId, licenseId, "LICENSED_UNDER"),
    getOrCreateRelationship(facilityId, schoolDistrictId, "AFFILIATED_WITH"),
    getOrCreateRelationship(facilityId, scheduleId, "FOLLOWS_SCHEDULE"),
  ];

  return [...ops, ...attributes, ...relationships];
}
