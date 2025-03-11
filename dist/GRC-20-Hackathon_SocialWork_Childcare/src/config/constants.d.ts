/**
 * Constants
 *
 * This file defines constants used throughout the application.
 */
/**
 * Type IDs
 *
 * These IDs are used to identify entity types in the GRC-20 space.
 */
export declare const TypeIds: {
    FACILITY: string;
    LOCATION: string;
    OWNER: string;
    SCHOOL_DISTRICT: string;
    LICENSE: string;
    LICENSE_TYPE: string;
    DATE: string;
    SCHEDULE: string;
    SCHEDULE_ENTRY: string;
    DAY_OF_WEEK: string;
    TIME: string;
    STATUS: string;
    CITY: string;
    STATE: string;
    ZIP_CODE: string;
    ADDRESS: string;
    TIME_ZONE: string;
    PHONE_NUMBER: string;
    AGE_GROUP: string;
    BIRTH_YEAR: string;
};
/**
 * Property IDs
 *
 * These IDs are used to identify properties in the GRC-20 space.
 */
export declare const PropertyIds: {
    BIRTH_YEAR: string;
    FACILITY_NAME: string;
    FACILITY_STATUS: string;
    FACILITY_TYPE: string;
    ACCEPTS_SUBSIDIES: string;
    FULL_ADDRESS: string;
    CITY_NAME: string;
    STATE_NAME: string;
    ZIP_CODE: string;
    TIME_ZONE_NAME: string;
    ALTERNATIVE_CONTACT_NUMBER: string;
    NAME: string;
    LICENSE_NUMBER: string;
    DATE_ORIGINALLY_LICENSED: string;
    DATE_VALUE: string;
    TIME_VALUE: string;
    DAY: string;
    OPEN_TIME: string;
    CLOSE_TIME: string;
    SCHEDULE_NAME: string;
    DISTRICT_NAME: string;
    PHONE_NUMBER: string;
    AGE_LABEL: string;
    STATUS_VALUE: string;
    STATUS: string;
    STATUS_LABEL: string;
};
/**
 * Relation Type IDs
 *
 * These IDs are used to identify relation types in the GRC-20 space.
 */
export declare const RelationTypeIds: {
    LOCATED_AT: string;
    OWNED_BY: string;
    LICENSED_UNDER: string;
    FOLLOWS_SCHEDULE: string;
    AFFILIATED_WITH: string;
    LOCATED_IN: string;
    IN_STATE: string;
    HAS_ZIP: string;
    HAS_ADDRESS: string;
    USES_TIMEZONE: string;
    HAS_PHONE: string;
    HOLDS_LICENSE: string;
    GRANTED_TO: string;
    HAS_TYPE: string;
    ISSUED_ON: string;
    EXPIRES_ON: string;
    HAS_OPERATION_HOURS: string;
    HAS_DAY: string;
    OPENS_AT: string;
    CLOSES_AT: string;
    OVERSEES: string;
    BORN_IN: string;
    BELONGS_TO: string;
    USED_IN: string;
};
/**
 * Space IDs
 *
 * These IDs identify the GRC-20 spaces for Facility, License, Date, and Location.
 */
export declare const SpaceIds: {
    FACILITY: string;
    LICENSE: string;
    DATE: string;
    LOCATION: string;
};
