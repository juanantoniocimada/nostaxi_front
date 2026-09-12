import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-associated-business',
  imports: [HeaderComponent, MatAnchor],
  templateUrl: './associated-business.html',
  styleUrl: './associated-business.scss',
})
export class AssociatedBusiness {

}
