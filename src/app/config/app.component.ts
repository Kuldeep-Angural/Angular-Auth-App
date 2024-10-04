import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ToasterService } from '../services/toaster.service';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { WrapperComponent } from '../components/wrapper/wrapper.component';

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
