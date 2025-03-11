import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from '../utils.js';
export function processDayOfWeek(data) {
    const ops = [];
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
//# sourceMappingURL=day-of-week.js.map