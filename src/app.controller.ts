import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiStatusType } from './types/ApiStatus';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getStatus(): ApiStatusType {
		return this.appService.getApiStatus();
	}
}
