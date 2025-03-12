import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from 'utils.js';
export function processSchedule(data) {
    const ops = [];
    // Create Schedule entity and attributes
    const scheduleOp = getOrCreateEntity("Schedule", data);
    const attributes = getOrCreateAttributes("Schedule", data);
    // Create related entities (ScheduleEntries for each day)
    const scheduleEntries = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        .map(day => getOrCreateEntity("ScheduleEntry", { day, time: data[`Hours of Operation (${day})`] }));
    // Create relationships
    const relationships = scheduleEntries.map(entry => getOrCreateRelationship(scheduleOp.id, entry.id, "HAS_OPERATION_HOURS"));
    return [scheduleOp, ...attributes, ...scheduleEntries, ...relationships];
}
//# sourceMappingURL=schedule.js.map