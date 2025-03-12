import { getOrCreateEntity, getOrCreateAttributes } from '../utils.js';
export function processTime(data) {
    const ops = [];
    // Retrieve or create Time entity
    const timeId = getOrCreateEntity("Time", data);
    const attributes = getOrCreateAttributes("Time", data);
    // Relationships
    // Explicitly define the type of relationships
    const relationships = []; // No direct relationships defined for Status
    return [timeId, ...attributes, ...relationships];
}
//# sourceMappingURL=time.js.map