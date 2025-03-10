import { EntityOp } from '../core/graph.js';

/** Ensures an entity exists and returns its operation */
export function getOrCreateEntity(type: string, data: any): EntityOp {
  const entityId = `${type.toLowerCase()}-${data[type.toLowerCase()]}`;
  return {
    type: 'CREATE_ENTITY',
    id: entityId,
    name: data[type.toLowerCase()],
    types: [type]
  };
}

/** Extracts attributes for a given entity */
export function getOrCreateAttributes(type: string, data: any): EntityOp[] {
  return Object.entries(data).map(([key, value]) => ({
    type: 'SET_PROPERTY',
    entityId: `${type.toLowerCase()}-${data[type.toLowerCase()]}`,
    propertyId: key,
    value: { type: 'TEXT', value }
  }));
}

/** Creates relationships between entities */
export function getOrCreateRelationship(fromId: string, toId: string, relationType: string): EntityOp {
  return {
    type: 'CREATE_RELATION',
    id: `${relationType}-${fromId}-${toId}`,
    fromId,
    toId,
    relationTypeId: relationType
  };
}
