/**
 * Constants
 * 
 * This file defines constants used throughout the application.
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Type IDs
 * 
 * These IDs are used to identify entity types in the GRC-20 space.
 */
export const TypeIds = {
  // Entity types
  FACILITY: 'facility-type-id',
  LOCATION: 'location-type-id',
  OWNER: 'owner-type-id',
  SCHOOL_DISTRICT: 'school-district-type-id',
  LICENSE: 'license-type-id',
  LICENSE_TYPE: 'license-type-type-id',
  DATE: 'date-type-id',
  SCHEDULE: 'schedule-type-id',
  SCHEDULE_ENTRY: 'schedule-entry-type-id',
  DAY_OF_WEEK: 'day-of-week-type-id',
  TIME: 'time-type-id',
  STATUS: 'status-type-id',
  CITY: 'city-type-id',
  STATE: 'state-type-id',
  ZIP_CODE: 'zip-code-type-id',
  ADDRESS: 'address-type-id',
  TIME_ZONE: 'time-zone-type-id',
  PHONE_NUMBER: 'phone-number-type-id',
  AGE_GROUP: 'age-group-type-id',
  BIRTH_YEAR: 'birth-year-type-id',
};

/**
 * Property IDs
 * 
 * These IDs are used to identify properties in the GRC-20 space.
 */
export const PropertyIds = {
  // Facility properties
  FACILITY_NAME: 'facility-name-property-id',
  FACILITY_STATUS: 'facility-status-property-id',
  FACILITY_TYPE: 'facility-type-property-id',
  ACCEPTS_SUBSIDIES: 'accepts-subsidies-property-id',

  // Location properties
  FULL_ADDRESS: 'full-address-property-id',

  // City, State, Zip, TimeZone properties
  CITY_NAME: 'city-name-property-id',
  STATE_NAME: 'state-name-property-id',
  ZIP_CODE: 'zip-code-property-id',
  TIME_ZONE_NAME: 'time-zone-name-property-id',

  // Owner properties
  ALTERNATIVE_CONTACT_NUMBER: 'alternative-contact-number-property-id',

  // License properties
  LICENSE_NUMBER: 'license-number-property-id',
  DATE_ORIGINALLY_LICENSED: 'date-originally-licensed-property-id',

  // Date properties
  DATE_VALUE: 'date-value-property-id',

  // Schedule properties
  TIME_VALUE: 'time-value-property-id',
  DAY: 'day-property-id',

  // School District properties
  DISTRICT_NAME: 'district-name-property-id',

  // Phone Number properties
  PHONE_NUMBER: 'phone-number-property-id',

  // Age Group properties
  AGE_LABEL: 'age-label-property-id',

  // Birth Year properties
  YEAR: 'birth-year-property-id',

  // Status properties
  STATUS_VALUE: 'status-value-property-id',
};

/**
 * Relation Type IDs
 * 
 * These IDs are used to identify relation types in the GRC-20 space.
 */
export const RelationTypeIds = {
  // Facility relations
  LOCATED_AT: 'located-at-relation-type-id',
  OWNED_BY: 'owned-by-relation-type-id',
  LICENSED_UNDER: 'licensed-under-relation-type-id',
  FOLLOWS_SCHEDULE: 'follows-schedule-relation-type-id',
  AFFILIATED_WITH: 'affiliated-with-relation-type-id',

  // Location relations
  LOCATED_IN: 'located-in-relation-type-id',
  IN_STATE: 'in-state-relation-type-id',
  HAS_ZIP: 'has-zip-relation-type-id',
  HAS_ADDRESS: 'has-address-relation-type-id',
  USES_TIMEZONE: 'uses-timezone-relation-type-id',

  // Owner relations
  HAS_PHONE: 'has-phone-relation-type-id',
  HOLDS_LICENSE: 'holds-license-relation-type-id',

  // License relations
  GRANTED_TO: 'granted-to-relation-type-id',
  HAS_TYPE: 'has-type-relation-type-id',
  ISSUED_ON: 'issued-on-relation-type-id',
  EXPIRES_ON: 'expires-on-relation-type-id',

  // Schedule relations
  HAS_OPERATION_HOURS: 'has-operation-hours-relation-type-id',
  HAS_DAY: 'has-day-relation-type-id',
  OPENS_AT: 'opens-at-relation-type-id',
  CLOSES_AT: 'closes-at-relation-type-id',

  // School District relations
  OVERSEES: 'oversees-relation-type-id',

  // Age Group & Birth Year relations
  BORN_IN: 'born-in-relation-type-id',
  BELONGS_TO: 'belongs-to-relation-type-id',

  // Status relations
  USED_IN: 'used-in-relation-type-id',
};

/**
 * Space IDs
 * 
 * These IDs identify the GRC-20 spaces for Facility, License, Date, and Location.
 */
export const SpaceIds = {
  FACILITY: process.env.FACILITY_SPACE_ID || '',
  LICENSE: process.env.LICENSE_SPACE_ID || '',
  DATE: process.env.DATE_SPACE_ID || '',
  LOCATION: process.env.LOCATION_SPACE_ID || '',
};
