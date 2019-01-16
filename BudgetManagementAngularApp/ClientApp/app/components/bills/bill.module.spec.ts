import { BillModule } from './bill.module';

describe('BillModule', () => {
  let billModule: BillModule;

  beforeEach(() => {
    billModule = new BillModule();
  });

  it('should create an instance', () => {
    expect(billModule).toBeTruthy();
  });
});
