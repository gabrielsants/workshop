import { Test, TestingModule } from '@nestjs/testing';
import { FileHistoricService } from './file-historic.service';

describe('FileHistoricService', () => {
  let service: FileHistoricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileHistoricService],
    }).compile();

    service = module.get<FileHistoricService>(FileHistoricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
