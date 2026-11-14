# System Architecture & UML Diagrams

System architecture design and workflow diagrams for the **Co-working Space Reservation System**.

## 1. Use Case Diagram

Overview of the system scope and access permissions for all actors (`User` and `Admin`).

![Use Case Diagram](./images/usecase-diagram.png)

---

## 2. Class Diagram

Data model structures, database relationships (`User`, `CoworkingSpace`, `Reservation`, `Invitation`), and controllers.

![Class Diagram](./images/class-diagram.png)

---

## 3. Sequence Diagrams

Execution workflows between the Client, Controller, Database Schema, and Centralized Error Handler for each use case.

### 3.1 Authentication

* **Register**

  ![Register Sequence](./images/seq-register.png)

* **Login**

  ![Login Sequence](./images/seq-login.png)

### 3.2 Co-working Spaces

* **View / Search Co-working Spaces**

  ![View and Search Co-working Spaces Sequence](./images/seq-view-coworking-spaces.png)

* **Manage Co-working Spaces (Admin)**

  ![Manage Co-working Spaces Sequence](./images/seq-manage-coworking-spaces.png)

### 3.3 Reservations

* **Create Reservation**

  ![Create Reservation Sequence](./images/seq-create-reservation.png)

* **View Reservations**

  ![View Reservations Sequence](./images/seq-view-reservations.png)

* **Update Reservation**

  ![Update Reservation Sequence](./images/seq-update-reservation.png)

* **Cancel Reservation**

  ![Cancel Reservation Sequence](./images/seq-cancel-reservation.png)
