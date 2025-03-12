import { getOrCreateEntity, getOrCreateAttributes, getOrCreateRelationship } from 'utils.js';
export function processLocation(data) {
    const ops = [];
    // Create Location entity and attributes
    const locationOp = getOrCreateEntity("Location", data);
    const attributes = getOrCreateAttributes("Location", data);
    // Create related entities
    const cityOp = getOrCreateEntity("City", data);
    const stateOp = getOrCreateEntity("State", data);
    const zipcodeOp = getOrCreateEntity("ZipCode", data);
    const addressOp = getOrCreateEntity("Address", data);
    const timezoneOp = getOrCreateEntity("TimeZone", data);
    // Create relationships
    const relationships = [
        getOrCreateRelationship(locationOp.id, cityOp.id, "LOCATED_IN"),
        getOrCreateRelationship(locationOp.id, stateOp.id, "IN_STATE"),
        getOrCreateRelationship(locationOp.id, zipcodeOp.id, "HAS_ZIP"),
        getOrCreateRelationship(locationOp.id, addressOp.id, "HAS_ADDRESS"),
        getOrCreateRelationship(locationOp.id, timezoneOp.id, "USES_TIMEZONE"),
    ];
    return [locationOp, ...attributes, cityOp, stateOp, zipcodeOp, addressOp, timezoneOp, ...relationships];
}
//# sourceMappingURL=location.js.map