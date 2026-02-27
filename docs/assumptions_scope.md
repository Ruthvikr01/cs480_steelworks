## Assumptions & Scope

This section outlines the foundational constraints and boundaries for the Campus Event Hub project. These factors directly influence the high-level architectural decisions.

---

### 1. Assumptions

* **Internal Focus:** The system is strictly an internal university tool, not a public commercial product.
* **User Base:**
    * **Students:** Hundreds of active users browsing events.
    * **Organizers:** Dozens of organization leaders submitting events.
    * **Administrators:** A small handful (1–5) of staff members reviewing content.
* **Usage Patterns:**
    * Low to moderate concurrent usage (spikes may occur during start-of-semester or mid-terms).
    * No strict requirements for sub-second real-time updates or 99.999% high availability.
* **Engineering Resources:** * Small development team (2–4 engineers).
    * Limited operational resources; maintenance must be straightforward.
* **Infrastructure:** Cloud hosting is available, but the architecture should prioritize cost-effectiveness and low maintenance overhead.

---

### 2. Out of Scope

To ensure timely delivery and maintain focus on core functionality, the following features are **not** included in the current project phase:

* **Native Mobile Applications:** The system will be accessed via mobile-responsive web browsers only.
* **Public APIs:** No external endpoints for third-party developer integration.
* **Real-Time Features:** No live chat, streaming, or instant notifications (e.g., WebSockets).
* **Complex Permissions:** Advanced role-based access control (RBAC) beyond basic "Student," "Organizer," and "Admin" roles.
* **Advanced Analytics:** No complex data visualization, recommendation engines, or machine learning-driven event discovery.
