import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  details = {
    title: 'Identity Hub',
    subTitle:
      'Your central platform for managing user identities and authentication.',
    description:
      'Built using ASP.NET and Angular, provides a secure and scalable solution for handling user accounts, authentication, and authorization.',
    features: [
      'User Registration and Login',
      'Password Recovery and Reset',
      'Role-Based Access Control',
      'Single Sign-On (SSO)',
      'OAuth2 Integration',
      'OpenID Connect Integration',
      'Social Media Login',
      'Token Refresh',
      'Email Integration',
      'Entity Framework Core',
      'API Documentation with Swagger',
    ],
    documentationLink: 'https://github.com/Njabulo240/IdentityHub',
    supportLink: 'https://github.com/Njabulo240/IdentityHub',
    tokenRefreshInfo:
      'Tokens are refreshed automatically upon expiration to ensure a seamless user experience.',
  };
}
