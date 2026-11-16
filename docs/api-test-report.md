# API Test Report

- **Collection:** CoworkingSpace API Test
- **Executed At:** 16/11/2026, 13:37:47 (GMT+7)
- **Overall Status:** ✅ PASSED (**223/223** assertions passed — **100.00%**)
- **Duration:** 23.01s (Avg response: 129ms)

## Summary by Route / Folder

| Route / Folder | Status | Requests | Assertions Passed |
| :--- | :---: | :---: | :---: |
| **Auth / Register** | ✅ Passed | 3/3 | 6/6 |
| **Auth / Login** | ✅ Passed | 7/7 | 10/10 |
| **Auth / Get Me** | ✅ Passed | 2/2 | 5/5 |
| **Auth / Logout** | ✅ Passed | 3/3 | 4/4 |
| **Co-working Space / Create** | ✅ Passed | 3/3 | 8/8 |
| **Co-working Space / Get All** | ✅ Passed | 7/7 | 17/17 |
| **Co-working Space / Get By ID** | ✅ Passed | 3/3 | 7/7 |
| **Co-working Space / Update** | ✅ Passed | 3/3 | 9/9 |
| **Co-working Space / Delete** | ✅ Passed | 4/4 | 8/8 |
| **Reservation / Create** | ✅ Passed | 8/8 | 14/14 |
| **Reservation / Get All** | ✅ Passed | 3/3 | 12/12 |
| **Reservation / Get By ID** | ✅ Passed | 5/5 | 15/15 |
| **Reservation / Update** | ✅ Passed | 5/5 | 14/14 |
| **Reservation / Delete** | ✅ Passed | 6/6 | 14/14 |
| **Invitation / Create** | ✅ Passed | 6/6 | 14/14 |
| **Invitation / Get All** | ✅ Passed | 3/3 | 12/12 |
| **Invitation / Get By ID** | ✅ Passed | 6/6 | 20/20 |
| **Invitation / Respond** | ✅ Passed | 19/19 | 19/19 |
| **Invitation / Delete** | ✅ Passed | 8/8 | 15/15 |

## Overall Metrics

| Metric | Total | Passed | Failed |
| :--- | :---: | :---: | :---: |
| **Iterations** | 1 | 1 | 0 |
| **Requests** | 104 | 104 | 0 |
| **Assertions (Tests)** | 223 | 223 | 0 |

## Execution Details

### Auth / Register

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `POST` | Register - Success | 201 Created | 268ms | ✅ Register success, 201 Created<br>✅ Register returns response body |
| 2 | `POST` | Register - Duplicate Email | 400 Bad Request | 172ms | ✅ Register fail, 400 Bad Request<br>✅ Error message: Duplicate email |
| 3 | `POST` | Register - Invalid Email | 400 Bad Request | 8ms | ✅ Register fail, 400 Bad Request<br>✅ Error message: Invalid email |

### Auth / Login

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `POST` | Login - User Success | 200 OK | 163ms | ✅ Login success, 200 OK |
| 2 | `POST` | Login - Wrong Password | 401 Unauthorized | 161ms | ✅ Login fail, 401 Unauthorized<br>✅ Error message: Invalid credentials |
| 3 | `POST` | Login - Missing Creditials | 400 Bad Request | 6ms | ✅ Login fail, 400 Bad Request<br>✅ Error message: Missing credentials |
| 4 | `POST` | Login - User Not Found | 401 Unauthorized | 42ms | ✅ Login fail, 401 Unauthorized<br>✅ Error message: Invalid credentials |
| 5 | `POST` | Login - Admin | 200 OK | 143ms | ✅ Login success, 200 OK |
| 6 | `POST` | Login - User 1 | 200 OK | 145ms | ✅ Login success, 200 OK |
| 7 | `POST` | Login - User 2 | 200 OK | 154ms | ✅ Login success, 200 OK |

### Auth / Get Me

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `GET` | Get Me - Authenticated | 200 OK | 83ms | ✅ Get me success, 200 OK<br>✅ Get Me returns user data<br>✅ Get Me returns correct user role |
| 2 | `GET` | Get Me - Invalid Token | 401 Unauthorized | 5ms | ✅ Get me success, 401 Unauthorized<br>✅ Error message: not authorized |

### Auth / Logout

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `GET` | Logout - User 1 | 200 OK | 5ms | ✅ Logout success, 200 OK |
| 2 | `GET` | Get Me - After Logout | 401 Unauthorized | 5ms | ✅ Get current user after logout, 401 Unauthorized<br>✅ Error message: not authorized |
| 3 | `POST` | Login - Build - User 1 | 200 OK | 158ms | ✅ Login success, 200 OK |

### Co-working Space / Create

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `POST` | Create - Success | 201 Created | 95ms | ✅ Create coworking space success, 201 Created<br>✅ Create coworking space returns correct response structure<br>✅ Create coworking space returns correct data<br>✅ Create coworking space stores ID |
| 2 | `POST` | Create - Missing Required Fields | 400 Bad Request | 41ms | ✅ Create coworking space with missing name, 400 Bad Request<br>✅ Create coworking space returns name validation error |
| 3 | `POST` | Create - Invalid Data | 400 Bad Request | 41ms | ✅ Create coworking space with invalid capacity, 400 Bad Request<br>✅ Create coworking space returns capacity validation error |

### Co-working Space / Get All

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `GET` | Get All - Default | 200 OK | 87ms | ✅ Get all coworking spaces success, 200 OK<br>✅ Get all coworking spaces returns correct response structure<br>✅ Get all coworking spaces uses default pagination |
| 2 | `GET` | Get All - Pagination | 200 OK | 95ms | ✅ Get coworking spaces with pagination success, 200 OK<br>✅ Get coworking spaces returns correct pagination data |
| 3 | `GET` | Get All - Select Fields | 200 OK | 81ms | ✅ Get coworking spaces with selected fields success, 200 OK<br>✅ Get coworking spaces returns only selected fields |
| 4 | `GET` | Get All - Sort | 200 OK | 80ms | ✅ Get coworking spaces with sorting success, 200 OK<br>✅ Get coworking spaces are sorted by createdAt descending |
| 5 | `GET` | Get All - Filter | 200 OK | 72ms | ✅ Get all coworking spaces success, 200 OK<br>✅ Get all coworking spaces returns correct response structure<br>✅ Get all coworking spaces returns matching name<br>✅ Get all coworking spaces count matches returned data |
| 6 | `GET` | Get All - Filter by Name (Non-existing Name) | 200 OK | 76ms | ✅ Get coworking spaces with non-existing name success, 200 OK<br>✅ Get coworking spaces returns empty data |
| 7 | `GET` | Get All - Comparison Operator | 200 OK | 81ms | ✅ Get coworking spaces with comparison operator success, 200 OK<br>✅ Get coworking spaces returns data matching comparison condition |

### Co-working Space / Get By ID

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `GET` | Get By ID - Success | 200 OK | 84ms | ✅ Get coworking space by ID success, 200 OK<br>✅ Get coworking space by ID returns correct response structure<br>✅ Get coworking space by ID returns the correct coworking space |
| 2 | `GET` | Get By ID - Invalid ID | 400 Bad Request | 5ms | ✅ Get coworking space with invalid ID returns 400 Bad Request<br>✅ Get coworking space with invalid ID returns correct error |
| 3 | `GET` | Get By ID - Non-existing ID | 404 Not Found | 53ms | ✅ Get coworking space with non-existing ID returns 404 Not Found<br>✅ Get coworking space with non-existing ID returns correct error |

### Co-working Space / Update

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `PUT` | Update - Success | 200 OK | 90ms | ✅ Update coworking space success, 200 OK<br>✅ Update coworking space returns correct response structure<br>✅ Update coworking space returns updated name<br>✅ Update coworking space returns updated maximum capacity<br>✅ Update coworking space returns the correct ID |
| 2 | `PUT` | Update - Invalid ID | 400 Bad Request | 41ms | ✅ Update coworking space with invalid ID returns 400 Bad Request<br>✅ Update coworking space with invalid ID returns error message |
| 3 | `PUT` | Update - Non-existing ID | 404 Not Found | 84ms | ✅ Update coworking space with non-existing ID returns 404 Not Found<br>✅ Update coworking space with non-existing ID returns error response |

### Co-working Space / Delete

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `DELETE` | Delete - Success | 200 OK | 183ms | ✅ Delete coworking space success, 200 OK<br>✅ Delete coworking space returns success response |
| 2 | `GET` | Delete - Check delete result | 404 Not Found | 39ms | ✅ Deleted coworking space cannot be retrieved, 404 Not Found<br>✅ Deleted coworking space returns error response |
| 3 | `DELETE` | Delete - Invalid ID | 400 Bad Request | 40ms | ✅ Delete coworking space with invalid ID returns 400 Bad Request<br>✅ Delete coworking space with invalid ID returns error message |
| 4 | `DELETE` | Delete - Non-existing ID | 404 Not Found | 80ms | ✅ Delete coworking space with non-existing ID returns 404 Not Found<br>✅ Delete coworking space with non-existing ID returns error response |

### Reservation / Create

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `POST` | Create - Success | 201 Created | 266ms | ✅ Create Reservation success, 201 Created<br>✅ Create Reservation returns success<br>✅ Create Reservation returns reservation data<br>✅ Reservation data matches request |
| 2 | `POST` | Create - Missing Reserve Date | 400 Bad Request | 116ms | ✅ Create Reservation without reserve date, 400 Bad Request<br>✅ Create Reservation returns error |
| 3 | `POST` | Create - Invalid Reserve Date Format | 400 Bad Request | 115ms | ✅ Create Reservation with invalid date format, 400 Bad Request<br>✅ Create Reservation returns error |
| 4 | `POST` | Create - Non-existing Co-working Space | 404 Not Found | 79ms | ✅ Create Reservation with non-existing Co-working Space, 404 Not Found<br>✅ Create Reservation returns error |
| 5 | `POST` | Create - Duplicate Reservation | 400 Bad Request | 149ms | ✅ Create Duplicate Reservation, 400 Bad Request<br>✅ Create Duplicate Reservation returns error |
| 6 | `POST` | Create - Build 1 - Exceed Reservation Limit | 201 Created | 177ms | _No tests_ |
| 7 | `POST` | Create - Build 2 - Exceed Reservation Limit | 201 Created | 182ms | _No tests_ |
| 8 | `POST` | Create - Exceed Reservation Limit | 400 Bad Request | 112ms | ✅ Create Reservation exceeding limit, 400 Bad Request<br>✅ Create Reservation exceeding limit returns error |

### Reservation / Get All

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `GET` | Get All - Admin | 200 OK | 126ms | ✅ Get All Reservations success, 200 OK<br>✅ Get All Reservations returns success<br>✅ Get All Reservations returns reservation list<br>✅ Get All Reservations returns valid reservation data |
| 2 | `GET` | Get All - User | 200 OK | 123ms | ✅ Get All Reservations success, 200 OK<br>✅ Get All Reservations returns success<br>✅ Get All Reservations returns reservation list<br>✅ User only receives their own or co-booked reservations |
| 3 | `GET` | Get All - By Co-working Space | 200 OK | 82ms | ✅ Get All Reservations by Co-working Space success, 200 OK<br>✅ Get All Reservations by Co-working Space returns success<br>✅ Get All Reservations by Co-working Space returns reservation list<br>✅ Reservations belong to the requested Co-working Space |

### Reservation / Get By ID

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `GET` | Get By ID - Owner | 200 OK | 168ms | ✅ Get Reservation by ID success, 200 OK<br>✅ Get Reservation by ID returns success<br>✅ Get Reservation by ID returns reservation data<br>✅ Reservation data matches requested ID<br>✅ Owner can view all reservation invitations |
| 2 | `GET` | Get By ID - Admin | 200 OK | 163ms | ✅ Get Reservation as Admin success, 200 OK<br>✅ Get Reservation as Admin returns success<br>✅ Get Reservation as Admin returns reservation data<br>✅ Admin can view all reservation invitations |
| 3 | `GET` | Get By ID - Non-owner | 403 Forbidden | 75ms | ✅ Get Reservation as Non-owner, 403 Forbidden<br>✅ Get Reservation as Non-owner returns error |
| 4 | `GET` | Get By ID - Invalid ID | 400 Bad Request | 45ms | ✅ Get Reservation with invalid ID, 400 Bad Request<br>✅ Get Reservation with invalid ID returns error |
| 5 | `GET` | Get By ID - Non-existing ID | 404 Not Found | 80ms | ✅ Get Reservation with non-existing ID, 404 Not Found<br>✅ Get Reservation with non-existing ID returns error |

### Reservation / Update

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `PUT` | Update - Owner | 200 OK | 164ms | ✅ Update Reservation success, 200 OK<br>✅ Update Reservation returns success<br>✅ Update Reservation returns reservation data<br>✅ Updated reservation data matches request |
| 2 | `PUT` | Update - Admin | 200 OK | 173ms | ✅ Update Reservation as Admin success, 200 OK<br>✅ Update Reservation as Admin returns success<br>✅ Update Reservation as Admin returns reservation data<br>✅ Updated reservation data matches request |
| 3 | `PUT` | Update - Non-owner | 403 Forbidden | 155ms | ✅ Update Reservation as Non-owner, 403 Forbidden<br>✅ Update Reservation as Non-owner returns error |
| 4 | `PUT` | Update - Invalid ID | 400 Bad Request | 71ms | ✅ Update Reservation with invalid ID, 400 Bad Request<br>✅ Update Reservation with invalid ID returns error |
| 5 | `PUT` | Update - Non-existing ID | 404 Not Found | 84ms | ✅ Update Reservation with non-existing ID, 404 Not Found<br>✅ Update Reservation with non-existing ID returns error |

### Reservation / Delete

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `DELETE` | Delete - Owner | 200 OK | 217ms | ✅ Delete Reservation success, 200 OK<br>✅ Delete Reservation returns success<br>✅ Delete Reservation returns empty data |
| 2 | `GET` | Get By ID - After Delete | 404 Not Found | 110ms | ✅ Get Deleted Reservation, 404 Not Found<br>✅ Deleted Reservation returns error |
| 3 | `DELETE` | Delete - Admin | 200 OK | 215ms | ✅ Delete Reservation as Admin success, 200 OK<br>✅ Delete Reservation as Admin returns success<br>✅ Delete Reservation as Admin returns empty data |
| 4 | `DELETE` | Delete - Non-owner | 403 Forbidden | 86ms | ✅ Delete Reservation as Non-owner, 403 Forbidden<br>✅ Delete Reservation as Non-owner returns error |
| 5 | `DELETE` | Delete - Invalid ID | 400 Bad Request | 43ms | ✅ Delete Reservation with invalid ID, 400 Bad Request<br>✅ Delete Reservation with invalid ID returns error |
| 6 | `DELETE` | Delete - Non-existing ID | 404 Not Found | 84ms | ✅ Delete Reservation with non-existing ID, 404 Not Found<br>✅ Delete Reservation with non-existing ID returns error |

### Invitation / Create

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `POST` | Create - Success | 201 Created | 236ms | ✅ Create Invitation success, 201 Created<br>✅ Create Invitation returns success<br>✅ Create Invitation returns invitation data<br>✅ Invitation data matches request |
| 2 | `POST` | Create - Missing Email | 400 Bad Request | 59ms | ✅ Create Invitation without email, 400 Bad Request<br>✅ Create Invitation without email returns error |
| 3 | `POST` | Create - User Not Found | 404 Not Found | 85ms | ✅ Create Invitation with non-existing user, 404 Not Found<br>✅ Create Invitation with non-existing user returns error |
| 4 | `POST` | Create - Non-owner | 403 Forbidden | 147ms | ✅ Create Invitation as Non-owner, 403 Forbidden<br>✅ Create Invitation as Non-owner returns error |
| 5 | `POST` | Create - Self Invitation | 400 Bad Request | 149ms | ✅ Create Self Invitation, 400 Bad Request<br>✅ Create Self Invitation returns error |
| 6 | `POST` | Create - Already Invited | 400 Bad Request | 157ms | ✅ Create Invitation for existing Co-booker, 400 Bad Request<br>✅ Create Invitation for existing Co-booker returns error |

### Invitation / Get All

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `GET` | Get All - Admin | 200 OK | 183ms | ✅ Get All Invitations success, 200 OK<br>✅ Get All Invitations returns success<br>✅ Get All Invitations returns invitation list<br>✅ Get All Invitations returns valid invitation data |
| 2 | `GET` | Get All - User | 200 OK | 269ms | ✅ Get All Invitations as User success, 200 OK<br>✅ Get All Invitations as User returns success<br>✅ Get All Invitations as User returns invitation list<br>✅ User only receives invitations where they are inviter or recipient |
| 3 | `GET` | Get All - By Reservation | 200 OK | 296ms | ✅ Get All Invitations by Reservation success, 200 OK<br>✅ Get All Invitations by Reservation returns success<br>✅ Get All Invitations by Reservation returns invitation list<br>✅ All invitations belong to requested Reservation |

### Invitation / Get By ID

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `GET` | Get By ID - Inviter | 200 OK | 158ms | ✅ Get Invitation by ID success, 200 OK<br>✅ Get Invitation by ID returns success<br>✅ Get Invitation by ID returns invitation data<br>✅ Invitation ID matches requested ID<br>✅ Invitation inviter matches current user ID |
| 2 | `GET` | Get By ID - Recipient | 200 OK | 150ms | ✅ Get Invitation by ID success, 200 OK<br>✅ Get Invitation by ID returns success<br>✅ Get Invitation by ID returns invitation data<br>✅ Invitation ID matches requested ID<br>✅ Invitation recipient matches user2 ID |
| 3 | `GET` | Get By ID - Admin | 200 OK | 155ms | ✅ Get Invitation by ID success, 200 OK<br>✅ Get Invitation by ID returns success<br>✅ Get Invitation by ID returns invitation data<br>✅ Invitation ID matches requested ID |
| 4 | `GET` | Get By ID - Non-owner | 403 Forbidden | 160ms | ✅ Get Invitation as Non-owner, 403 Forbidden<br>✅ Get Invitation as Non-owner returns error |
| 5 | `GET` | Get By ID - Invalid ID | 400 Bad Request | 39ms | ✅ Get Invitation with invalid ID, 400 Bad Request<br>✅ Get Invitation with invalid ID returns error |
| 6 | `GET` | Get By ID - Non-existing ID | 404 Not Found | 81ms | ✅ Get Invitation with non-existing ID, 404 Not Found<br>✅ Get Invitation with non-existing ID returns error |

### Invitation / Respond

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `PUT` | Accept - Success | 200 OK | 331ms | ✅ Accept Invitation success, 200 OK<br>✅ Accept Invitation returns success<br>✅ Accept Invitation returns invitation data<br>✅ Invitation status is accepted |
| 2 | `GET` | Get By ID - After Accept | 200 OK | 199ms | ✅ Accepted Co-booker is added to Reservation |
| 3 | `POST` | Create - Build - Response Decline | 201 Created | 156ms | _No tests_ |
| 4 | `PUT` | Decline - Success | 200 OK | 170ms | ✅ Decline Invitation success, 200 OK<br>✅ Decline Invitation returns success<br>✅ Decline Invitation returns invitation data<br>✅ Invitation status is declined |
| 5 | `POST` | Create - Build - Response Invalid | 201 Created | 163ms | _No tests_ |
| 6 | `PUT` | Respond - Invalid Status | 400 Bad Request | 40ms | ✅ Respond Invitation with invalid status, 400 Bad Request<br>✅ Respond Invitation with invalid status returns error |
| 7 | `PUT` | Respond - Non-recipient | 403 Forbidden | 80ms | ✅ Respond Invitation as Non-recipient, 403 Forbidden<br>✅ Respond Invitation as Non-recipient returns error |
| 8 | `PUT` | Respond - Inactive Invitation | 400 Bad Request | 89ms | ✅ Accept Invitation exceeding reservation limit, 400 Bad Request<br>✅ Accept Invitation exceeding reservation limit returns error |
| 9 | `POST` | Create - Build 1 - Exceed Reservation Capacity | 201 Created | 209ms | _No tests_ |
| 10 | `PUT` | Accept - Build 2 - Exceed Reservation Capacity | 200 OK | 373ms | _No tests_ |
| 11 | `PUT` | Accept - Exceed Reservation Capacity | 400 Bad Request | 251ms | ✅ Accept Invitation exceeding capacity, 400 Bad Request<br>✅ Accept Invitation exceeding capacity returns error |
| 12 | `POST` | Create - Build 1 - Exceed Reservation Limit | 201 Created | 250ms | _No tests_ |
| 13 | `POST` | Create - Build 2 - Exceed Reservation Limit | 201 Created | 209ms | _No tests_ |
| 14 | `POST` | Create - Build 3 - Exceed Reservation Limit | 201 Created | 192ms | _No tests_ |
| 15 | `DELETE` | Delete - Build 4 - Exceed Reservation Limit | 200 OK | 158ms | _No tests_ |
| 16 | `PUT` | Accept - Exceed Reservation Limit | 400 Bad Request | 105ms | ✅ Accept Invitation exceeding reservation limit, 400 Bad Request<br>✅ Accept Invitation exceeding reservation limit returns error |
| 17 | `DELETE` | Delete - Cleaning 1 | 200 OK | 241ms | _No tests_ |
| 18 | `DELETE` | Delete - Cleaning 2 | 200 OK | 190ms | _No tests_ |
| 19 | `DELETE` | Delete - Cleaning 3 | 200 OK | 210ms | _No tests_ |

### Invitation / Delete

| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | `DELETE` | Delete - Inviter | 200 OK | 125ms | ✅ Delete Invitation success, 200 OK<br>✅ Delete Invitation returns success<br>✅ Delete Invitation returns empty data |
| 2 | `DELETE` | Delete - Recipient | 200 OK | 123ms | ✅ Delete Invitation success, 200 OK<br>✅ Delete Invitation returns success<br>✅ Delete Invitation returns empty data |
| 3 | `DELETE` | Delete - Admin | 200 OK | 177ms | ✅ Delete Invitation success, 200 OK<br>✅ Delete Invitation returns success<br>✅ Delete Invitation returns empty data |
| 4 | `POST` | Create - Build - Delete Invalid | 201 Created | 155ms | _No tests_ |
| 5 | `DELETE` | Delete - Non-owner | 403 Forbidden | 79ms | ✅ Delete Invitation as Non-owner, 403 Forbidden<br>✅ Delete Invitation as Non-owner returns error |
| 6 | `DELETE` | Delete - Invalid ID | 400 Bad Request | 46ms | ✅ Delete Invitation with invalid ID, 400 Bad Request<br>✅ Delete Invitation with invalid ID returns error |
| 7 | `DELETE` | Delete - Non-existing ID | 404 Not Found | 85ms | ✅ Delete Invitation with non-existing ID, 404 Not Found<br>✅ Delete Invitation with non-existing ID returns error |
| 8 | `DELETE` | Delete - Cleaning | 200 OK | 216ms | _No tests_ |

