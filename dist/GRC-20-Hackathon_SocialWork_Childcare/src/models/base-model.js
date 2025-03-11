/**
 * Base Model
 *
 * This file defines the base model for all entities in the GRC-20 publisher.
 */
export class BaseModel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    /**
     * Get the ID of this entity
     *
     * @returns The entity ID or null if not set
     */
    getId() {
        return this.id;
    }
    /**
     * Get the name of this entity
     *
     * @returns The entity name
     */
    getName() {
        return this.name;
    }
    /**
     * Set the ID of this entity
     *
     * @param id The entity ID
     */
    setId(id) {
        this.id = id;
    }
    /**
     * Set the name of this entity
     *
     * @param name The entity name
     */
    setName(name) {
        this.name = name;
    }
}
//# sourceMappingURL=base-model.js.map