import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from '../utils.js';
export function processScheduleEntry(data, day) {
    const ops = [];
    // Create ScheduleEntry entity and attributes
    const scheduleEntryOp = getOrCreateEntity("ScheduleEntry", data);
    const attributes = getOrCreateAttributes("ScheduleEntry", data);
    // Create related entities
    const dayOfWeekOp = getOrCreateEntity("DayOfWeek", { day });
    const openTimeOp = getOrCreateEntity("Time", data);
    const closeTimeOp = getOrCreateEntity("Time", data);
    const statusOp = getOrCreateEntity("Status", data);
    // Create relationships
    const relationships = [
        getOrCreateRelationship(scheduleEntryOp.id, dayOfWeekOp.id, "HAS_DAY"),
        getOrCreateRelationship(scheduleEntryOp.id, openTimeOp.id, "OPENS_AT"),
        getOrCreateRelationship(scheduleEntryOp.id, closeTimeOp.id, "CLOSES_AT"),
        getOrCreateRelationship(scheduleEntryOp.id, statusOp.id, "STATUS"),
    ];
    return [scheduleEntryOp, ...attributes, dayOfWeekOp, openTimeOp, closeTimeOp, statusOp, ...relationships];
}
//# sourceMappingURL=schedule-entry.js.map