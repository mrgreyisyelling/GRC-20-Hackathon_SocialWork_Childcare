import sqlite3
import hashlib
from schema import ENTITY_SCHEMAS  # Import schemas from schema.py

# Connect to SQLite database
conn = sqlite3.connect("childcare.db")
cursor = conn.cursor()

# Drop existing tables and recreate them
cursor.executescript("""
DROP TABLE IF EXISTS facilities;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS owners;
DROP TABLE IF EXISTS licenses;
DROP TABLE IF EXISTS school_districts;

CREATE TABLE facilities (
    facility_id TEXT PRIMARY KEY,
    facility_name TEXT NOT NULL,
    license_number TEXT NOT NULL,
    facility_address TEXT NOT NULL,
    phone_number TEXT,
    facility_type TEXT,
    operational_schedule TEXT,
    accepts_subsidies TEXT,
    location_id TEXT,
    owner_id TEXT,
    license_id TEXT,
    school_district_id TEXT,
    UNIQUE(facility_name, license_number, facility_address)  -- Prevents duplicates
);

CREATE TABLE locations (
    location_id TEXT PRIMARY KEY,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    UNIQUE(city, state, zip_code)  -- Ensures unique locations
);

CREATE TABLE owners (
    owner_id TEXT PRIMARY KEY,
    license_number TEXT NOT NULL,
    alternative_contact_number TEXT,
    UNIQUE(license_number)  -- Ensures unique owners by license number
);

CREATE TABLE licenses (
    license_id TEXT PRIMARY KEY,
    license_number TEXT NOT NULL,
    license_type TEXT,
    license_issue_date TEXT,
    license_expiry_date TEXT,
    UNIQUE(license_number)  -- Prevents duplicate licenses
);

CREATE TABLE school_districts (
    district_id TEXT PRIMARY KEY,
    district_name TEXT NOT NULL,
    UNIQUE(district_name)  -- Prevents duplicate school districts
);
""")


# Function to generate a unique entity ID
def generate_entity_id(value, entity_type):
    """Generate a unique ID for an entity based on its type and name."""
    unique_str = f"{entity_type}:{value}"
    return hashlib.md5(unique_str.encode()).hexdigest()

# Fetch column names from the database
cursor.execute("PRAGMA table_info(childcare_facilities);")
columns = [col[1] for col in cursor.fetchall()]

# Fetch all rows from the childcare facilities table
cursor.execute("SELECT * FROM childcare_facilities;")
rows = cursor.fetchall()

# Dictionaries to track existing entities to prevent duplicates
location_map = {}
owner_map = {}
license_map = {}
school_district_map = {}

# Process each facility row
for row_num, row in enumerate(rows, start=1):
    # Generate unique Facility ID using Name + License Number + Address
    facility_key = f"{row[columns.index('Facility Name')]}|{row[columns.index('License Number')]}|{row[columns.index('Facility Address')]}"
    facility_id = generate_entity_id(facility_key, "Facility")

    # Generate unique Location ID using City, State, and Zip Code
    location_key = f"{row[columns.index('City')]}|{row[columns.index('State')]}|{row[columns.index('Zip Code')]}"
    location_id = generate_entity_id(location_key, "Location")

    # Generate unique Owner ID using License Number
    owner_key = row[columns.index("License Number")]
    owner_id = generate_entity_id(owner_key, "Owner")

    # Generate unique License ID using License Number
    license_id = generate_entity_id(owner_key, "License")

    # Generate unique School District ID using District Name
    school_district_key = row[columns.index("School District Affiliation")]
    school_district_id = generate_entity_id(school_district_key, "School District")

    # Insert Location (Skip duplicates)
    cursor.execute("""
        INSERT OR IGNORE INTO locations (location_id, city, state, zip_code)
        VALUES (?, ?, ?, ?)
    """, (location_id, row[columns.index("City")], row[columns.index("State")], str(row[columns.index("Zip Code")])))

    # Insert Owner (Skip duplicates)
    cursor.execute("""
        INSERT OR IGNORE INTO owners (owner_id, license_number, alternative_contact_number)
        VALUES (?, ?, ?)
    """, (owner_id, owner_key, row[columns.index("Alternative Contact Number")]))

    # Insert License (Skip duplicates)
    cursor.execute("""
        INSERT OR IGNORE INTO licenses (license_id, license_number, license_type, license_issue_date, license_expiry_date)
        VALUES (?, ?, ?, ?, ?)
    """, (license_id, owner_key, row[columns.index("License Type")], row[columns.index("License Issue Date")], row[columns.index("License Expiry Date")]))

    # Insert School District (Skip duplicates)
    cursor.execute("""
        INSERT OR IGNORE INTO school_districts (district_id, district_name)
        VALUES (?, ?)
    """, (school_district_id, school_district_key))

    # Insert Facility with references to Location, Owner, License, and School District
    cursor.execute("""
        INSERT OR IGNORE INTO facilities (
            facility_id, facility_name, license_number, facility_address, phone_number, facility_type,
            operational_schedule, accepts_subsidies, location_id, owner_id, license_id, school_district_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (facility_id, row[columns.index("Facility Name")], row[columns.index("License Number")],
          row[columns.index("Facility Address")], row[columns.index("Phone Number")],
          row[columns.index("Facility Type")], row[columns.index("Operational Schedule")],
          row[columns.index("Accepts Subsidies")], location_id, owner_id, license_id, school_district_id))

    print(f"Row {row_num}: Facility - done")

# Commit changes and close connection
conn.commit()
conn.close()

print("All unique entities successfully inserted!")

