import { EntityOp } from '../core/graph.js';
import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from './utils.js';

export function processSchedule(data: any): EntityOp[] {
  const ops: EntityOp[] = [];

  const scheduleId = getOrCreateEntity("Schedule", data);
  const attributes = getOrCreateAttributes("Schedule", data);

  const facilityId = getOrCreateEntity("Facility", data);
  const scheduleEntries = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    .map(day => getOrCreateEntity("ScheduleEntry", { day, time: data[`Hours of Operation (${day})`] }));

  const relationships = scheduleEntries.map(entry =>
    getOrCreateRelationship(scheduleId, entry, "HAS_OPERATION_HOURS")
  );

  return [...ops, ...attributes, ...relationships];
}
