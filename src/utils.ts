import { EntityOp } from 'core/graph.js';

/** Ensures an entity exists and returns only a CREATE_ENTITY operation */
export function getOrCreateEntity(type: string, data: any): Extract<EntityOp, { type: 'CREATE_ENTITY' }> {
  const entityKey = type.toLowerCase();
  const entityValue = data[entityKey] || `${type}_UNKNOWN`; // Default if missing
  const entityId = `${entityKey}-${entityValue.replace(/\s+/g, '_')}`; // Sanitize ID

  return {
    type: 'CREATE_ENTITY',
    id: entityId,
    name: entityValue,
    types: [type]
  };
}

/** Extracts attributes for a given entity, returning an array of SET_PROPERTY operations */
export function getOrCreateAttributes(type: string, data: any): Extract<EntityOp, { type: 'SET_PROPERTY' }>[] {
  const entityKey = type.toLowerCase();
  const entityValue = data[entityKey] || `${type}_UNKNOWN`;
  const entityId = `${entityKey}-${entityValue.replace(/\s+/g, '_')}`; // Ensure consistency

  return Object.entries(data)
    .map(([key, value]) => {
      // Ensure value is a valid PropertyValue type (string | number | boolean)
      const validValue: string | number | boolean = typeof value === "string" || typeof value === "number" || typeof value === "boolean"
        ? value
        : String(value); // Fallback: Convert to string if unknown type

      return {
        type: 'SET_PROPERTY',
        entityId: entityId,
        propertyId: key,
        value: { type: 'TEXT', value: validValue } // ✅ Now always correct type
      };
    });
}


/** Creates relationships between entities, returning a CREATE_RELATION operation */
export function getOrCreateRelationship(fromId: string, toId: string, relationType: string): Extract<EntityOp, { type: 'CREATE_RELATION' }> {
  if (!fromId || !toId) {
    throw new Error(`Invalid relationship: ${relationType} requires valid IDs (got ${fromId}, ${toId})`);
  }

  return {
    type: 'CREATE_RELATION',
    id: `${relationType}-${fromId}-${toId}`,
    fromId,
    toId,
    relationTypeId: relationType
  };
}
