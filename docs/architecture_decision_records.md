# Architecture Decision Records

---

## Title
Client–Server Architecture for Campus Event Hub

## Status
Accepted

## Context
The Campus Event Hub is an internal university web system used by students, student organization leaders, and staff administrators. The system supports event submission, review, publishing, and discovery. The project has a small engineering team (2–4 developers), low to moderate concurrent usage, and no strict real-time or high-availability requirements. Simplicity, maintainability, and ease of development are key priorities.

## Decision
Adopt a Client–Server architecture where a web-based client communicates with a centralized backend server responsible for business logic, data validation, and database interactions.

## Alternatives Considered
- Event-Driven Architecture
- Peer-to-Peer Architecture

## Consequences

### Positive
- Simple and well-understood architecture
- Natural fit for request–response workflows
- Easier debugging and testing
- Low operational overhead
- Suitable for small teams and internal systems

### Negative
- Limited scalability compared to event-driven systems
- Tighter coupling between client and server compared to asynchronous models

---

## Title
Monolithic Deployment Strategy

## Status
Accepted

## Context
The application is developed by a small team with limited operational resources. The system consists of closely related features such as event submission, browsing, and administrative review. Rapid development and ease of deployment are prioritized over independent scaling of components.

## Decision
Deploy the system as a single monolithic application containing all features and modules.

## Alternatives Considered
- Microservices Architecture

## Consequences

### Positive
- Simplified deployment and CI/CD pipeline
- Easier local development and testing
- Lower infrastructure and operational cost
- Faster feature delivery for small teams

### Negative
- Limited independent scaling of features
- Larger codebase as the system grows

---

## Title
Layered Code Organization

## Status
Accepted

## Context
The system must be easy to maintain and extend over time. Developers may change validation rules, database logic, or presentation logic independently. Clear separation of responsibilities is required to avoid unintended side effects.

## Decision
Use a layered architecture separating concerns into presentation, business logic, and data access layers.

## Alternatives Considered
- Feature-Based Architecture

## Consequences

### Positive
- Clear separation of concerns
- Improved maintainability
- Easier onboarding for new developers
- Changes in one layer have minimal impact on others

### Negative
- Risk of overly large service layers if not managed carefully

---

## Title
Single Shared Database

## Status
Accepted

## Context
All core features revolve around a central Event entity with related metadata such as status, organizer, and timestamps. Data consistency and relational queries are important.

## Decision
Use a single shared relational database for all application data.

## Alternatives Considered
- Database per Service

## Consequences

### Positive
- Strong data consistency (ACID guarantees)
- Simplified data management and reporting
- Easier backups and migrations

### Negative
- Tighter coupling between application modules and the database schema

---

## Title
Synchronous Interaction Model

## Status
Accepted

## Context
Users expect immediate feedback when submitting events, browsing listings, and approving or rejecting submissions. Acceptance criteria explicitly require near-instant responses.

## Decision
Use synchronous request–response communication for core application interactions.

## Alternatives Considered
- Asynchronous Messaging

## Consequences

### Positive
- Immediate feedback to users
- Simple implementation
- Predictable control flow

### Negative
- Backend performance directly affects user experience
