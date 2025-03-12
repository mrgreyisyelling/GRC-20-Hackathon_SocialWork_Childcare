/**
 * Location Model
 *
 * This file defines the Location model for the GRC-20 publisher.
 * It implements the relationship-based data model for location entities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { RelationTypeIds } from '../config/constants.js';
export class Location extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.properties = properties;
    }
    /**
     * Create a new Location entity
     *
     * @param typeId The location type ID
     * @returns The created location entity
     */
    static create(typeId) {
        return new Location(null, 'Location', {});
    }
    /**
     * Set the city for this location
     *
     * @param city The city entity
     */
    setCity(city) {
        this.city = city;
    }
    /**
     * Set the state for this location
     *
     * @param state The state entity
     */
    setState(state) {
        this.state = state;
    }
    /**
     * Set the zip code for this location
     *
     * @param zipCode The zip code entity
     */
    setZipCode(zipCode) {
        this.zipCode = zipCode;
    }
    /**
     * Set the address for this location
     *
     * @param address The address entity
     */
    setAddress(address) {
        this.address = address;
    }
    /**
     * Set the time zone for this location
     *
     * @param timeZone The time zone entity
     */
    setTimeZone(timeZone) {
        this.timeZone = timeZone;
    }
    /**
     * Generate the operations to create this location entity and its relations
     *
     * @param locationTypeId The location type ID
     * @returns The operations to create this location entity and its relations
     */
    generateOps(locationTypeId) {
        const ops = [];
        // Create the location entity
        const { id: locationId, ops: locationOps } = Graph.createEntity({
            name: this.name,
            types: [locationTypeId],
            properties: {},
        });
        // Set the ID of this location entity
        this.id = locationId;
        ops.push(...locationOps);
        // Add relations to City, State, ZipCode, Address, and TimeZone if they exist
        if (this.city && this.city.getId()) {
            const { ops: cityRelationOps } = Graph.createRelation({
                fromId: locationId,
                toId: this.city.getId(),
                relationTypeId: RelationTypeIds.LOCATED_IN,
            });
            ops.push(...cityRelationOps);
        }
        if (this.state && this.state.getId()) {
            const { ops: stateRelationOps } = Graph.createRelation({
                fromId: locationId,
                toId: this.state.getId(),
                relationTypeId: RelationTypeIds.IN_STATE,
            });
            ops.push(...stateRelationOps);
        }
        if (this.zipCode && this.zipCode.getId()) {
            const { ops: zipCodeRelationOps } = Graph.createRelation({
                fromId: locationId,
                toId: this.zipCode.getId(),
                relationTypeId: RelationTypeIds.HAS_ZIP,
            });
            ops.push(...zipCodeRelationOps);
        }
        if (this.address && this.address.getId()) {
            const { ops: addressRelationOps } = Graph.createRelation({
                fromId: locationId,
                toId: this.address.getId(),
                relationTypeId: RelationTypeIds.HAS_ADDRESS,
            });
            ops.push(...addressRelationOps);
        }
        if (this.timeZone && this.timeZone.getId()) {
            const { ops: timeZoneRelationOps } = Graph.createRelation({
                fromId: locationId,
                toId: this.timeZone.getId(),
                relationTypeId: RelationTypeIds.USES_TIMEZONE,
            });
            ops.push(...timeZoneRelationOps);
        }
        return ops;
    }
}
//# sourceMappingURL=location.js.map