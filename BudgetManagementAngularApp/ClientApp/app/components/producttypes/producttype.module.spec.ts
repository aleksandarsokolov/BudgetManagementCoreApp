import { ProductTypeModule } from './producttype.module';

describe('ProductTypeModule', () => {
    let productTypeModule: ProductTypeModule;

  beforeEach(() => {
      productTypeModule = new ProductTypeModule();
  });

  it('should create an instance', () => {
      expect(productTypeModule).toBeTruthy();
  });
});
