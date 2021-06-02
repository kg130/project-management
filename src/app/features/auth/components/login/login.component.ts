import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  loginSubmit(): void {
    this.authService.signIn(this.loginForm.value).subscribe(a => {
      if (a) {
        this.authService.persistToken(a);
        this.router.navigate(['/']);
      }
    })
  }

}
