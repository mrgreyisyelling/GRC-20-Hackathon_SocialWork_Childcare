import { getOrCreateEntity, getOrCreateAttributes } from '../utils.js';
export function processTime(data) {
    const ops = [];
    // Retrieve or create Time entity
    const timeId = getOrCreateEntity("Time", data);
    const attributes = getOrCreateAttributes("Time", data);
    // Relationships
    const relationships = []; // No direct relationships defined in the schema for Time
    return [...ops, ...attributes, ...relationships];
}
//# sourceMappingURL=time.js.map