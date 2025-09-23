Login and Retrieve JWT Token

This screenshot shows a successful POST request to the /login endpoint using Postman. The user logs in with a username and role ("admin"). The server responds with a signed JWT token.

📸

![WhatsApp Image 2025-09-16 at 15 38 26_88562687](https://github.com/user-attachments/assets/4a3281f3-66d0-4341-be7b-e3c6b3c42bf7)


Example response:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}

2️⃣ Access Protected /admin Route with Token

This screenshot demonstrates how the JWT token is passed as a Bearer token in the Authorization header to access the protected /admin route. Since the user has the "admin" role, access is granted, and a personalized message is returned.

📸

![WhatsApp Image 2025-09-16 at 15 38 42_b38dab22](https://github.com/user-attachments/assets/15ddeec2-189c-4bad-80ec-39ae19ef5757)


Response:

{
  "message": "Hello Admin harini"
}
