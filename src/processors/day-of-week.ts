import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from 'utils.js';

export function processDayOfWeek(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  // Create DayOfWeek entity and attributes
  const dayOfWeekOp = getOrCreateEntity("DayOfWeek", data);
  const attributes = getOrCreateAttributes("DayOfWeek", data);

  // Create related entity
  const scheduleEntryOp = getOrCreateEntity("ScheduleEntry", data);

  // Create relationship
  const relationship = getOrCreateRelationship(dayOfWeekOp.id, scheduleEntryOp.id, "PART_OF");

  return [dayOfWeekOp, ...attributes, scheduleEntryOp, relationship];
}
