import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';



@Component({
  selector: 'app-playform',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './playform.component.html',
  styleUrl: './playform.component.css'
})
export class PlayformComponent implements OnInit{
  userForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    // Initialize the form with form controls and validations
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  // Convenient getters for easy access in the template
  get username() { return this.userForm.get('username')!; }
  get email() { return this.userForm.get('email')!; }
  get password() { return this.userForm.get('password')!; }

  // Handle form submission
  onSubmit() {
    if (this.userForm.valid) {
      this.submitted = true;
      console.debug('Form Submitted!', this.userForm.value);
      // Here, you can proceed with further processing (e.g., sending data to an API)
    }
  }
}
