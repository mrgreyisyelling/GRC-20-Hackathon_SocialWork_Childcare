import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from './utils.js';

export function processLocation(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  const locationId = getOrCreateEntity("Location", data);
  const attributes = getOrCreateAttributes("Location", data);

  // Related Entities
  const cityId = getOrCreateEntity("City", data);
  const stateId = getOrCreateEntity("State", data);
  const zipcodeId = getOrCreateEntity("ZipCode", data);
  const addressId = getOrCreateEntity("Address", data);
  const timezoneId = getOrCreateEntity("TimeZone", data);

  // Relationships
  const relationships = [
    getOrCreateRelationship(locationId, cityId, "LOCATED_IN"),
    getOrCreateRelationship(locationId, stateId, "IN_STATE"),
    getOrCreateRelationship(locationId, zipcodeId, "HAS_ZIP"),
    getOrCreateRelationship(locationId, addressId, "HAS_ADDRESS"),
    getOrCreateRelationship(locationId, timezoneId, "USES_TIMEZONE"),
  ];

  return [...ops, ...attributes, ...relationships];
}
