import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ToasterService } from '../services/toaster.service';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WrapperComponent, NavbarComponent, ToasterComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';

  @ViewChild(ToasterComponent) toasterComponent!: ToasterComponent;

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'angulartp' });
  }

  constructor(private toasterService: ToasterService,private meta: Meta) { }

  ngAfterViewInit() {
    this.toasterService.register(this.toasterComponent);
  }

}
