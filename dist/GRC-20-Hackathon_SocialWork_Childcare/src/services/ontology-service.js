/**
 * Ontology Service
 *
 * Provides services for setting up and managing the ontology for the childcare data.
 */
import { TypeIds, PropertyIds, RelationTypeIds, SpaceIds } from '../../../../../GRC-20-Hackathon_SocialWork_Childcare/src/config/constants.js';
/**
 * Ontology Service
 *
 * Handles ontology creation for Facility, License, and Date spaces.
 */
export class OntologyService {
    /**
     * Generate operations to set up the Facility ontology
     * @returns The operations for Facility ontology
     */
    static generateFacilityOntologyOps() {
        return [
            // Entity types
            { type: 'CREATE_ENTITY', id: TypeIds.FACILITY, name: 'Facility', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.LOCATION, name: 'Location', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.OWNER, name: 'Owner', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.SCHOOL_DISTRICT, name: 'School District', types: [] },
            // Property types
            { type: 'CREATE_ENTITY', id: PropertyIds.FACILITY_NAME, name: 'Facility Name', types: [] },
            { type: 'CREATE_ENTITY', id: PropertyIds.FACILITY_STATUS, name: 'Facility Status', types: [] },
            { type: 'CREATE_ENTITY', id: PropertyIds.FACILITY_TYPE, name: 'Facility Type', types: [] },
            { type: 'CREATE_ENTITY', id: PropertyIds.ADDRESS, name: 'Address', types: [] },
            // Relation types
            { type: 'CREATE_ENTITY', id: RelationTypeIds.LOCATED_AT, name: 'Located At', types: [] },
            { type: 'CREATE_ENTITY', id: RelationTypeIds.OWNED_BY, name: 'Owned By', types: [] },
            { type: 'CREATE_ENTITY', id: RelationTypeIds.AFFILIATED_WITH, name: 'Affiliated With', types: [] }
        ];
    }
    /**
       * Generate operations to set up the Location ontology
       * @returns The operations for Location ontology
       */
    static generateLocationOntologyOps() {
        return [
            // Entity types
            { type: 'CREATE_ENTITY', id: TypeIds.LOCATION, name: 'Location', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.CITY, name: 'City', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.STATE, name: 'State', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.ZIP_CODE, name: 'Zip Code', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.ADDRESS, name: 'Address', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.TIME_ZONE, name: 'Time Zone', types: [] },
            // Property types
            { type: 'CREATE_ENTITY', id: PropertyIds.CITY_NAME, name: 'City Name', types: [] },
            { type: 'CREATE_ENTITY', id: PropertyIds.STATE_NAME, name: 'State Name', types: [] },
            { type: 'CREATE_ENTITY', id: PropertyIds.ZIP_CODE_VALUE, name: 'Zip Code Value', types: [] },
            { type: 'CREATE_ENTITY', id: PropertyIds.ADDRESS_FULL, name: 'Full Address', types: [] },
            { type: 'CREATE_ENTITY', id: PropertyIds.TIME_ZONE_NAME, name: 'Time Zone Name', types: [] },
            // Relation types
            { type: 'CREATE_ENTITY', id: RelationTypeIds.LOCATED_IN, name: 'Located In', types: [] },
            { type: 'CREATE_ENTITY', id: RelationTypeIds.IN_STATE, name: 'In State', types: [] },
            { type: 'CREATE_ENTITY', id: RelationTypeIds.HAS_ZIP, name: 'Has Zip', types: [] },
            { type: 'CREATE_ENTITY', id: RelationTypeIds.HAS_ADDRESS, name: 'Has Address', types: [] },
            { type: 'CREATE_ENTITY', id: RelationTypeIds.USES_TIME_ZONE, name: 'Uses Time Zone', types: [] }
        ];
    }
    /**
     * Generate operations to set up the License ontology
     * @returns The operations for License ontology
     */
    static generateLicenseOntologyOps() {
        return [
            // Entity types
            { type: 'CREATE_ENTITY', id: TypeIds.LICENSE, name: 'License', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.LICENSE_TYPE, name: 'License Type', types: [] },
            // Property types
            { type: 'CREATE_ENTITY', id: PropertyIds.LICENSE_NUMBER, name: 'License Number', types: [] },
            { type: 'CREATE_ENTITY', id: PropertyIds.DATE_ORIGINALLY_LICENSED, name: 'Date Originally Licensed', types: [] },
            // Relation types
            { type: 'CREATE_ENTITY', id: RelationTypeIds.GRANTED_TO, name: 'Granted To', types: [] },
            { type: 'CREATE_ENTITY', id: RelationTypeIds.HAS_TYPE, name: 'Has Type', types: [] }
        ];
    }
    /**
     * Generate operations to set up the Date ontology
     * @returns The operations for Date ontology
     */
    static generateDateOntologyOps() {
        return [
            // Entity types
            { type: 'CREATE_ENTITY', id: TypeIds.DATE, name: 'Date', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.SCHEDULE, name: 'Schedule', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.SCHEDULE_ENTRY, name: 'Schedule Entry', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.DAY_OF_WEEK, name: 'Day of Week', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.TIME, name: 'Time', types: [] },
            { type: 'CREATE_ENTITY', id: TypeIds.STATUS, name: 'Status', types: [] },
            // Property types
            { type: 'CREATE_ENTITY', id: PropertyIds.DATE_VALUE, name: 'Date Value', types: [] },
            { type: 'CREATE_ENTITY', id: PropertyIds.TIME_VALUE, name: 'Time Value', types: [] },
            { type: 'CREATE_ENTITY', id: PropertyIds.DAY, name: 'Day', types: [] },
            // Relation types
            { type: 'CREATE_ENTITY', id: RelationTypeIds.ISSUED_ON, name: 'Issued On', types: [] },
            { type: 'CREATE_ENTITY', id: RelationTypeIds.EXPIRES_ON, name: 'Expires On', types: [] },
            { type: 'CREATE_ENTITY', id: RelationTypeIds.HAS_OPERATION_HOURS, name: 'Has Operation Hours', types: [] }
        ];
    }
    /**
     * Set up a specific ontology space
     * @param spaceId The space ID
     * @param generateOpsFn The function to generate operations
     * @param spaceName The name of the ontology space
     */
    static async setupOntology(spaceId, generateOpsFn, spaceName) {
        if (!spaceId) {
            throw new Error(`${spaceName} space ID is required. Set ${spaceName.toUpperCase()}_SPACE_ID in .env file or provide it as an argument.`);
        }
        const ops = generateOpsFn();
        console.log(`Setting up ${spaceName} ontology for space ${spaceId} with ${ops.length} operations`);
        const { TransactionService } = await import('./transaction-service.js');
        try {
            const txHash = await TransactionService.submitOperations(spaceId, ops);
            console.log(`${spaceName} ontology setup complete. Transaction hash: ${txHash}`);
        }
        catch (error) {
            console.error(`Failed to set up ${spaceName} ontology:`, error);
            throw error;
        }
    }
    /**
     * Set up the Facility ontology
     * @param spaceId The facility space ID
     */
    static async setupFacilityOntology(spaceId = SpaceIds.FACILITY) {
        await this.setupOntology(spaceId, this.generateFacilityOntologyOps, 'Facility');
    }
    /**
     * Set up the License ontology
     * @param spaceId The license space ID
     */
    static async setupLicenseOntology(spaceId = SpaceIds.LICENSE) {
        await this.setupOntology(spaceId, this.generateLicenseOntologyOps, 'License');
    }
    /**
     * Set up the Date ontology
     * @param spaceId The date space ID
     */
    static async setupDateOntology(spaceId = SpaceIds.DATE) {
        await this.setupOntology(spaceId, this.generateDateOntologyOps, 'Date');
    }
    /**
    * Set up the Location ontology
    * @param spaceId The location space ID
    */
    static async setupLocationOntology(spaceId = SpaceIds.LOCATION) {
        await this.setupOntology(spaceId, this.generateLocationOntologyOps, 'Location');
    }
    /**
     * Set up all ontologies (Facility, License, Date, Location)
     */
    static async setupOntologies(facilitySpaceId = SpaceIds.FACILITY, licenseSpaceId = SpaceIds.LICENSE, dateSpaceId = SpaceIds.DATE, locationSpaceId = SpaceIds.LOCATION) {
        await this.setupFacilityOntology(facilitySpaceId);
        await this.setupLicenseOntology(licenseSpaceId);
        await this.setupDateOntology(dateSpaceId);
        await this.setupLocationOntology(locationSpaceId);
    }
}
//# sourceMappingURL=ontology-service.js.map