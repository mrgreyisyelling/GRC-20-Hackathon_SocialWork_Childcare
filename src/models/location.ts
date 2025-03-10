/**
 * Location Model
 * 
 * This file defines the Location model for the GRC-20 publisher.
 * It implements the relationship-based data model for location entities.
 */

import { BaseModel } from './base-model.js';
import { City } from './city.js';
import { State } from './state.js';
import { ZipCode } from './zip-code.js';
import { Address } from './address.js';
import { TimeZone } from './time-zone.js';
import { Graph, EntityOp } from '../core/graph.js';
import { PropertyIds, RelationTypeIds } from '../config/constants.js';

export interface LocationProperties {}

export class Location extends BaseModel {
  private properties: LocationProperties;
  private city?: City;
  private state?: State;
  private zipCode?: ZipCode;
  private address?: Address;
  private timeZone?: TimeZone;

  constructor(
    id: string | null,
    name: string,
    properties: LocationProperties
  ) {
    super(id, name);
    this.properties = properties;
  }

  /**
   * Create a new Location entity
   * 
   * @param typeId The location type ID
   * @returns The created location entity
   */
  static create(typeId: string): Location {
    return new Location(null, 'Location', {});
  }

  /**
   * Set the city for this location
   * 
   * @param city The city entity
   */
  setCity(city: City): void {
    this.city = city;
  }

  /**
   * Set the state for this location
   * 
   * @param state The state entity
   */
  setState(state: State): void {
    this.state = state;
  }

  /**
   * Set the zip code for this location
   * 
   * @param zipCode The zip code entity
   */
  setZipCode(zipCode: ZipCode): void {
    this.zipCode = zipCode;
  }

  /**
   * Set the address for this location
   * 
   * @param address The address entity
   */
  setAddress(address: Address): void {
    this.address = address;
  }

  /**
   * Set the time zone for this location
   * 
   * @param timeZone The time zone entity
   */
  setTimeZone(timeZone: TimeZone): void {
    this.timeZone = timeZone;
  }

  /**
   * Generate the operations to create this location entity and its relations
   * 
   * @param locationTypeId The location type ID
   * @returns The operations to create this location entity and its relations
   */
  generateOps(locationTypeId: string): EntityOp[] {
    const ops: EntityOp[] = [];

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
        toId: this.city.getId()!,
        relationTypeId: RelationTypeIds.LOCATED_IN,
      });
      ops.push(...cityRelationOps);
    }

    if (this.state && this.state.getId()) {
      const { ops: stateRelationOps } = Graph.createRelation({
        fromId: locationId,
        toId: this.state.getId()!,
        relationTypeId: RelationTypeIds.IN_STATE,
      });
      ops.push(...stateRelationOps);
    }

    if (this.zipCode && this.zipCode.getId()) {
      const { ops: zipCodeRelationOps } = Graph.createRelation({
        fromId: locationId,
        toId: this.zipCode.getId()!,
        relationTypeId: RelationTypeIds.HAS_ZIP,
      });
      ops.push(...zipCodeRelationOps);
    }

    if (this.address && this.address.getId()) {
      const { ops: addressRelationOps } = Graph.createRelation({
        fromId: locationId,
        toId: this.address.getId()!,
        relationTypeId: RelationTypeIds.HAS_ADDRESS,
      });
      ops.push(...addressRelationOps);
    }

    if (this.timeZone && this.timeZone.getId()) {
      const { ops: timeZoneRelationOps } = Graph.createRelation({
        fromId: locationId,
        toId: this.timeZone.getId()!,
        relationTypeId: RelationTypeIds.USES_TIMEZONE,
      });
      ops.push(...timeZoneRelationOps);
    }

    return ops;
  }
}
