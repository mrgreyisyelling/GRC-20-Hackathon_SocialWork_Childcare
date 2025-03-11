import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from '../utils.js';

export function processDayOfWeek(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  // Retrieve or create DayOfWeek entity
  const dayOfWeekId = getOrCreateEntity("DayOfWeek", data);
  const attributes = getOrCreateAttributes("DayOfWeek", data);

  // Retrieve related entities
  const scheduleEntryId = getOrCreateEntity("ScheduleEntry", data);

  // Relationships
  const relationships = [
    getOrCreateRelationship(dayOfWeekId, scheduleEntryId, "PART_OF"),
  ];

  return [...ops, ...attributes, ...relationships];
}
