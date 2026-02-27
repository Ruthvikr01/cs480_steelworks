-- ========================
-- LOTS
-- ========================
CREATE TABLE lots (
    id                BIGSERIAL PRIMARY KEY,
    lot_id            VARCHAR(50) NOT NULL UNIQUE,
    part_number       VARCHAR(50) NOT NULL,
    production_date   DATE NOT NULL,
    status            VARCHAR(20) NOT NULL
        CHECK (status IN ('planned','in_progress','completed','scrapped'))
);

CREATE INDEX idx_lots_date ON lots(production_date);

-- ========================
-- PRODUCTION LINES
-- ========================
CREATE TABLE production_lines (
    id         BIGSERIAL PRIMARY KEY,
    line_name  VARCHAR(50) NOT NULL UNIQUE,
    location   VARCHAR(100)
);

-- ========================
-- PRODUCTION RECORDS
-- ========================
CREATE TABLE production_records (
    id                  BIGSERIAL PRIMARY KEY,
    lot_id              BIGINT NOT NULL,
    production_line_id  BIGINT NOT NULL,
    production_date     DATE NOT NULL,
    shift               VARCHAR(20)
        CHECK (shift IN ('day','swing','night')),
    units_planned       INTEGER NOT NULL CHECK (units_planned >= 0),
    units_actual        INTEGER NOT NULL CHECK (units_actual >= 0),
    downtime_minutes    INTEGER DEFAULT 0 CHECK (downtime_minutes >= 0),
    issue_flag          BOOLEAN NOT NULL DEFAULT FALSE,
    supervisor_notes    TEXT,

    CONSTRAINT fk_production_lot
        FOREIGN KEY (lot_id)
        REFERENCES lots(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_production_line
        FOREIGN KEY (production_line_id)
        REFERENCES production_lines(id)
        ON DELETE RESTRICT,

    CONSTRAINT uq_prod_unique_record
        UNIQUE (lot_id, production_line_id, production_date, shift)
);

CREATE INDEX idx_prod_lot ON production_records(lot_id);
CREATE INDEX idx_prod_line ON production_records(production_line_id);
CREATE INDEX idx_prod_date ON production_records(production_date);
CREATE INDEX idx_prod_lot_date ON production_records(lot_id, production_date);

-- ========================
-- INSPECTION RECORDS
-- ========================
CREATE TABLE inspection_records (
    id                BIGSERIAL PRIMARY KEY,
    lot_id            BIGINT NOT NULL,
    inspection_date   DATE NOT NULL,
    defect_count      INTEGER NOT NULL CHECK (defect_count >= 0),
    inspection_result VARCHAR(20) NOT NULL
        CHECK (inspection_result IN ('pass','fail','rework','hold')),
    inspector         VARCHAR(100),
    inspection_notes  TEXT,

    CONSTRAINT fk_inspection_lot
        FOREIGN KEY (lot_id)
        REFERENCES lots(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_inspection_lot ON inspection_records(lot_id);
CREATE INDEX idx_inspection_date ON inspection_records(inspection_date);

-- ========================
-- SHIPPING RECORDS
-- ========================
CREATE TABLE shipping_records (
    id                BIGSERIAL PRIMARY KEY,
    lot_id            BIGINT NOT NULL,
    ship_date         DATE,
    customer          VARCHAR(100),
    destination       VARCHAR(100),
    carrier           VARCHAR(50),
    tracking_number   VARCHAR(100) UNIQUE,
    quantity_shipped  INTEGER CHECK (quantity_shipped >= 0),
    shipment_status   VARCHAR(20) NOT NULL
        CHECK (shipment_status IN ('pending','shipped','delivered','hold','cancelled')),
    hold_reason       TEXT,
    shipping_notes    TEXT,

    CONSTRAINT fk_shipping_lot
        FOREIGN KEY (lot_id)
        REFERENCES lots(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_shipping_lot ON shipping_records(lot_id);
CREATE INDEX idx_shipping_date ON shipping_records(ship_date);
CREATE INDEX idx_shipping_status ON shipping_records(shipment_status);
