import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AppLayoutComponent } from '../../core/vendors/apollo/app.layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-apollo-basic-layout',
  standalone: true,
  templateUrl: './apollo-basic-layout.component.html',
  styleUrls: ['./apollo-basic-layout.component.scss'],
  imports: [CommonModule, AppLayoutComponent, RouterOutlet, NgIf],
})
export class ApolloBasicLayoutComponent {}
