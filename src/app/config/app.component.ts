import { Component, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ProgressbarComponent } from "../components/progressbar/progressbar.component";
import { ToasterComponent } from '../components/toaster/toaster.component';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WrapperComponent, NavbarComponent, ToasterComponent, ProgressbarComponent],
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
