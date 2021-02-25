import { Injectable } from '@angular/core';
import { Environment } from '../types/environment.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  config: Environment = environment;
}
