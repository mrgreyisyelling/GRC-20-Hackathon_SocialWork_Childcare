import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from 'utils.js';
export function processOwner(data) {
    const ops = [];
    // Create Owner entity and attributes
    const ownerOp = getOrCreateEntity("Owner", data);
    const attributes = getOrCreateAttributes("Owner", data);
    // Create related entities
    const phoneOp = getOrCreateEntity("PhoneNumber", data);
    const facilityOp = getOrCreateEntity("Facility", data);
    const licenseOp = getOrCreateEntity("License", data);
    // Create relationships
    const relationships = [
        getOrCreateRelationship(ownerOp.id, phoneOp.id, "HAS_PHONE"),
        getOrCreateRelationship(ownerOp.id, facilityOp.id, "OWNS_FACILITY"),
        getOrCreateRelationship(ownerOp.id, licenseOp.id, "HOLDS_LICENSE"),
    ];
    return [ownerOp, ...attributes, phoneOp, facilityOp, licenseOp, ...relationships];
}
//# sourceMappingURL=owner.js.map