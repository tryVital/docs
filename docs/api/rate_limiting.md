---
sidebar_position: 3
---

# Rate Limiting

Rate limit errors will be triggered when the rate limit for a particular endpoint has been exceeded. These default limits are the same for the Sandbox and Production environments. Please note that these rate limits are subject to change at any time.

| Endpoint                                    | Method | Rate Limit             |
| ------------------------------------------- | ------ | ---------------------- |
| /link/provider/oauth/{auth_provider}        | POST   | 60 per minute          |
| /testkit/orders/                            | GET    | 60 per minute          |
| /testkit/orders/{order_id}                  | GET    | 60 per minute          |
| /testkit/orders/                            | POST   | 60 per minute          |
| /testkit/orders/{order_id}/                 | GET    | 60 per minute          |
| /testkit/orders/{order_id}/results/metadata | GET    | 60 per minute          |
| /testkit/orders/{order_id}/results/raw      | GET    | 60 per minute          |
| /providers/                                 | GET    | 60 per minute          |
| /timerseries/sleep/{sleep_id}/stream        | GET    | 60 per minute          |
| /timerseries/workouts/{workout_id}/stream   | GET    | 60 per minute          |
| /timerseries/{user_id}/{resource:path}      | GET    | 60 per minute          |
| /summary/profile/{user_id}                  | GET    | 60 per minute          |
| /summary/profile/{user_id}/raw              | GET    | 60 per minute          |
| /summary/devices/{user_id}/raw              | GET    | 60 per minute          |
| /summary/activity/{user_id}/raw             | GET    | 60 per minute          |
| /summary/workouts/{user_id}                 | GET    | 60 per minute          |
| /summary/workouts/{user_id}/raw             | GET    | 60 per minute          |
| /summary/sleep/{user_id}                    | GET    | 60 per minute          |
| /summary/sleep/{user_id}/stream             | GET    | 60 per minute          |
| /summary/sleep/{user_id}/raw                | GET    | 60 per minute          |
| /summary/workouts/{user_id}/raw             | GET    | 60 per minute          |
| /summary/body/{user_id}                     | GET    | 60 per minute          |
| /summary/body/{user_id}/raw                 | GET    | 60 per minute          |
| /user/refresh/{user_id}                     | GET    | 60 per minute          |
| /user/refresh/{user_id}                     | POST   | 2 per minute, per user |
| /user/providers/{user_id}                   | POST   | 5 per minute           |
| /user/{user_id}/{provider}                  | DELETE | 5 per minute           |
| /user/{user_id}                             | DELETE | 5 per minute           |
| /user/                                      | GET    | 10 per minute          |
| /user/{user_id}                             | GET    | 10 per minute          |
