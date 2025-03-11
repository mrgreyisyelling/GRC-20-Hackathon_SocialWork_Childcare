/**
 * Address Model
 *
 * This file defines the Address model for the GRC-20 publisher.
 * It implements the relationship-based data model for address entities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { PropertyIds } from '../config/constants.js';
export class Address extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.properties = properties;
    }
    /**
     * Create a new Address entity
     *
     * @param properties The address properties
     * @param typeId The address type ID
     * @returns The created address entity
     */
    static create(properties, typeId) {
        return new Address(null, `Address: ${properties.fullAddress}`, properties);
    }
    /**
     * Set the location for this address
     *
     * @param location The location entity
     */
    setLocation(location) {
        this.location = location;
    }
    /**
     * Generate the operations to create this address entity and its relations
     *
     * @param addressTypeId The address type ID
     * @param locationRelationTypeId The location relation type ID
     * @returns The operations to create this address entity and its relations
     */
    generateOps(addressTypeId, locationRelationTypeId) {
        const ops = [];
        // Create the address entity
        const { id: addressId, ops: addressOps } = Graph.createEntity({
            name: this.name,
            types: [addressTypeId],
            properties: {
                [PropertyIds.FULL_ADDRESS]: {
                    type: 'TEXT',
                    value: this.properties.fullAddress,
                },
            },
        });
        // Set the ID of this address entity
        this.id = addressId;
        ops.push(...addressOps);
        // Add a relationship to the location if it exists
        if (this.location && this.location.getId()) {
            const { ops: locationRelationOps } = Graph.createRelation({
                fromId: addressId,
                toId: this.location.getId(),
                relationTypeId: locationRelationTypeId,
            });
            ops.push(...locationRelationOps);
        }
        return ops;
    }
}
//# sourceMappingURL=address.js.map