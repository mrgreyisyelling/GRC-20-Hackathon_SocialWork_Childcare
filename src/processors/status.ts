import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from '../utils.js';

export function processStatus(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  // Retrieve or create Status entity
  const statusId = getOrCreateEntity("Status", data);
  const attributes = getOrCreateAttributes("Status", data);

  // Relationships
  const relationships = []; // No direct relationships defined in the schema for Status

  return [...ops, ...attributes, ...relationships];
}
