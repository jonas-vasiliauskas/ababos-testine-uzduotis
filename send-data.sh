#!/bin/bash

curl -X POST http://localhost:3001/users   -H "Content-Type: application/json"   -d '{
      "id": "1",
      "email": "test@test.com",
      "password": "test",
      "isLoggedIn": false
}'
