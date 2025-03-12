/**
 * TimeZone Model
 *
 * This file defines the TimeZone model for the GRC-20 publisher.
 * It implements the relationship-based data model for time zone entities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { PropertyIds } from '../config/constants.js';
export class TimeZone extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.properties = properties;
    }
    /**
     * Create a new TimeZone entity
     *
     * @param properties The time zone properties
     * @param typeId The time zone type ID
     * @returns The created time zone entity
     */
    static create(properties, typeId) {
        return new TimeZone(null, `TimeZone: ${properties.name}`, properties);
    }
    /**
     * Set the location for this time zone
     *
     * @param location The location entity
     */
    setLocation(location) {
        this.location = location;
    }
    /**
     * Generate the operations to create this time zone entity and its relations
     *
     * @param timeZoneTypeId The time zone type ID
     * @param locationRelationTypeId The location relation type ID
     * @returns The operations to create this time zone entity and its relations
     */
    generateOps(timeZoneTypeId, locationRelationTypeId) {
        const ops = [];
        // Create the time zone entity
        const { id: timeZoneId, ops: timeZoneOps } = Graph.createEntity({
            name: this.name,
            types: [timeZoneTypeId],
            properties: {
                [PropertyIds.TIME_ZONE_NAME]: {
                    type: 'TEXT',
                    value: this.properties.name,
                },
            },
        });
        // Set the ID of this time zone entity
        this.id = timeZoneId;
        ops.push(...timeZoneOps);
        // Add a relationship to the location if it exists
        if (this.location && this.location.getId()) {
            const { ops: locationRelationOps } = Graph.createRelation({
                fromId: timeZoneId,
                toId: this.location.getId(),
                relationTypeId: locationRelationTypeId,
            });
            ops.push(...locationRelationOps);
        }
        return ops;
    }
}
//# sourceMappingURL=timezone.js.map