/**
 * Ontology Service
 *
 * Provides services for setting up and managing the ontology for the childcare data.
 */
import { EntityOp } from 'core/graph.js';
/**
 * Ontology Service
 *
 * Handles ontology creation for Facility, License, and Date spaces.
 */
export declare class OntologyService {
    /**
     * Generate operations to set up the Facility ontology
     * @returns The operations for Facility ontology
     */
    static generateFacilityOntologyOps(): EntityOp[];
    /**
       * Generate operations to set up the Location ontology
       * @returns The operations for Location ontology
       */
    static generateLocationOntologyOps(): EntityOp[];
    /**
     * Generate operations to set up the License ontology
     * @returns The operations for License ontology
     */
    static generateLicenseOntologyOps(): EntityOp[];
    /**
     * Generate operations to set up the Date ontology
     * @returns The operations for Date ontology
     */
    static generateDateOntologyOps(): EntityOp[];
    /**
     * Set up a specific ontology space
     * @param spaceId The space ID
     * @param generateOpsFn The function to generate operations
     * @param spaceName The name of the ontology space
     */
    static setupOntology(spaceId: string, generateOpsFn: () => EntityOp[], spaceName: string): Promise<void>;
    /**
     * Set up the Facility ontology
     * @param spaceId The facility space ID
     */
    static setupFacilityOntology(spaceId?: string): Promise<void>;
    /**
     * Set up the License ontology
     * @param spaceId The license space ID
     */
    static setupLicenseOntology(spaceId?: string): Promise<void>;
    /**
     * Set up the Date ontology
     * @param spaceId The date space ID
     */
    static setupDateOntology(spaceId?: string): Promise<void>;
    /**
    * Set up the Location ontology
    * @param spaceId The location space ID
    */
    static setupLocationOntology(spaceId?: string): Promise<void>;
    /**
     * Set up all ontologies (Facility, License, Date, Location)
     */
    static setupOntologies(facilitySpaceId?: string, licenseSpaceId?: string, dateSpaceId?: string, locationSpaceId?: string): Promise<void>;
}
