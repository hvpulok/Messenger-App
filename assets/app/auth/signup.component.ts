
import {Component} from "angular2/src/core/metadata";
import {OnInit} from "angular2/src/core/linker/interfaces";
import {ControlGroup, Control} from "angular2/src/common/forms/model";
import {FormBuilder} from "angular2/src/common/forms/form_builder";
import {Validators} from "angular2/src/common/forms/validators";
@Component({
    selector: 'my-signup',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <form [ngFormModel]="myForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input 
                        [ngFormControl] ="myForm.find('firstName')"
                        type="text" id="firstName" class="form-control"
                    >
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input 
                        [ngFormControl] ="myForm.find('lastName')"
                        type="text" id="lastName" class="form-control"
                    >
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                        [ngFormControl] ="myForm.find('email')"
                        type="text" id="email" class="form-control"
                    >
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        [ngFormControl] ="myForm.find('password')"
                        type="password" id="password" class="form-control"
                    >
                </div>
                <button 
                    [disabled]="!myForm.valid"
                    type="submit" 
                    class="btn btn-primary"
                    >Sign Up
                </button>
            </form>
        </section>
`,
})

export class SignupComponent implements OnInit{
    myForm: ControlGroup;
    constructor(private _fb:FormBuilder){}

    onSubmit(){
        console.log(this.myForm.value);
    }

    ngOnInit(){
        this.myForm = this._fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required],
        })
    }

    private isEmail(control: Control): {[s: string]: boolean}{
        if(!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"){
            return {invalidEmail: true};
        }

    }

}