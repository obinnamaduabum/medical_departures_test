"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = exports.awsPath = exports.mainPath = void 0;
const posts_swagger_1 = require("../openAPI/posts.swagger");
exports.mainPath = {
    "/api/public/users/create": {
        "post": posts_swagger_1.signUp
    },
    "/api/public/auth/login": {
        "post": posts_swagger_1.login
    },
    "/api/protected/auth/me": {
        "get": posts_swagger_1.getMe
    },
    "/api/protected/auth/logout": {
        "get": posts_swagger_1.logOut
    },
    "/api/protected/posts/create": {
        "post": posts_swagger_1.createPost
    },
    "/api/protected/posts/{id}": {
        "get": posts_swagger_1.getPosts,
    },
    "/api/protected/posts/remove/{id}": {
        "delete": posts_swagger_1.deletePost,
    },
    "/api/protected/posts/update/{id}": {
        "post": posts_swagger_1.updatePost,
    },
};
exports.awsPath = {
    "/dev/api/public/users/create": {
        "post": posts_swagger_1.signUp
    },
    "/dev/api/public/auth/login": {
        "post": posts_swagger_1.login
    },
    "/dev/api/protected/auth/me": {
        "get": posts_swagger_1.getMe
    },
    "/dev/api/protected/auth/logout": {
        "get": posts_swagger_1.logOut
    },
    "/dev/api/protected/posts/create": {
        "post": posts_swagger_1.createPost
    },
    "/dev/api/protected/posts/{id}": {
        "get": posts_swagger_1.getPosts,
    },
    "/dev/api/protected/posts/remove/{id}": {
        "delete": posts_swagger_1.deletePost,
    },
    "/dev/api/protected/posts/update/{id}": {
        "post": posts_swagger_1.updatePost,
    },
};
const isAWS = process.env.IS_AWS_DEPLOYMENT;
exports.swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'your description here',
        termsOfService: '',
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    components: {
        schemas: {
            id: {
                type: "number",
                description: "The post id",
                example: "10",
            },
            userName: {
                type: "string",
                description: "username",
                example: "frankW",
            },
            email: {
                type: "string",
                description: "Enter user email",
                example: "franckocean@gmmail.com",
            },
            lastName: {
                type: "string",
                description: "Lastname",
                example: "Ocean",
            },
            firstName: {
                type: "string",
                description: "Firstname",
                example: "Frank",
            },
            otherName: {
                type: "string",
                description: "other name",
                example: "",
            },
            password: {
                type: "string",
                description: "password",
                example: "!@$1234454",
            },
            CreateUserInput: {
                type: "object",
                properties: {
                    userName: {
                        type: "string",
                        description: "username",
                        example: "newyork",
                    },
                    email: {
                        type: "string",
                        description: "email",
                        example: "newyyork2029@gmail.com",
                    },
                    lastName: {
                        type: "string",
                        description: "lastname",
                        example: "Ocean",
                    },
                    firstName: {
                        type: "string",
                        description: "firstname",
                        example: "frank",
                    },
                    otherName: {
                        type: "string",
                        description: "othername",
                        example: "Nick",
                    },
                    password: {
                        type: "string",
                        description: "password",
                        example: "test123",
                    },
                },
            },
            CreatePost: {
                type: "object",
                properties: {
                    title: {
                        type: "string",
                        description: "title",
                        example: "newyork",
                    },
                    content: {
                        type: "string",
                        description: "Blog post data",
                        example: "This is a new blog post about AWS, and ",
                    }
                },
            },
            LoginInput: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        description: "email",
                        example: "newyyork2029@gmail.com",
                    },
                    password: {
                        type: "string",
                        description: "password",
                        example: "test123",
                    },
                },
            },
            UpdatePost: {
                type: "object",
                properties: {
                    title: {
                        type: "string",
                        description: "email",
                        example: "Blue Dress Football and Others",
                    },
                    content: {
                        type: "string",
                        description: "Blog post content",
                        example: "Blog post Blog post Blog post Blog post Blog post Blog post Blog post",
                    },
                },
            },
            ResponseModel: {
                type: "object",
                properties: {
                    email: {
                        type: "boolean",
                        description: "success",
                        example: true,
                    },
                    message: {
                        type: "string",
                        description: "message",
                        example: "response",
                    },
                    data: {
                        type: "object",
                        description: "data object",
                        example: {},
                    },
                    error: {
                        type: "array",
                        description: "errors array",
                        example: [],
                    },
                },
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    paths: isAWS === 'true' ? exports.awsPath : exports.mainPath
};
