import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardLgImage } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  user: FormGroup = this.fb.group({});
  userId:any;
  constructor(private fb: FormBuilder, private service: ServiceService, private router: Router,private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.user = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      image_url: ['', Validators.required]
    });

    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);
    if(this.userId){
    console.log("inside if");
    this.service.getUser(this.userId).subscribe((response)=>{
      console.log(response);
      this.user.patchValue(response);
    })
    }  
  }
  onSubmit(): void {
    if (this.user.valid) {
      const formData = this.user.value;
      console.log('Form Submitted', formData);
      if (this.userId) {
        // console.log("put case");
        
        let userOb:any = { ...this.user.value };  
        userOb['id'] = this.userId;  
        console.log(userOb);
        
        this.service.updateUser(userOb).subscribe(response => console.log(response));
      }else{
        this.service.addUser(this.user.value).subscribe(response => console.log(response));
      }
      this.router.navigate(["/dashboard"]);
    } else {
      console.log('Form is invalid');
    }
  }
  handleUserListClick(){
    this.router.navigate(["/dashboard"]);
  }

 
}
