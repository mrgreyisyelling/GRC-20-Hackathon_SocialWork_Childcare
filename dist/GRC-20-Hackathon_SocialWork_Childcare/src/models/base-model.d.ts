/**
 * Base Model
 *
 * This file defines the base model for all entities in the GRC-20 publisher.
 */
export declare abstract class BaseModel {
    protected id: string | null;
    protected name: string;
    constructor(id: string | null, name: string);
    /**
     * Get the ID of this entity
     *
     * @returns The entity ID or null if not set
     */
    getId(): string | null;
    /**
     * Get the name of this entity
     *
     * @returns The entity name
     */
    getName(): string;
    /**
     * Set the ID of this entity
     *
     * @param id The entity ID
     */
    setId(id: string): void;
    /**
     * Set the name of this entity
     *
     * @param name The entity name
     */
    setName(name: string): void;
}
