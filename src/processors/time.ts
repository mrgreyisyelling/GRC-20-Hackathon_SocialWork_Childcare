import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from '../utils.js';

export function processTime(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  // Retrieve or create Time entity
  const timeId = getOrCreateEntity("Time", data);
  const attributes = getOrCreateAttributes("Time", data);

  // Relationships
  const relationships = []; // No direct relationships defined in the schema for Time

  return [...ops, ...attributes, ...relationships];
}
