# REST API endpoints
  
## POST /register
> register account

Request Body
```json
{
    "Email" : <given email>,
    "Password" : <choosen password>,
    "Username" : <choosen Username>
}
```
  
Response (201 - register success)
```json
{
    "Username": <given username>,
    "Email": <given email>,
    "Message": "Please check your email for verification"
}
```

Response (400 - bad request)
```json
    {"message" : "Email must be unique"}
```

Response (400 - bad request)
```json
    {"message" : "All field are required"}
```

## POST /login
> login account to access the Jobdesk features

Request Body
```json
{
    "Email" : <given email>,
    "Password" : <choosen password>
}
```
  
Response (200 - login success)
```json
{
    "access_token" : <access_token given automatically by system>
}
```

Response (400 - bad request)
```json
    {"message" : "Invalid email/password"}
```

Response (403 - bad request)
```json
    {"message" : "please verify your email first"}
```

## PATCH /confirm/:token
> Confirm email address after register to gain access to Jobdesk login feature

Request Params
```json
{
    "token" : <given token automatically by system>
}
```
  
Response (200 - email verification success)
```json
{
    "message" : "Email verified"
}
```

Response (500 - Internal server error)
```json
    {"message" : "Internal server error"}
```

## GET /company
> Get all companies listed in Jobdesk database

Request Headers
```json
{
    "access_token" : <given access_token automatically by system>
}
```
  
Response (200 - get all companies success)
```json
[
    {
        "id": <given id>,
        "CompanyName": <given name>,
        "Address": <given address>,
        "EmployeeSize": <given employee size>,
        "Email": <given email>,
        "PhoneNumber": <given phone number>,
        "Website": <given website>
    }
]
```

Response (500 - Internal server error)
```json
    {"message" : "Internal server error"}
```

## GET /favorites
> Get all favorites defined by logged in user

Request Headers
```json
{
    "access_token" : <given access_token automatically by system>
}
```
  
Response (200 - get all favorites success)
```json
[
    {
        "id": <given id>,
        "UserId": <given User id>,
        "CompanyId": <given Company id>,
        "Company": {
            "id": <given id>,
            "CompanyName": <given name>,
            "Address": <given address>,
            "EmployeeSize": <given employee size>,
            "Email": <given email>,
            "PhoneNumber": <given phone number>,
            "Website": <given website>,
            "createdAt": <given timestamp>,
            "updatedAt": <given timestamp>
        }
    }
]
```

Response (500 - Internal server error)
```json
    {"message" : "Internal server error"}
```

## POST /favorites/:id
> Added certain company defined by id to favorites

Request Headers
```json
{
    "access_token" : <given access_token automatically by system>
}
```

Request Params
```json
{
    "id" : <given company id automatically by system>
}
```
  
Response (200 - add company to favorites success)
```json
{
    "message": "Company Id <given id> successfully added to favorite"
}
```

Response (500 - Internal server error)
```json
    {"message" : "Internal server error"}
```

Response (404 - Not found)
```json
    {"message" : "Not found"}
```

Response (400 - Bad request)
```json
    {"message" : "Bad request"}
```

Response (403 - Forbidden)
```json
    {"message" : "Forbidden"}
```

## DELETE /favorites/:id
> Remove certain company defined by id from favorites

Request Headers
```json
{
    "access_token" : <given access_token automatically by system>
}
```

Request Params
```json
{
    "id" : <given company id automatically by system>
}
```
  
Response (200 - remove company from favorites success)
```json
{
    "message": "successfully removed from favorites"
}
```

Response (500 - Internal server error)
```json
    {"message" : "Internal server error"}
```

Response (404 - Not found)
```json
    {"message" : "Not found"}
```

Response (400 - Bad request)
```json
    {"message" : "Bad request"}
```

Response (403 - Forbidden)
```json
    {"message" : "Forbidden"}
```