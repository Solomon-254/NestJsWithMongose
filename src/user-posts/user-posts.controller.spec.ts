import { Test, TestingModule } from '@nestjs/testing';
import { UserPostsController } from './user-posts.controller';
import { UserPostsService } from './user-posts.service';

describe('UserPostsController', () => {
  let controller: UserPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPostsController],
      providers: [UserPostsService],
    }).compile();

    controller = module.get<UserPostsController>(UserPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
