import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppLayoutComponent } from '../../core/vendors/apollo/app.layout.component';

@Component({
  selector: 'app-basic-layout',
  standalone: true,
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss'],
  imports: [CommonModule, RouterOutlet, AppLayoutComponent, NgIf],
})
export class BasicLayoutComponent {}
