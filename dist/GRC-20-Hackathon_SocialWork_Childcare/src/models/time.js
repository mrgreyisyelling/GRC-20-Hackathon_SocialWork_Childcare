/**
 * Time Model
 *
 * This file defines the Time model for the GRC-20 publisher.
 * It implements the relationship-based data model for time entities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { PropertyIds } from '../config/constants.js';
export class Time extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.properties = properties;
    }
    /**
     * Create a new Time entity
     *
     * @param properties The time properties
     * @param typeId The time type ID
     * @returns The created time entity
     */
    static create(properties, typeId) {
        return new Time(null, `Time: ${properties.timeValue}`, properties);
    }
    /**
     * Generate the operations to create this time entity
     *
     * @param timeTypeId The time type ID
     * @returns The operations to create this entity
     */
    generateOps(timeTypeId) {
        const ops = [];
        // Create the Time entity
        const { id: timeId, ops: timeOps } = Graph.createEntity({
            name: this.name,
            types: [timeTypeId],
            properties: {
                [PropertyIds.TIME_VALUE]: {
                    type: 'TEXT',
                    value: this.properties.timeValue,
                },
            },
        });
        // Set the ID of this entity
        this.id = timeId;
        ops.push(...timeOps);
        return ops;
    }
    /**
     * Get the time value of this entity
     *
     * @returns The time value
     */
    getTimeValue() {
        return this.properties.timeValue;
    }
}
//# sourceMappingURL=time.js.map