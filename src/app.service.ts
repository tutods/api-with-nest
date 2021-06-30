import { Injectable } from '@nestjs/common';
import { ApiStatusType } from './types/ApiStatus';

@Injectable()
export class AppService {
	getApiStatus(): ApiStatusType {
		return {
			status: 'API is working 🤟'
		};
	}
}
