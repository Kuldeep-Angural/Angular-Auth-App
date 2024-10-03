import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToasterService } from '../services/toaster.service';
import { ToasterComponent } from '../toaster/toaster.component';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WrapperComponent, NavbarComponent, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';

  @ViewChild(ToasterComponent) toasterComponent!: ToasterComponent;

  constructor(private toasterService: ToasterService) {}

  ngAfterViewInit() {
    this.toasterService.register(this.toasterComponent);
  }

}
