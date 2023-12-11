import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  constructor() {}

  getClientSecret(): string {
    // Return environment variable (Replace 'clientSecret' with your variable name)
    return (window as any).env.clientSecret || 'default_client_secret';
  }
  getClientId(): string {
    // Return environment variable (Replace 'clientSecret' with your variable name)
    return (window as any).env.clientId || 'default_client_secret';
  }
  getUserAPIBase(): string {
    // Return environment variable (Replace 'clientSecret' with your variable name)
    return (window as any).env.userAPIBase || 'default_client_secret';
  }
}
