import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from '../utils.js';

export function processScheduleEntry(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  // Retrieve or create ScheduleEntry entity
  const scheduleEntryId = getOrCreateEntity("ScheduleEntry", data);
  const attributes = getOrCreateAttributes("ScheduleEntry", data);

  // Retrieve related entities
  const dayOfWeekId = getOrCreateEntity("DayOfWeek", data);
  const openTimeId = getOrCreateEntity("Time", data);
  const closeTimeId = getOrCreateEntity("Time", data);
  const statusId = getOrCreateEntity("Status", data);

  // Relationships
  const relationships = [
    getOrCreateRelationship(scheduleEntryId, dayOfWeekId, "HAS_DAY"),
    getOrCreateRelationship(scheduleEntryId, openTimeId, "OPENS_AT"),
    getOrCreateRelationship(scheduleEntryId, closeTimeId, "CLOSES_AT"),
    getOrCreateRelationship(scheduleEntryId, statusId, "STATUS"),
  ];

  return [...ops, ...attributes, ...relationships];
}
