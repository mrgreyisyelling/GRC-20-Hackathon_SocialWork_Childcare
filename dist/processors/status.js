import { getOrCreateEntity, getOrCreateAttributes } from '../utils.js';
export function processStatus(data) {
    const ops = [];
    // Retrieve or create Status entity
    const statusId = getOrCreateEntity("Status", data);
    const attributes = getOrCreateAttributes("Status", data);
    // Relationships
    // Explicitly define the type of relationships
    const relationships = []; // No direct relationships defined for Status
    return [statusId, ...attributes, ...relationships];
}
//# sourceMappingURL=status.js.map