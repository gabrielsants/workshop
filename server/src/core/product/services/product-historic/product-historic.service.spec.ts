import { Test, TestingModule } from '@nestjs/testing';
import { ProductHistoricService } from './product-historic.service';

describe('ProductHistoricService', () => {
  let service: ProductHistoricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductHistoricService],
    }).compile();

    service = module.get<ProductHistoricService>(ProductHistoricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
