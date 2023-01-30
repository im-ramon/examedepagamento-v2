export const migration_database = [
    {
        "id": "_pb_users_auth_",
        "name": "users",
        "type": "auth",
        "system": false,
        "schema": [
            {
                "id": "users_name",
                "name": "name",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "users_avatar",
                "name": "avatar",
                "type": "file",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "mimeTypes": [
                        "image/jpg",
                        "image/jpeg",
                        "image/png",
                        "image/svg+xml",
                        "image/gif",
                        "image/webp"
                    ],
                    "thumbs": null
                }
            },
            {
                "id": "izztvole",
                "name": "pg",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "aal1m8eh",
                "name": "boss_name",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "sebicbei",
                "name": "boss_pg",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "yxnfeqyn",
                "name": "signature_place",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "ftepx01f",
                "name": "type",
                "type": "number",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null
                }
            }
        ],
        "listRule": "id = @request.auth.id",
        "viewRule": "id = @request.auth.id",
        "createRule": "",
        "updateRule": "id = @request.auth.id",
        "deleteRule": "id = @request.auth.id",
        "options": {
            "allowEmailAuth": true,
            "allowOAuth2Auth": false,
            "allowUsernameAuth": false,
            "exceptEmailDomains": null,
            "manageRule": null,
            "minPasswordLength": 8,
            "onlyEmailDomains": null,
            "requireEmail": false
        }
    },
    {
        "id": "b0ysl3crdzmxuy2",
        "name": "auxiliary_sheets",
        "type": "base",
        "system": false,
        "schema": [
            {
                "id": "qm4kqce3",
                "name": "user_id",
                "type": "relation",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "collectionId": "_pb_users_auth_",
                    "cascadeDelete": true
                }
            },
            {
                "id": "w7prrsah",
                "name": "form_data",
                "type": "text",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "dse5oqrx",
                "name": "observations",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            }
        ],
        "listRule": "user_id = @request.auth.id",
        "viewRule": "user_id = @request.auth.id",
        "createRule": null,
        "updateRule": "user_id = @request.auth.id",
        "deleteRule": "user_id = @request.auth.id",
        "options": {}
    }
]