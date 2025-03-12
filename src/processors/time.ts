import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from '../utils.js';

export function processTime(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  // Retrieve or create Time entity
  const timeId = getOrCreateEntity("Time", data);
  const attributes = getOrCreateAttributes("Time", data);

  // Relationships
  // Explicitly define the type of relationships
  const relationships: EntityOp[] = []; // No direct relationships defined for Status

  return [timeId, ...attributes, ...relationships];
}
