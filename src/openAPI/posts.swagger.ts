export const getPosts = {
    tags: ['Get post by id'],
    description: "Returns a post by the input id",
    operationId: 'getPost',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            schema: {
                $ref: "#/components/schemas/id",
            },
            required: true,
            description: "Post Id",
        },
    ],
    responses: {
        "200": {
            description: "Deleted post",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ResponseModel",
                    },
                },
            },
        }
    }
}

export const signUp = {
    tags: ['User signup'],
    description: "Returns all pets from the system that the user has access to",
    operationId: 'signUp',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreateUserInput",
                },
            },
        },
    },
    responses: {
        "200": {
            description: "Deleted post",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ResponseModel",
                    },
                },
            },
        }
    }
}

export const login = {
    tags: ['User sign in'],
    description: "Returns token",
    operationId: 'signUp',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/LoginInput",
                },
            },
        },
    },
    responses: {
        "200": {
            description: "Deleted post",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ResponseModel",
                    },
                },
            },
        }
    }
}

export const logOut = {
    tags: ['Log out'],
    description: "logout and clear cookies",
    operationId: 'getPets',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
    ],
    responses: {
        "200": {
            description: "Deleted post",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ResponseModel",
                    },
                },
            },
        }
    }
}

export const getMe = {
    tags: ['Get user data'],
    description: "returns user data",
    operationId: 'me',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
    ],
    responses: {
        "200": {
            description: "Deleted post",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ResponseModel",
                    },
                },
            },
        }
    }
}

export const createPost = {
    tags: ['Create post'],
    description: "Create blog post",
    operationId: 'createPost',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreatePost",
                },
            },
        },
    },
    responses: {
        "401": {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ResponseModel",
                    },
                },
            },
        },
        "200": {
            description: "Deleted post",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ResponseModel",
                    },
                },
            },
        }
    }
}

export const deletePost = {
    tags: ['Delete post by id'],
    description: "Delete post by id",
    operationId: 'deletePost',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            schema: {
                $ref: "#/components/schemas/id",
            },
            required: true,
            description: "Post Id",
        },
    ],
    responses: {
        "200": {
            description: "Deleted post",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ResponseModel",
                    },
                },
            },
        }
    }
}

export const updatePost = {
    tags: ['Update post by id'],
    description: "Update post by id",
    operationId: 'updatePost',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            schema: {
                $ref: "#/components/schemas/id",
            },
            required: true,
            description: "Post Id",
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UpdatePost",
                },
            },
        },
    },
    responses: {
        "200": {
            description: "Updated post",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ResponseModel",
                    },
                },
            },
        }
    }
}
