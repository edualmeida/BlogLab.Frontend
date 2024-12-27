import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [FooterComponent]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
