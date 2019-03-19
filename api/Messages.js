module.exports = {
    error: {
        e0: {
            http: 500,
            code: "InternalError",
            message: {
                pt: "Erro Interno",
                eng: "Internal Error"
            },
            type: "error"
        },
        e1: {
            http: 400,
            code: "InvalidID",
            message: {
                pt: "ID inválido!",
                eng: "Invalid ID!"
            },
            type: "error"
        },
        e2: {
            http: 400,
            code: "EmailAlreadyExists",
            message: {
                pt: "Email já existente!",
                eng: "Email already exists!"
            },
            type: "error"
        },
        e3: {
            http: 400,
            code: "NoRecordsFound",
            message: {
                pt: "Email não existente!",
                eng: "Email does not exist!"
            },
            type: "error"
        },
        e4: {
            http: 400,
            code: "NoRecordsFound",
            message: {
                pt: "Não existe users!",
                eng: "Users does not exist!"
            },
            type: "error"
        },
        e5: {
            http: 401,
            code: "Unauthorized",
            message: {
                pt: "Sem autorização!",
                eng: "Unauthorized!"
            },
            type: "error"
        },
        e6: {
            http: 401,
            code: "PasswordDoesNotMatch",
            message: {
                pt: "A password não corresponde!",
                eng: "Password does not match!"
            },
            type: "error"
        }
    },
    success: {
        s0: {
            http: 200,
            code: "RequestFulfilled",
            message: {
                pt: "OK!",
                eng: "OK!"
            }
        },
        s1: {
            http: 201,
            code: "UserCreated",
            message: {
                pt: "User criado com sucesso",
                eng: "User created successfully!"
            }
        },
        s2: {
            http: 201,
            code: "ClientCreated",
            message: {
                pt: "Cliente criado com sucesso",
                eng: "Client created successfully!"
            }
        },
        s3: {
            http: 201,
            code: "AuthenticationSuccess",
            message: {
                pt: "Autenticado com sucesso",
                eng: "Authenticated successfully!"
            }
        },
        s4: {
            http: 201,
            code: "AuthenticationCreated",
            message: {
                pt: "Autenticacao criado com sucesso",
                eng: "Authentication created successfully"
            }
        }
    }
}