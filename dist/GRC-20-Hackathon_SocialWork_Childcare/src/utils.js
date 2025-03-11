/** Ensures an entity exists and returns its operation */
export function getOrCreateEntity(type, data) {
    const entityId = `${type.toLowerCase()}-${data[type.toLowerCase()]}`;
    return {
        type: 'CREATE_ENTITY',
        id: entityId,
        name: data[type.toLowerCase()],
        types: [type]
    };
}
/** Extracts attributes for a given entity */
export function getOrCreateAttributes(type, data) {
    return Object.entries(data).map(([key, value]) => ({
        type: 'SET_PROPERTY',
        entityId: `${type.toLowerCase()}-${data[type.toLowerCase()]}`,
        propertyId: key,
        value: { type: 'TEXT', value }
    }));
}
/** Creates relationships between entities */
export function getOrCreateRelationship(fromId, toId, relationType) {
    return {
        type: 'CREATE_RELATION',
        id: `${relationType}-${fromId}-${toId}`,
        fromId,
        toId,
        relationTypeId: relationType
    };
}
//# sourceMappingURL=utils.js.map