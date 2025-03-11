import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from 'utils.js';
export function processOwner(data) {
    const ops = [];
    const ownerId = getOrCreateEntity("Owner", data);
    const attributes = getOrCreateAttributes("Owner", data);
    const phoneId = getOrCreateEntity("PhoneNumber", data);
    const facilityId = getOrCreateEntity("Facility", data);
    const licenseId = getOrCreateEntity("License", data);
    const relationships = [
        getOrCreateRelationship(ownerId, phoneId, "HAS_PHONE"),
        getOrCreateRelationship(ownerId, facilityId, "OWNS_FACILITY"),
        getOrCreateRelationship(ownerId, licenseId, "HOLDS_LICENSE"),
    ];
    return [...ops, ...attributes, ...relationships];
}
//# sourceMappingURL=owner.js.map