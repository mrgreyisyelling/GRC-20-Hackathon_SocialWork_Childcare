/**
 * Schedule Entry Model
 *
 * This file defines the ScheduleEntry model for the GRC-20 publisher.
 * It implements the relationship-based data model for schedule-related entities.
 */
import { BaseModel } from 'models/base-model.js';
import { Graph } from 'core/graph.js';
import { PropertyIds } from 'config/constants.js';
export class ScheduleEntry extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.properties = properties;
    }
    /**
     * Create a new ScheduleEntry entity
     *
     * @param properties The schedule entry properties
     * @param typeId The schedule entry type ID
     * @returns The created schedule entry entity
     */
    static create(properties, typeId) {
        const name = `Schedule for ${properties.day}`;
        return new ScheduleEntry(null, name, properties);
    }
    /**
     * Set the day of the week for this schedule entry
     *
     * @param dayOfWeek The DayOfWeek entity
     */
    setDayOfWeek(dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
    /**
     * Set the open time for this schedule entry
     *
     * @param openTime The Time entity
     */
    setOpenTime(openTime) {
        this.openTime = openTime;
    }
    /**
     * Set the close time for this schedule entry
     *
     * @param closeTime The Time entity
     */
    setCloseTime(closeTime) {
        this.closeTime = closeTime;
    }
    /**
     * Set the status for this schedule entry
     *
     * @param status The Status entity
     */
    setStatus(status) {
        this.status = status;
    }
    /**
     * Generate the operations to create this schedule entry entity and its relations
     *
     * @param scheduleEntryTypeId The schedule entry type ID
     * @param dayOfWeekRelationTypeId The day of the week relation type ID
     * @param openTimeRelationTypeId The open time relation type ID
     * @param closeTimeRelationTypeId The close time relation type ID
     * @param statusRelationTypeId The status relation type ID
     * @returns The operations to create this schedule entry entity and its relations
     */
    generateOps(scheduleEntryTypeId, dayOfWeekRelationTypeId, openTimeRelationTypeId, closeTimeRelationTypeId, statusRelationTypeId) {
        const ops = [];
        // Create the schedule entry entity
        const { id: scheduleEntryId, ops: scheduleEntryOps } = Graph.createEntity({
            name: this.name,
            types: [scheduleEntryTypeId],
            properties: {
                [PropertyIds.DAY]: {
                    type: 'TEXT',
                    value: this.properties.day,
                },
                [PropertyIds.OPEN_TIME]: {
                    type: 'TEXT',
                    value: this.properties.openTime,
                },
                [PropertyIds.CLOSE_TIME]: {
                    type: 'TEXT',
                    value: this.properties.closeTime,
                },
                ...(this.properties.status && {
                    [PropertyIds.STATUS]: {
                        type: 'TEXT',
                        value: this.properties.status,
                    },
                }),
            },
        });
        // Set the ID of this schedule entry entity
        this.id = scheduleEntryId;
        ops.push(...scheduleEntryOps);
        // Add relations if they exist
        if (this.dayOfWeek && this.dayOfWeek.getId()) {
            const { ops: dayOfWeekOps } = Graph.createRelation({
                fromId: scheduleEntryId,
                toId: this.dayOfWeek.getId(),
                relationTypeId: dayOfWeekRelationTypeId,
            });
            ops.push(...dayOfWeekOps);
        }
        if (this.openTime && this.openTime.getId()) {
            const { ops: openTimeOps } = Graph.createRelation({
                fromId: scheduleEntryId,
                toId: this.openTime.getId(),
                relationTypeId: openTimeRelationTypeId,
            });
            ops.push(...openTimeOps);
        }
        if (this.closeTime && this.closeTime.getId()) {
            const { ops: closeTimeOps } = Graph.createRelation({
                fromId: scheduleEntryId,
                toId: this.closeTime.getId(),
                relationTypeId: closeTimeRelationTypeId,
            });
            ops.push(...closeTimeOps);
        }
        if (this.status && this.status.getId()) {
            const { ops: statusOps } = Graph.createRelation({
                fromId: scheduleEntryId,
                toId: this.status.getId(),
                relationTypeId: statusRelationTypeId,
            });
            ops.push(...statusOps);
        }
        return ops;
    }
}
//# sourceMappingURL=ScheduleEntry.js.map