import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()

export class AccessPermission implements CanActivate {
    public loggedUserType: number;

    constructor(
        private router: Router) {
    }

    canActivate() {
        var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUserType = loggedUser.userType;
        if (this.loggedUserType === 1) {
            return true;
        }

        this.router.navigate(['/backoffice']);
        return false;
    }
}
