import { getOrCreateEntity, getOrCreateAttributes } from '../utils.js';
export function processStatus(data) {
    const ops = [];
    // Retrieve or create Status entity
    const statusId = getOrCreateEntity("Status", data);
    const attributes = getOrCreateAttributes("Status", data);
    // Relationships
    const relationships = []; // No direct relationships defined in the schema for Status
    return [...ops, ...attributes, ...relationships];
}
//# sourceMappingURL=status.js.map