
import {Component} from "angular2/src/core/metadata";
import {AuthService} from "./auth.service";
import {Router} from "angular2/router";

@Component({
    selector: 'my-logout',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <button
                (click)="onLogout()"
                class="btn btn-danger"
                >
                Logout
            </button>
        </section>

`,

})

export class LogoutComponent{
    constructor(private _authService : AuthService, private _router: Router){}

    onLogout(){
        this._authService.logout();
        this._router.navigate(['Signin']);
    }
}