/**
 * LicenseType Model
 *
 * This file defines the LicenseType model for the GRC-20 publisher.
 * It implements the relationship-based data model for license type entities.
 */
import { BaseModel } from './base-model.js';
import { Graph } from '../core/graph.js';
import { PropertyIds } from '../config/constants.js';
export class LicenseType extends BaseModel {
    constructor(id, name, properties) {
        super(id, name);
        this.properties = properties;
    }
    /**
     * Create a new LicenseType entity
     *
     * @param properties The license type properties
     * @param typeId The license type ID
     * @returns The created license type entity
     */
    static create(properties, typeId) {
        return new LicenseType(null, `License Type: ${properties.name}`, properties);
    }
    /**
     * Generate the operations to create this license type entity
     *
     * @param licenseTypeId The license type ID
     * @returns The operations to create this license type entity
     */
    generateOps(licenseTypeId) {
        const ops = [];
        // Create the license type entity
        const { id: licenseTypeIdGenerated, ops: licenseTypeOps } = Graph.createEntity({
            name: this.name,
            types: [licenseTypeId],
            properties: {
                [PropertyIds.NAME]: {
                    type: 'TEXT',
                    value: this.properties.name,
                },
            },
        });
        // Set the ID of this license type entity
        this.id = licenseTypeIdGenerated;
        ops.push(...licenseTypeOps);
        return ops;
    }
}
//# sourceMappingURL=licenseType.js.map