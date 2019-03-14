import { TestBed, inject } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let utilityService: UtilityService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilityService]
    });
    utilityService = TestBed.get(UtilityService);
  });

  it('should convert the date into yyyy-MM-DD format', () =>{
    const date: Date = new Date('08/28/2018');
    const expectedDate: string = '2018-08-28T00:00:00Z';

    let dateResult = utilityService.getStringifiedDate(date);
    expect(dateResult).toBe(expectedDate);
  });

  it('should handle null date values', () =>{
    const date: Date = null;

    let dateResult = utilityService.getStringifiedDate(date);
    expect(dateResult).toBe(null);
  });
});
