import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: any[] = [];
  constructor(private service: ServiceService,private router: Router){
    service.getAllUsers().subscribe(response => this.users=response);
  }
  handleAddUserClick(){
    this.router.navigate(["/user"]);
  }
  handleEditClick(id: string){

    let route  = "/user/" + id
    console.log(route);
    
    this.router.navigate([route]);
  }
}
