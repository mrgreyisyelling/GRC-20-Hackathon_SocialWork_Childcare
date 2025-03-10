# GRC-20 Michigan Childcare Knowledge Graph

(Coping a heavy feel from:
https://github.com/PaulieB14/GRC20-Hackathon.git
https://github.com/SpaceUY/GRC20Hackathon2025.git
https://github.com/geobrowser/hackathon-template.git

May the machine god smile on them
)

## Summary:

This is the entry for 'the Graph' decentralized knowledge graph standard, GRC-20.  This is a huge deal, and will introduce tremendous flexibility into the internet, the more people embrace it. The Graph is situated in the perfect place to take advantange of that, and I hope this entry demonstrates some of what is possible.

## Who are We?

Mike Penta is a social scientist living in Lansing, MI, starting work as a freelance developer and working as a landlord. Please keep your eyes open for Project_Spaceman - which will be my modularization of my social science, and will lean heavily on the GRC20. I look forward to sharing with you all.

Tom is a student I believe, from Nigeria. He has an essential sounding board for this project, as the possibilities presented overwhelmed my mind. If it wasn't for Tom's steadfast commitment to this project and willingness to support me through my intellectually ups and downs - I don't know if we would have made it. 

## introduction

This code is used for the GRC20 Hackathon to get data to be published using the GRC20 standard. 

### Overview

This respository provides a completed solution for transforming and publishing Childcare Facility data to GRC-20.

It implements a relationship-based data model that makes it easy to query and analyze the data.

Key features:
- Clean, modular architecture with separation of concerns
- Relationship-based data model for improved queryability
- Command-line interface for easy use

## Installation

```
# Clone the repository
git clone https://github.com/yourusername/________.git
cd childcare-data-model

# Install dependencies
npm install

# Build the project
npm run build

# ---- or -----

# Iniitialize the Node.js Project
mkdir childcare-data-model
cd childcare-data-model
npm init -y

# Install required Dependencies
npm install sqlite3 axios uuid base-58 fs-extra dotenv
npm install @graphprotocol/grc-20
```

# Configuration

create a .env file in the root directory with the following vriables:

```
# GRC-20 Space IDs
FACILITIES_SPACE_ID=your-facilities-space-id
LICENSES_SPACE_ID=your-licenses-space-id
DATE_SPACE_ID=your-date-space-id
LOCATION_SPACE_ID=your-location-space-id

# Wallet Configuration
PRIVATE_KEY=your-private-key-here
WALLET_ADDRESS=your-wallet-address-here

# Network Configuration
NETWORK=testnet
RPC_URL=https://rpc-testnet.grc-20.thegraph.com
CHAIN_ID=19411 # GRC-20 testnet chain ID

# API Keys (if needed)
GRC20_API_KEY=your-api-key

```




## Usage
-----

### Creating GRC-20 Spaces 

Before you can publish data, you need to create GRC-20 spaces:

```
npm run check-entity -- --space-id $FACILITIES_SPACE_ID


npm run create-space -- --name "Facilities" --network testnet
npm run create-space -- --name "Licenses" --network testnet
npm run create-space -- --name "Dates" --network testnet
npm run create-space -- --name "Locations" --network testnet

```

### Setting up the Ontology

After creating spaces, you need to set up the ontology:

```
# Set up ontology for all spaces (Facilities, Licenses, Dates, Locations)
npm run setup-ontology

# Set up only the Facilities ontology
npm run setup-ontology -- --facilities-only

# Set up only the Licenses ontology
npm run setup-ontology -- --licenses-only

# Set up only the Dates ontology
npm run setup-ontology -- --dates-only

# Set up only the Locations ontology
npm run setup-ontology -- --locations-only


```

### Publishing Childcare Data
Once spaces and ontology are set up, publish the data:


#cleanup
```
npm run publish-all


# Publish facility data to the space specified in FACILITIES_SPACE_ID
npm run publish-facilities

# Publish license data to the space specified in LICENSES_SPACE_ID
npm run publish-licenses

# Publish date-related data to the space specified in DATES_SPACE_ID
npm run publish-dates

# Publish location data to the space specified in LOCATIONS_SPACE_ID
npm run publish-locations



```

The publish scripts will:
    
    1. REad data from the specified database API
    2. Published the combined data to the specified GRC-20 spaces


### Deploying Spaces and Publishing data in one step

To deploy spaces, set up the ontology, and publish data all in one step, use the deploy-and-publish script:

```
# Deploy spaces, set up ontology, and publish data
npm run deploy-and-publish

```


This script will:
1. Ensure spaces exist (create them if they don't)
2. Set up the ontology for both spaces 
3. publish the data

### Using the GRC-20 CLI

This project includes a unified CLI for GRC-20 operations:

```
# Show CLI Help
npm run grc20 -- help

# Create a space
npm run grc20 -- create-space --name "Childcare Space" --network testnet

# Set up ontology only for facilities
npm run grc20 -- setup-ontology --facilities-only


```


# **📊 Data Model**

This project implements a **relationship-based data model** for **childcare facilities**, **licenses**, and **operational schedules**.

## **🏢 Facility Model**
**Facility**: Represents a childcare center.  
**Properties**:
- `facility_name`: Name of the childcare facility.
- `facility_status`: Open/Closed status.
- `facility_type`: Type (Daycare, Preschool, After-School).
- `accepts_subsidies`: Whether it accepts financial aid.

**Relations**:
- `LOCATED_AT` → **Location**  
- `OWNED_BY` → **Owner**  
- `LICENSED_UNDER` → **License**  
- `FOLLOWS_SCHEDULE` → **Schedule**  
- `AFFILIATED_WITH` → **School District**  

---

## **📍 Location Model**
**Location**: Represents the address of a facility.  
**Properties**:
- `city`, `state`, `zip_code`, `address`

**Relations**:
- `LOCATED_IN` → **City**  
- `IN_STATE` → **State**  
- `HAS_ZIP` → **Zip Code**  
- `HAS_ADDRESS` → **Address**  
- `USES_TIMEZONE` → **Time Zone**  

---

## **👤 Owner Model**
**Owner**: Represents the entity/person that owns a childcare facility.  
**Properties**:
- `contact_number`: Primary contact.

**Relations**:
- `OWNS_FACILITY` → **Facility**  
- `HOLDS_LICENSE` → **License**  

---

## **📝 License Model**
**License**: Represents childcare licensing.  
**Properties**:
- `license_number`, `date_issued`, `date_expired`

**Relations**:
- `GRANTED_TO` → **Facility**  
- `HAS_TYPE` → **License Type**  
- `ISSUED_ON` → **Date**  
- `EXPIRES_ON` → **Date**  

---

## **📅 Schedule Model**
**Schedule**: Represents daily operating hours.  
**Relations**:
- `HAS_OPERATION_HOURS` → **ScheduleEntry**  

---

## **⏰ Schedule Entry Model**
**ScheduleEntry**: Represents one day's hours.  
**Relations**:
- `HAS_DAY` → **DayOfWeek**  
- `OPENS_AT` → **Time**  
- `CLOSES_AT` → **Time**  
- `STATUS` → **Status**  

---

## **📆 Day of the Week Model**
**DayOfWeek**: Represents a specific day.  
**Properties**:
- `day`: (Monday, Tuesday, etc.)

**Relations**:
- `PART_OF` → **ScheduleEntry**  

---

## **⏳ Time Model**
**Time**: Represents a timestamp.  
**Properties**:
- `time_value`: A specific time.

**Relations**:
- `USED_IN` → **ScheduleEntry**  

---

## **🏫 School District Model**
**SchoolDistrict**: Represents a school district.  
**Properties**:
- `district_name`: Name of the district.

**Relations**:
- `OVERSEES` → **Facility**  

---

## **🔄 Status Model**
**Status**: Represents the operational status.  
**Properties**:
- `status`: (e.g., Open, Closed).

**Relations**:
- `USED_IN` → **ScheduleEntry**  

---

# Directory Structure
------

```
deeds-permits-publisher/
├── data/
│   ├── input/       # Input CSV files
│   ├── mapping/     # Mapping files (e.g., property addresses)
│   └── output/      # Output files (e.g., entity IDs)
├── src/
│   ├── cli/         # Command-line interface
│   ├── config/      # Configuration
│   ├── core/        # Core utilities
│   ├── models/      # Data models
│   ├── scripts/     # Scripts for creating spaces and publishing data
│   │   ├── deploy-space-direct.js  # Creates a new GRC-20 space
│   │   ├── publish-deeds.ts        # Publishes deed records
│   │   ├── publish-permits.ts      # Publishes permit records
│   │   ├── check-entity.ts         # Checks if an entity exists
│   │   ├── create-and-publish.ts   # Creates a space and publishes records
│   │   ├── ensure-spaces.ts        # Ensures spaces exist
│   │   ├── grc20-cli.ts            # Command-line interface
│   │   ├── deploy-and-publish.ts   # Deploys spaces, sets up ontology, and publishes data
│   │   └── old-scripts/            # Deprecated scripts kept for reference
│   ├── services/    # Services
│   └── utils/       # Utilities
├── package.json
├── tsconfig.json
└── README.md
```

# Working Scripts
------

The following scripts are the mainones used in this application:

- deploy-space-direct.js - Creates a new GRC-20 space using the correct API endpoint and transaction method
- publish-childcare_records.ts - Publishes Childcare records to a GRC-20 space
- check-entity.ts - Checks if an entity exists in a GRC-20 space
- create-and-publish.ts - Creates a space and publishes records to it
- ensure-spaces.ts - Ensures that the necessary spaces exist
- grc20-cli.ts - Command-line interface for the GRC-20 application
- deploy-and-publish.ts - Deploys spaces, sets up ontology, and publishes data in one step


# License
This project is licensed under the ISC License - see the LICENSE file for details.


# Thank you 
https://github.com/PaulieB14 - Basically I am walking through your code teaching myself. Thank you so much for writing such clear and organized code - so I could do this at the last minute on a sunday night.