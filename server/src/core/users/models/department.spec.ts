import { Department } from './department.entity';

describe('Department', () => {
  it('should be defined', () => {
    expect(new Department()).toBeDefined();
  });
});
