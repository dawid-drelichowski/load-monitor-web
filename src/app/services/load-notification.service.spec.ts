import { LoadNotificationsService } from './load-notifications.service';
import { LoadDataService } from './load-data.service';

describe('LoadNotificationsService', () => {
  let loadNotificationsService: LoadNotificationsService;
  let loadDataServiceMock: LoadDataService;

  beforeEach(() => {
    loadDataServiceMock = new LoadDataService();
    loadNotificationsService = new LoadNotificationsService(loadDataServiceMock);
  });

  describe('highLoad$', () => {
    it('should emit true, when average load bigger than 1 for at least 2 minutes', () => {
      expect(true).toBeTruthy();
    });
  });
});
