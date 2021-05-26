import { Test, TestingModule } from '@nestjs/testing';
import { PartsHistoricService } from './parts-historic.service';

describe('PartsHistoricService', () => {
  let service: PartsHistoricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartsHistoricService],
    }).compile();

    service = module.get<PartsHistoricService>(PartsHistoricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
