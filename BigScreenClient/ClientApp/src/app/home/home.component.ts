import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { NavigationService } from "../services/navigation.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.css"]
})

export class HomeComponent {   

  constructor(private router: Router, public nav: NavigationService) { }

  public joinForm = new FormGroup({
    groupName: new FormControl("")
  })
  
  public onSubmit(): void {
    console.log(this.joinForm.value);
    this.nav.groupName = this.joinForm.controls["groupName"].value;
    this.router.navigateByUrl("/guest");
  }
}