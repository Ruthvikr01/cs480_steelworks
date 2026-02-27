# Operations Analyst

This document defines the core entities, attributes, and relationships derived from the Operations Analyst user story and acceptance criteria.

---

## Entities

### Lot
- lot_id (PK)
- part_number
- production_date
- status

### Production Line
- production_line_id (PK)
- line_name
- location

### Production Record
- production_record_id (PK)
- lot_id (FK)
- production_line_id (FK)
- production_date
- shift
- units_planned
- units_actual
- downtime_minutes
- issue_flag
- supervisor_notes

### Inspection Record
- inspection_record_id (PK)
- lot_id (FK)
- inspection_date
- defect_count
- inspection_result
- inspector
- inspection_notes

### Shipping Record
- shipping_record_id (PK)
- lot_id (FK)
- ship_date
- customer
- destination
- carrier
- tracking_number
- quantity_shipped
- shipment_status
- hold_reason
- shipping_notes

---

## Relationships

- One **Lot** can have many **Production Records**
- One **Lot** can have many **Inspection Records**
- One **Lot** can have many **Shipping Records**
- One **Production Line** can have many **Production Records**
- Each **Production Record** belongs to one **Lot**
- Each **Production Record** occurs on one **Production Line**
- Each **Inspection Record** belongs to one **Lot**
- Each **Shipping Record** belongs to one **Lot**

---

## ERD (Mermaid.js)

```mermaid
erDiagram

    LOT {
        int lot_id PK
        string part_number
        date production_date
        string status
    }

    PRODUCTION_LINE {
        int production_line_id PK
        string line_name
        string location
    }

    PRODUCTION_RECORD {
        int production_record_id PK
        int lot_id FK
        int production_line_id FK
        date production_date
        string shift
        int units_planned
        int units_actual
        int downtime_minutes
        boolean issue_flag
        string supervisor_notes
    }

    INSPECTION_RECORD {
        int inspection_record_id PK
        int lot_id FK
        date inspection_date
        int defect_count
        string inspection_result
        string inspector
        string inspection_notes
    }

    SHIPPING_RECORD {
        int shipping_record_id PK
        int lot_id FK
        date ship_date
        string customer
        string destination
        string carrier
        string tracking_number
        int quantity_shipped
        string shipment_status
        string hold_reason
        string shipping_notes
    }

    LOT ||--o{ PRODUCTION_RECORD : has
    LOT ||--o{ INSPECTION_RECORD : has
    LOT ||--o{ SHIPPING_RECORD : has
    PRODUCTION_LINE ||--o{ PRODUCTION_RECORD : produces
