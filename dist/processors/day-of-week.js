import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from 'utils.js';
export function processDayOfWeek(data) {
    const ops = [];
    // Create DayOfWeek entity and attributes
    const dayOfWeekOp = getOrCreateEntity("DayOfWeek", data);
    const attributes = getOrCreateAttributes("DayOfWeek", data);
    // Create related entity
    const scheduleEntryOp = getOrCreateEntity("ScheduleEntry", data);
    // Create relationship
    const relationship = getOrCreateRelationship(dayOfWeekOp.id, scheduleEntryOp.id, "PART_OF");
    return [dayOfWeekOp, ...attributes, scheduleEntryOp, relationship];
}
//# sourceMappingURL=day-of-week.js.map