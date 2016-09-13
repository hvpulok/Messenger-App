var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("header.component", ['angular2/core', "angular2/router"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent() {
                }
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'my-header',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        template: "\n        <header class=\"row\">\n            <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-pills\">\n                    <li><a [routerLink]=\"['ShowMessages']\">Show Messages</a></li>\n                    <li><a [routerLink]=\"['Auth']\">Authentication</a></li>\n                </ul>\n            </nav>\n        </header>\n",
                        styles: ["\n        header{\n            margin-bottom: 20px;\n        }\n        ul{\n            text-align: center;\n        }\n        li{\n            float: none;\n            display: inline-block;\n        }\n        .router-link-active{\n            background-color: lightgrey;\n            color: black;\n        }\n"],
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});
System.register("messages/message", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Message;
    return {
        setters:[],
        execute: function() {
            Message = (function () {
                function Message(content, messageId, username, userId) {
                    this.content = content;
                    this.messageId = messageId;
                    this.username = username;
                    this.userId = userId;
                }
                return Message;
            }());
            exports_2("Message", Message);
        }
    }
});
System.register("messages/message.service", ["messages/message", "angular2/http", "angular2/core", 'rxjs/Rx', "rxjs/Observable"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var message_1, http_1, core_2, Observable_1;
    var MessageService;
    return {
        setters:[
            function (message_1_1) {
                message_1 = message_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            MessageService = (function () {
                function MessageService(_http) {
                    this._http = _http;
                    this.messages = [];
                    this.messageIsEdit = new core_2.EventEmitter();
                }
                MessageService.prototype.addMessage = function (message) {
                    var body = JSON.stringify(message);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.post('/message', body, { headers: headers })
                        .map(function (response) {
                        var data = response.json().obj;
                        var message = new message_1.Message(data.content, data._id, 'Dummy', null);
                        return message;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.getMessages = function () {
                    return this._http.get('/message')
                        .map(function (res) {
                        var data = res.json().obj;
                        var objs = [];
                        for (var i = 0; i < data.length; i++) {
                            var message = new message_1.Message(data[i].content, data[i]._id, 'Dummy', null);
                            objs.push(message);
                        }
                        ;
                        return objs;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.editMessage = function (message) {
                    this.messageIsEdit.emit(message);
                };
                MessageService.prototype.updateMessage = function (message) {
                    var body = JSON.stringify(message);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.patch('/message/' + message.messageId, body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.deleteMessage = function (message) {
                    this.messages.splice(this.messages.indexOf(message), 1);
                    return this._http.delete('/message/' + message.messageId)
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService = __decorate([
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MessageService);
                return MessageService;
            }());
            exports_3("MessageService", MessageService);
        }
    }
});
System.register("messages/message.component", ["angular2/core", "messages/message", "messages/message.service"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_3, message_2, message_service_1;
    var MessageComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (message_2_1) {
                message_2 = message_2_1;
            },
            function (message_service_1_1) {
                message_service_1 = message_service_1_1;
            }],
        execute: function() {
            MessageComponent = (function () {
                function MessageComponent(_messageService) {
                    this._messageService = _messageService;
                    this.editClicked = new core_3.EventEmitter();
                }
                MessageComponent.prototype.onEdit = function () {
                    this._messageService.editMessage(this.message);
                };
                MessageComponent.prototype.onDelete = function () {
                    this._messageService.deleteMessage(this.message)
                        .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
                };
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', message_2.Message)
                ], MessageComponent.prototype, "message", void 0);
                __decorate([
                    core_3.Output(), 
                    __metadata('design:type', Object)
                ], MessageComponent.prototype, "editClicked", void 0);
                MessageComponent = __decorate([
                    core_3.Component({
                        selector: 'my-message',
                        template: "\n        <article class=\"panel panel-default\">\n            <div class=\"panel-body\">\n                {{ message.content }}\n            </div>\n            <footer class=\"panel-footer\">\n                <div class=\"author\">\n                    {{ message.username }}\n                </div>\n                <div class=\"config\">\n                    <a (click)=\"onEdit()\">Edit</a>\n                    <a (click)=\"onDelete()\">Delete</a>\n                </div>\n            </footer>\n        </article>\n    ",
                        styles: ["\n        .author {\n            display: inline-block;\n            font-style: italic;\n            font-size: 12px;\n            width: 80%;\n        }\n        .config {\n            display: inline-block;\n            text-align: right;\n            font-size: 12px;\n            width: 19%;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [message_service_1.MessageService])
                ], MessageComponent);
                return MessageComponent;
            }());
            exports_4("MessageComponent", MessageComponent);
        }
    }
});
System.register("messages/message-list.component", ['angular2/core', "messages/message.component", "messages/message.service"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_4, message_component_1, message_service_2;
    var MessageListComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (message_component_1_1) {
                message_component_1 = message_component_1_1;
            },
            function (message_service_2_1) {
                message_service_2 = message_service_2_1;
            }],
        execute: function() {
            MessageListComponent = (function () {
                function MessageListComponent(_messageService) {
                    this._messageService = _messageService;
                }
                MessageListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._messageService.getMessages()
                        .subscribe(function (newMessages) {
                        _this.messages = newMessages;
                        _this._messageService.messages = newMessages;
                    });
                };
                MessageListComponent = __decorate([
                    core_4.Component({
                        selector: 'my-message-list',
                        directives: [message_component_1.MessageComponent],
                        providers: [],
                        template: "\n                <section class=\"col-md-8 col-md-offset-2\">\n                    <my-message\n                        *ngFor = \"#message of messages\"\n                        [message]=\"message\" \n                        >\n                    </my-message>\n                </section>\n        ",
                    }), 
                    __metadata('design:paramtypes', [message_service_2.MessageService])
                ], MessageListComponent);
                return MessageListComponent;
            }());
            exports_5("MessageListComponent", MessageListComponent);
        }
    }
});
System.register("messages/message-input.component", ["angular2/core", "messages/message", "messages/message.service"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_5, message_3, message_service_3;
    var MessageInputComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (message_3_1) {
                message_3 = message_3_1;
            },
            function (message_service_3_1) {
                message_service_3 = message_service_3_1;
            }],
        execute: function() {
            MessageInputComponent = (function () {
                function MessageInputComponent(_messageService) {
                    this._messageService = _messageService;
                    this.message = null;
                }
                MessageInputComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._messageService.messageIsEdit.subscribe(function (editMessage) {
                        _this.message = editMessage;
                    });
                };
                MessageInputComponent.prototype.onSubmit = function (form) {
                    var _this = this;
                    if (this.message) {
                        //edit message case
                        this.message.content = form.content;
                        this._messageService.updateMessage(this.message)
                            .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
                        this.message = null;
                    }
                    else {
                        //save message case
                        var message = new message_3.Message(form.content, null, 'Dummy', null);
                        this._messageService.addMessage(message)
                            .subscribe(function (data) {
                            console.log(data);
                            _this._messageService.messages.push(data);
                        }, function (error) { return console.error(error); });
                    }
                };
                MessageInputComponent.prototype.onCancel = function () {
                    this.message = null;
                };
                MessageInputComponent = __decorate([
                    core_5.Component({
                        selector: "my-message-input",
                        directives: [],
                        providers: [],
                        template: "\n            <section class=\"col-md-8 col-md-offset-2\">\n                <form (ngSubmit)=\"onSubmit(f.value)\" #f = \"ngForm\">\n                    <div class=\"form-group\">\n                        <label for=\"content\">Content</label>\n                        <input type=\"text\" \n                            class=\"form-control\" \n                            id=\"content\"\n                            ngControl=\"content\"\n                            [ngModel] = \"message?.content\"\n                            >\n                    </div>\n                    <button type=\"submit\" \n                        class=\"btn btn-primary\"\n                        >\n                        {{ !message ? 'Send Message' : 'Save Message'}}\n                    </button>\n                    <button type=\"button\" class=\"btn btn-danger\"\n                        *ngIf=\"message\" (click)=\"onCancel()\"\n                    >Cancel</button>\n                </form>\n            </section>               \n        \n        "
                    }), 
                    __metadata('design:paramtypes', [message_service_3.MessageService])
                ], MessageInputComponent);
                return MessageInputComponent;
            }());
            exports_6("MessageInputComponent", MessageInputComponent);
        }
    }
});
System.register("messages/body.component", ['angular2/core', "messages/message-list.component", "messages/message-input.component"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_6, message_list_component_1, message_input_component_1;
    var BodyComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (message_list_component_1_1) {
                message_list_component_1 = message_list_component_1_1;
            },
            function (message_input_component_1_1) {
                message_input_component_1 = message_input_component_1_1;
            }],
        execute: function() {
            BodyComponent = (function () {
                function BodyComponent() {
                }
                BodyComponent = __decorate([
                    core_6.Component({
                        selector: 'my-body',
                        directives: [message_list_component_1.MessageListComponent, message_input_component_1.MessageInputComponent],
                        template: "\n        <div class=\"container\">\n            <div class=\"row\">\n                <my-message-input></my-message-input>\n            </div>\n            <br>\n            <div class=\"row\">\n                <my-message-list></my-message-list>\n            </div>\n        </div>\n",
                    }), 
                    __metadata('design:paramtypes', [])
                ], BodyComponent);
                return BodyComponent;
            }());
            exports_7("BodyComponent", BodyComponent);
        }
    }
});
System.register("auth/signup.component", ["angular2/src/core/metadata", "angular2/src/common/forms/form_builder", "angular2/src/common/forms/validators"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var metadata_1, form_builder_1, validators_1;
    var SignupComponent;
    return {
        setters:[
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (form_builder_1_1) {
                form_builder_1 = form_builder_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(_fb) {
                    this._fb = _fb;
                }
                SignupComponent.prototype.onSubmit = function () {
                    console.log(this.myForm.value);
                };
                SignupComponent.prototype.ngOnInit = function () {
                    this.myForm = this._fb.group({
                        firstName: ['', validators_1.Validators.required],
                        lastName: ['', validators_1.Validators.required],
                        email: ['', validators_1.Validators.compose([
                                validators_1.Validators.required,
                                this.isEmail
                            ])],
                        password: ['', validators_1.Validators.required],
                    });
                };
                SignupComponent.prototype.isEmail = function (control) {
                    if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
                        return { invalidEmail: true };
                    }
                };
                SignupComponent = __decorate([
                    metadata_1.Component({
                        selector: 'my-signup',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                    <label for=\"firstName\">First Name</label>\n                    <input \n                        [ngFormControl] =\"myForm.find('firstName')\"\n                        type=\"text\" id=\"firstName\" class=\"form-control\"\n                    >\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"lastName\">Last Name</label>\n                    <input \n                        [ngFormControl] =\"myForm.find('lastName')\"\n                        type=\"text\" id=\"lastName\" class=\"form-control\"\n                    >\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"email\">Email</label>\n                    <input \n                        [ngFormControl] =\"myForm.find('email')\"\n                        type=\"text\" id=\"email\" class=\"form-control\"\n                    >\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Password</label>\n                    <input \n                        [ngFormControl] =\"myForm.find('password')\"\n                        type=\"password\" id=\"password\" class=\"form-control\"\n                    >\n                </div>\n                <button \n                    [disabled]=\"!myForm.valid\"\n                    type=\"submit\" \n                    class=\"btn btn-primary\"\n                    >Sign Up\n                </button>\n            </form>\n        </section>\n",
                    }), 
                    __metadata('design:paramtypes', [form_builder_1.FormBuilder])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_8("SignupComponent", SignupComponent);
        }
    }
});
System.register("auth/signin.component", ["angular2/src/core/metadata", "angular2/src/common/forms/form_builder", "angular2/src/common/forms/validators"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var metadata_2, form_builder_2, validators_2;
    var SigninComponent;
    return {
        setters:[
            function (metadata_2_1) {
                metadata_2 = metadata_2_1;
            },
            function (form_builder_2_1) {
                form_builder_2 = form_builder_2_1;
            },
            function (validators_2_1) {
                validators_2 = validators_2_1;
            }],
        execute: function() {
            SigninComponent = (function () {
                function SigninComponent(_fb) {
                    this._fb = _fb;
                }
                SigninComponent.prototype.onSubmit = function () {
                    console.log(this.myForm.value);
                };
                SigninComponent.prototype.ngOnInit = function () {
                    this.myForm = this._fb.group({
                        email: ['', validators_2.Validators.compose([
                                validators_2.Validators.required,
                                this.isEmail
                            ])],
                        password: ['', validators_2.Validators.required],
                    });
                };
                SigninComponent.prototype.isEmail = function (control) {
                    if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
                        return { invalidEmail: true };
                    }
                };
                SigninComponent = __decorate([
                    metadata_2.Component({
                        selector: 'my-signin',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                    <label for=\"email\">Email</label>\n                    <input \n                        [ngFormControl] =\"myForm.find('email')\"\n                        type=\"text\" id=\"email\" class=\"form-control\"\n                    >\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Password</label>\n                    <input \n                        [ngFormControl] =\"myForm.find('password')\"\n                        type=\"password\" id=\"password\" class=\"form-control\"\n                    >\n                </div>\n                <button \n                    [disabled]=\"!myForm.valid\"\n                    type=\"submit\" \n                    class=\"btn btn-primary\"\n                    >Sign In\n                </button>\n            </form>\n        </section>\n",
                    }), 
                    __metadata('design:paramtypes', [form_builder_2.FormBuilder])
                ], SigninComponent);
                return SigninComponent;
            }());
            exports_9("SigninComponent", SigninComponent);
        }
    }
});
System.register("auth/logout.component", ["angular2/src/core/metadata"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var metadata_3;
    var LogoutComponent;
    return {
        setters:[
            function (metadata_3_1) {
                metadata_3 = metadata_3_1;
            }],
        execute: function() {
            LogoutComponent = (function () {
                function LogoutComponent() {
                }
                LogoutComponent.prototype.onLogout = function () {
                };
                LogoutComponent = __decorate([
                    metadata_3.Component({
                        selector: 'my-logout',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <button\n                (click)=\"onLogout()\"\n                class=\"btn btn-danger\"\n                >\n                Logout\n            </button>\n        </section>\n\n",
                    }), 
                    __metadata('design:paramtypes', [])
                ], LogoutComponent);
                return LogoutComponent;
            }());
            exports_10("LogoutComponent", LogoutComponent);
        }
    }
});
System.register("auth/authentication.component", ['angular2/core', "auth/signup.component", "angular2/router", "auth/signin.component", "auth/logout.component"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_7, signup_component_1, router_2, signin_component_1, logout_component_1, router_3;
    var AuthenticationComponent;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
                router_3 = router_2_1;
            },
            function (signin_component_1_1) {
                signin_component_1 = signin_component_1_1;
            },
            function (logout_component_1_1) {
                logout_component_1 = logout_component_1_1;
            }],
        execute: function() {
            AuthenticationComponent = (function () {
                function AuthenticationComponent() {
                }
                AuthenticationComponent = __decorate([
                    core_7.Component({
                        selector: 'my-auth',
                        directives: [router_3.ROUTER_DIRECTIVES],
                        template: "\n        <header class=\"row spacing\">\n            <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-tabs\">\n                    <li><a [routerLink]=\"['Signup']\">Signup</a></li>\n                    <li><a [routerLink]=\"['Signin']\">Signin</a></li>\n                    <li><a [routerLink]=\"['Logout']\">Logout</a></li>\n                </ul>\n            </nav>\n        </header>\n        <div class=\"row spacing\">\n            <router-outlet></router-outlet>\n        </div>\n",
                        styles: ["\n        .router-link-active{\n            color: #555;\n            cursor: default;\n            background-color: #fff;\n            border: 1px solid #ddd;\n            border-bottom-color: transparent;\n        }\n\n    "],
                    }),
                    router_2.RouteConfig([
                        { path: '/signup',
                            name: 'Signup',
                            component: signup_component_1.SignupComponent,
                            useAsDefault: true,
                        },
                        { path: '/signin',
                            name: 'Signin',
                            component: signin_component_1.SigninComponent,
                        },
                        { path: '/logout',
                            name: 'Logout',
                            component: logout_component_1.LogoutComponent,
                        },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AuthenticationComponent);
                return AuthenticationComponent;
            }());
            exports_11("AuthenticationComponent", AuthenticationComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "header.component", "messages/body.component", "angular2/router", "auth/authentication.component"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_8, header_component_1, body_component_1, router_4, authentication_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (body_component_1_1) {
                body_component_1 = body_component_1_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (authentication_component_1_1) {
                authentication_component_1 = authentication_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_8.Component({
                        selector: 'my-app',
                        template: " \n        <div class=\"container\">\n            <my-header></my-header>\n            <router-outlet></router-outlet>\n        </div>\n\n    ",
                        directives: [header_component_1.HeaderComponent, router_4.ROUTER_DIRECTIVES]
                    }),
                    router_4.RouteConfig([
                        { path: '/',
                            name: 'ShowMessages',
                            component: body_component_1.BodyComponent,
                            useAsDefault: true,
                        },
                        { path: '/auth/...',
                            name: 'Auth',
                            component: authentication_component_1.AuthenticationComponent,
                        },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_12("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "messages/message.service", "angular2/router", "angular2/src/core/di/provider", "angular2/src/router/location/location_strategy", "angular2/src/router/location/hash_location_strategy", "angular2/http"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var browser_1, app_component_1, message_service_4, router_5, provider_1, location_strategy_1, hash_location_strategy_1, http_2;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (message_service_4_1) {
                message_service_4 = message_service_4_1;
            },
            function (router_5_1) {
                router_5 = router_5_1;
            },
            function (provider_1_1) {
                provider_1 = provider_1_1;
            },
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (hash_location_strategy_1_1) {
                hash_location_strategy_1 = hash_location_strategy_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [
                message_service_4.MessageService,
                router_5.ROUTER_PROVIDERS,
                provider_1.provide(location_strategy_1.LocationStrategy, { useClass: hash_location_strategy_1.HashLocationStrategy }),
                http_2.HTTP_PROVIDERS
            ]);
        }
    }
});
System.register("auth/user", [], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(email, password, firstName, lastName) {
                    this.email = email;
                    this.password = password;
                    this.firstName = firstName;
                    this.lastName = lastName;
                }
                return User;
            }());
            exports_14("User", User);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlLnRzIiwibWVzc2FnZXMvbWVzc2FnZS5zZXJ2aWNlLnRzIiwibWVzc2FnZXMvbWVzc2FnZS5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlLWxpc3QuY29tcG9uZW50LnRzIiwibWVzc2FnZXMvbWVzc2FnZS1pbnB1dC5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9ib2R5LmNvbXBvbmVudC50cyIsImF1dGgvc2lnbnVwLmNvbXBvbmVudC50cyIsImF1dGgvc2lnbmluLmNvbXBvbmVudC50cyIsImF1dGgvbG9nb3V0LmNvbXBvbmVudC50cyIsImF1dGgvYXV0aGVudGljYXRpb24uY29tcG9uZW50LnRzIiwiYXBwLmNvbXBvbmVudC50cyIsImJvb3QudHMiLCJhdXRoL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFvQ0E7Z0JBQUE7Z0JBRUEsQ0FBQztnQkFsQ0Q7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDUCxRQUFRLEVBQUUsV0FBVzt3QkFDckIsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7d0JBQy9CLFFBQVEsRUFBRSx5V0FTYjt3QkFDRyxNQUFNLEVBQUUsQ0FBQywrVEFlWixDQUFDO3FCQUVELENBQUM7O21DQUFBO2dCQUlGLHNCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCw2Q0FFQyxDQUFBOzs7Ozs7Ozs7OztZQ3RDRDtnQkFNSSxpQkFBYSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxRQUFpQixFQUFFLE1BQWU7b0JBQ2hGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUN6QixDQUFDO2dCQUNMLGNBQUM7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QkFDaEIsa0JBQU8sQ0FBQyxvQ0FBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2Q0FBb0IsRUFBQyxDQUFDO2dCQUMzRCxxQkFBYzthQUVqQixDQUVKLENBQUM7Ozs7Ozs7Ozs7O1lDcEJGO2dCQUNJLGNBQW1CLEtBQWEsRUFBUyxRQUFnQixFQUFTLFNBQWtCLEVBQVMsUUFBaUI7b0JBQTNGLFVBQUssR0FBTCxLQUFLLENBQVE7b0JBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtvQkFBUyxjQUFTLEdBQVQsU0FBUyxDQUFTO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQVM7Z0JBQUcsQ0FBQztnQkFDdEgsV0FBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsd0JBRUMsQ0FBQSIsImZpbGUiOiIuLi8uLi8uLi9iZXRhL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWhlYWRlcicsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8bmF2IGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydTaG93TWVzc2FnZXMnXVwiPlNob3cgTWVzc2FnZXM8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnQXV0aCddXCI+QXV0aGVudGljYXRpb248L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgIDwvaGVhZGVyPlxuYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIGhlYWRlcntcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgIH1cbiAgICAgICAgdWx7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgbGl7XG4gICAgICAgICAgICBmbG9hdDogbm9uZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgfVxuICAgICAgICAucm91dGVyLWxpbmstYWN0aXZle1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xuICAgICAgICAgICAgY29sb3I6IGJsYWNrO1xuICAgICAgICB9XG5gXSxcblxufSlcblxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudHtcblxufSIsImV4cG9ydCBjbGFzcyBNZXNzYWdlIHtcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgdXNlcm5hbWU6IHN0cmluZztcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcbiAgICB1c2VySWQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yIChjb250ZW50OiBzdHJpbmcsIG1lc3NhZ2VJZD86IHN0cmluZywgdXNlcm5hbWU/OiBzdHJpbmcsIHVzZXJJZD86IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9IG1lc3NhZ2VJZDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcbiAgICB9XG59IiwiaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5pbXBvcnQge0h0dHAsIEhlYWRlcnN9IGZyb20gXCJhbmd1bGFyMi9odHRwXCI7XG5pbXBvcnQge0luamVjdGFibGUsIEV2ZW50RW1pdHRlcn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCAncnhqcy9SeCdcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZVNlcnZpY2V7XG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VbXSA9IFtdO1xuICAgIG1lc3NhZ2VJc0VkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPE1lc3NhZ2U+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwKXt9XG5cbiAgICBhZGRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2Upe1xuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZScgOiAnYXBwbGljYXRpb24vanNvbid9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCgnL21lc3NhZ2UnLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLm9iajtcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKGRhdGEuY29udGVudCwgZGF0YS5faWQsICdEdW1teScsIG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cblxuICAgIGdldE1lc3NhZ2VzKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCgnL21lc3NhZ2UnKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXMuanNvbigpLm9iajtcbiAgICAgICAgICAgICAgICBsZXQgb2JqczogYW55W10gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTwgZGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gbmV3IE1lc3NhZ2UoZGF0YVtpXS5jb250ZW50LCBkYXRhW2ldLl9pZCwgJ0R1bW15JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIG9ianMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmpzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cblxuZWRpdE1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSl7XG4gICAgdGhpcy5tZXNzYWdlSXNFZGl0LmVtaXQobWVzc2FnZSk7XG59XG5cbnVwZGF0ZU1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSl7XG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZScgOiAnYXBwbGljYXRpb24vanNvbid9KTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wYXRjaCgnL21lc3NhZ2UvJyArIG1lc3NhZ2UubWVzc2FnZUlkLCBib2R5LCB7aGVhZGVycyA6IGhlYWRlcnN9KVxuICAgICAgICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XG59XG5cbmRlbGV0ZU1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSl7XG4gICAgdGhpcy5tZXNzYWdlcy5zcGxpY2UodGhpcy5tZXNzYWdlcy5pbmRleE9mKG1lc3NhZ2UpLDEpO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSgnL21lc3NhZ2UvJyArIG1lc3NhZ2UubWVzc2FnZUlkKVxuICAgICAgICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gXCIuL21lc3NhZ2VcIjtcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2Uuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICB7eyBtZXNzYWdlLmNvbnRlbnQgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cInBhbmVsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgbWVzc2FnZS51c2VybmFtZSB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb25maWdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uRWRpdCgpXCI+RWRpdDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uRGVsZXRlKClcIj5EZWxldGU8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgPC9hcnRpY2xlPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAuYXV0aG9yIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgIHdpZHRoOiA4MCU7XG4gICAgICAgIH1cbiAgICAgICAgLmNvbmZpZyB7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgIHdpZHRoOiAxOSU7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBtZXNzYWdlOiBNZXNzYWdlO1xuICAgIEBPdXRwdXQoKSBlZGl0Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgY29uc3RydWN0b3IgKHByaXZhdGUgX21lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSl7fVxuXG4gICAgb25FZGl0KCl7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmVkaXRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgb25EZWxldGUoKXtcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UuZGVsZXRlTWVzc2FnZSh0aGlzLm1lc3NhZ2UpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbn0iLCJcbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQ29tcG9uZW50fSBmcm9tIFwiLi9tZXNzYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi9tZXNzYWdlLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlLWxpc3QnLFxuICAgIGRpcmVjdGl2ZXM6IFtNZXNzYWdlQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPG15LW1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0ZvciA9IFwiI21lc3NhZ2Ugb2YgbWVzc2FnZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW21lc3NhZ2VdPVwibWVzc2FnZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L215LW1lc3NhZ2U+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICBgLFxuXG59KVxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKSB7fVxuXG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VbXTtcblxuICAgIG5nT25Jbml0KCl7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmdldE1lc3NhZ2VzKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUobmV3TWVzc2FnZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBuZXdNZXNzYWdlcztcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5tZXNzYWdlcyA9IG5ld01lc3NhZ2VzO1xuICAgICAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vbWVzc2FnZVwiO1xuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSBcIi4vbWVzc2FnZS5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm15LW1lc3NhZ2UtaW5wdXRcIixcbiAgICBkaXJlY3RpdmVzOltdLFxuICAgIHByb3ZpZGVyczogW10sXG4gICAgdGVtcGxhdGU6YFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25TdWJtaXQoZi52YWx1ZSlcIiAjZiA9IFwibmdGb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY29udGVudFwiPkNvbnRlbnQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nQ29udHJvbD1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ01vZGVsXSA9IFwibWVzc2FnZT8uY29udGVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyAhbWVzc2FnZSA/ICdTZW5kIE1lc3NhZ2UnIDogJ1NhdmUgTWVzc2FnZSd9fVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIm1lc3NhZ2VcIiAoY2xpY2spPVwib25DYW5jZWwoKVwiXG4gICAgICAgICAgICAgICAgICAgID5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L3NlY3Rpb24+ICAgICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBgXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKXt9XG5cbiAgICBtZXNzYWdlOk1lc3NhZ2UgPSBudWxsO1xuXG4gICAgbmdPbkluaXQoKXtcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UubWVzc2FnZUlzRWRpdC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBlZGl0TWVzc2FnZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gZWRpdE1lc3NhZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvblN1Ym1pdChmb3JtOiBhbnkpe1xuICAgICAgICBpZih0aGlzLm1lc3NhZ2Upe1xuICAgICAgICAgICAgLy9lZGl0IG1lc3NhZ2UgY2FzZVxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlLmNvbnRlbnQgPSBmb3JtLmNvbnRlbnQ7XG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS51cGRhdGVNZXNzYWdlKHRoaXMubWVzc2FnZSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBudWxsO1xuXG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIC8vc2F2ZSBtZXNzYWdlIGNhc2VcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2U6IE1lc3NhZ2UgPSBuZXcgTWVzc2FnZShmb3JtLmNvbnRlbnQsIG51bGwsICdEdW1teScsbnVsbCk7XG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5hZGRNZXNzYWdlKG1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UubWVzc2FnZXMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DYW5jZWwoKXtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbnVsbDtcbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZS1saXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOidteS1ib2R5JyxcbiAgICBkaXJlY3RpdmVzOiBbTWVzc2FnZUxpc3RDb21wb25lbnQsIE1lc3NhZ2VJbnB1dENvbXBvbmVudF0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxteS1tZXNzYWdlLWlucHV0PjwvbXktbWVzc2FnZS1pbnB1dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxteS1tZXNzYWdlLWxpc3Q+PC9teS1tZXNzYWdlLWxpc3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5gLFxuXG59KVxuXG5leHBvcnQgY2xhc3MgQm9keUNvbXBvbmVudHtcblxufSIsIlxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YVwiO1xuaW1wb3J0IHtPbkluaXR9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHtDb250cm9sR3JvdXAsIENvbnRyb2x9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29tbW9uL2Zvcm1zL21vZGVsXCI7XG5pbXBvcnQge0Zvcm1CdWlsZGVyfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvbW1vbi9mb3Jtcy9mb3JtX2J1aWxkZXJcIjtcbmltcG9ydCB7VmFsaWRhdG9yc30gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb21tb24vZm9ybXMvdmFsaWRhdG9yc1wiO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1zaWdudXAnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgICA8Zm9ybSBbbmdGb3JtTW9kZWxdPVwibXlGb3JtXCIgKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZmlyc3ROYW1lXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0Zvcm1Db250cm9sXSA9XCJteUZvcm0uZmluZCgnZmlyc3ROYW1lJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBpZD1cImZpcnN0TmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJsYXN0TmFtZVwiPkxhc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0Zvcm1Db250cm9sXSA9XCJteUZvcm0uZmluZCgnbGFzdE5hbWUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIGlkPVwibGFzdE5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0Zvcm1Db250cm9sXSA9XCJteUZvcm0uZmluZCgnZW1haWwnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIGlkPVwiZW1haWxcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0Zvcm1Db250cm9sXSA9XCJteUZvcm0uZmluZCgncGFzc3dvcmQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFteUZvcm0udmFsaWRcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCIgXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgPlNpZ24gVXBcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9zZWN0aW9uPlxuYCxcbn0pXG5cbmV4cG9ydCBjbGFzcyBTaWdudXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgbXlGb3JtOiBDb250cm9sR3JvdXA7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZmI6Rm9ybUJ1aWxkZXIpe31cblxuICAgIG9uU3VibWl0KCl7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlGb3JtLnZhbHVlKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICB0aGlzLm15Rm9ybSA9IHRoaXMuX2ZiLmdyb3VwKHtcbiAgICAgICAgICAgIGZpcnN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGxhc3ROYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgZW1haWw6IFsnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHRoaXMuaXNFbWFpbFxuICAgICAgICAgICAgXSldLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0VtYWlsKGNvbnRyb2w6IENvbnRyb2wpOiB7W3M6IHN0cmluZ106IGJvb2xlYW59e1xuICAgICAgICBpZighY29udHJvbC52YWx1ZS5tYXRjaChcIlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSsoPzpcXC5bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKSpAKD86W2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1xcLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1wiKSl7XG4gICAgICAgICAgICByZXR1cm4ge2ludmFsaWRFbWFpbDogdHJ1ZX07XG4gICAgICAgIH1cblxuICAgIH1cblxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGFcIjtcbmltcG9ydCB7T25Jbml0fSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2ludGVyZmFjZXNcIjtcbmltcG9ydCB7Q29udHJvbEdyb3VwLCBDb250cm9sfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvbW1vbi9mb3Jtcy9tb2RlbFwiO1xuaW1wb3J0IHtGb3JtQnVpbGRlcn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb21tb24vZm9ybXMvZm9ybV9idWlsZGVyXCI7XG5pbXBvcnQge1ZhbGlkYXRvcnN9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29tbW9uL2Zvcm1zL3ZhbGlkYXRvcnNcIjtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktc2lnbmluJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuICAgICAgICAgICAgPGZvcm0gW25nRm9ybU1vZGVsXT1cIm15Rm9ybVwiIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdCgpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdGb3JtQ29udHJvbF0gPVwibXlGb3JtLmZpbmQoJ2VtYWlsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBpZD1cImVtYWlsXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdGb3JtQ29udHJvbF0gPVwibXlGb3JtLmZpbmQoJ3Bhc3N3b3JkJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhbXlGb3JtLnZhbGlkXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiIFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgID5TaWduIEluXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvc2VjdGlvbj5cbmAsXG59KVxuXG5leHBvcnQgY2xhc3MgU2lnbmluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICAgIG15Rm9ybTogQ29udHJvbEdyb3VwO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZiOkZvcm1CdWlsZGVyKXt9XG5cbiAgICBvblN1Ym1pdCgpe1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm15Rm9ybS52YWx1ZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKXtcbiAgICAgICAgdGhpcy5teUZvcm0gPSB0aGlzLl9mYi5ncm91cCh7XG4gICAgICAgICAgICBlbWFpbDogWycnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgdGhpcy5pc0VtYWlsXG4gICAgICAgICAgICBdKV0sXG4gICAgICAgICAgICBwYXNzd29yZDogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRW1haWwoY29udHJvbDogQ29udHJvbCk6IHtbczogc3RyaW5nXTogYm9vbGVhbn17XG4gICAgICAgIGlmKCFjb250cm9sLnZhbHVlLm1hdGNoKFwiW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlxcLlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSspKkAoPzpbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/XFwuKStbYS16MC05XSg/OlthLXowLTktXSpbYS16MC05XSk/XCIpKXtcbiAgICAgICAgICAgIHJldHVybiB7aW52YWxpZEVtYWlsOiB0cnVlfTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59IiwiXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWxvZ291dCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25Mb2dvdXQoKVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIExvZ291dFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuYCxcblxufSlcblxuZXhwb3J0IGNsYXNzIExvZ291dENvbXBvbmVudHtcbiAgICBvbkxvZ291dCgpe1xuXG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7U2lnbnVwQ29tcG9uZW50fSBmcm9tIFwiLi9zaWdudXAuY29tcG9uZW50XCI7XG5pbXBvcnQge1JvdXRlQ29uZmlnfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge1NpZ25pbkNvbXBvbmVudH0gZnJvbSBcIi4vc2lnbmluLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtMb2dvdXRDb21wb25lbnR9IGZyb20gXCIuL2xvZ291dC5jb21wb25lbnRcIjtcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktYXV0aCcsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwicm93IHNwYWNpbmdcIj5cbiAgICAgICAgICAgIDxuYXYgY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnU2lnbnVwJ11cIj5TaWdudXA8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnU2lnbmluJ11cIj5TaWduaW48L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnTG9nb3V0J11cIj5Mb2dvdXQ8L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgIDwvaGVhZGVyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHNwYWNpbmdcIj5cbiAgICAgICAgICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgICAgICAgPC9kaXY+XG5gLFxuICAgIHN0eWxlczpbYFxuICAgICAgICAucm91dGVyLWxpbmstYWN0aXZle1xuICAgICAgICAgICAgY29sb3I6ICM1NTU7XG4gICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICB9XG5cbiAgICBgXSxcbn0pXG5cbkBSb3V0ZUNvbmZpZyhbXG4gICAgeyAgIHBhdGg6ICcvc2lnbnVwJyxcbiAgICAgICAgbmFtZTogJ1NpZ251cCcsXG4gICAgICAgIGNvbXBvbmVudDogU2lnbnVwQ29tcG9uZW50LFxuICAgICAgICB1c2VBc0RlZmF1bHQ6IHRydWUsXG4gICAgfSxcbiAgICB7ICAgcGF0aDogJy9zaWduaW4nLFxuICAgICAgICBuYW1lOiAnU2lnbmluJyxcbiAgICAgICAgY29tcG9uZW50OiBTaWduaW5Db21wb25lbnQsXG4gICAgfSxcbiAgICB7ICAgcGF0aDogJy9sb2dvdXQnLFxuICAgICAgICBuYW1lOiAnTG9nb3V0JyxcbiAgICAgICAgY29tcG9uZW50OiBMb2dvdXRDb21wb25lbnQsXG4gICAgfSxcblxuXSlcblxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uQ29tcG9uZW50e1xuXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtIZWFkZXJDb21wb25lbnR9IGZyb20gXCIuL2hlYWRlci5jb21wb25lbnRcIjtcbmltcG9ydCB7Qm9keUNvbXBvbmVudH0gZnJvbSBcIi4vbWVzc2FnZXMvYm9keS5jb21wb25lbnRcIjtcbmltcG9ydCB7Um91dGVDb25maWcsIFJPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge0F1dGhlbnRpY2F0aW9uQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoL2F1dGhlbnRpY2F0aW9uLmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWFwcCcsXG4gICAgdGVtcGxhdGU6IGAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgIDxteS1oZWFkZXI+PC9teS1oZWFkZXI+XG4gICAgICAgICAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbSGVhZGVyQ29tcG9uZW50LCBST1VURVJfRElSRUNUSVZFU11cbn0pXG5cblxuQFJvdXRlQ29uZmlnKFtcbiAgICB7ICAgcGF0aDogJy8nLFxuICAgICAgICBuYW1lOiAnU2hvd01lc3NhZ2VzJyxcbiAgICAgICAgY29tcG9uZW50OiBCb2R5Q29tcG9uZW50LFxuICAgICAgICB1c2VBc0RlZmF1bHQ6IHRydWUsXG4gICAgfSxcbiAgICB7ICAgcGF0aDogJy9hdXRoLy4uLicsXG4gICAgICAgIG5hbWU6ICdBdXRoJyxcbiAgICAgICAgY29tcG9uZW50OiBBdXRoZW50aWNhdGlvbkNvbXBvbmVudCxcbiAgICB9LFxuXSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuXG59IiwiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3R5cGluZ3MvYnJvd3Nlci5kLnRzXCIvPlxuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuL21lc3NhZ2VzL21lc3NhZ2Uuc2VydmljZVwiO1xuaW1wb3J0IHtST1VURVJfUFJPVklERVJTfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge3Byb3ZpZGV9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9kaS9wcm92aWRlclwiO1xuaW1wb3J0IHtMb2NhdGlvblN0cmF0ZWd5fSBmcm9tIFwiYW5ndWxhcjIvc3JjL3JvdXRlci9sb2NhdGlvbi9sb2NhdGlvbl9zdHJhdGVneVwiO1xuaW1wb3J0IHtIYXNoTG9jYXRpb25TdHJhdGVneX0gZnJvbSBcImFuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vaGFzaF9sb2NhdGlvbl9zdHJhdGVneVwiO1xuaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gZnJvbSBcImFuZ3VsYXIyL2h0dHBcIjtcblxuYm9vdHN0cmFwKFxuICAgIEFwcENvbXBvbmVudCxcbiAgICBbXG4gICAgICAgIE1lc3NhZ2VTZXJ2aWNlLFxuICAgICAgICBST1VURVJfUFJPVklERVJTLFxuICAgICAgICBwcm92aWRlKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczogSGFzaExvY2F0aW9uU3RyYXRlZ3l9KSxcbiAgICAgICAgSFRUUF9QUk9WSURFUlNcblxuICAgIF1cblxuKTsiLCJleHBvcnQgY2xhc3MgVXNlciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGVtYWlsOiBzdHJpbmcsIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nLCBwdWJsaWMgZmlyc3ROYW1lPzogc3RyaW5nLCBwdWJsaWMgbGFzdE5hbWU/OiBzdHJpbmcpIHt9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
