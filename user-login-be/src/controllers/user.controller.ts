import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { getModelSchemaRef, post, requestBody, response, HttpErrors, get } from '@loopback/rest';
import { User } from '../models';
import { UserRepository } from '../repositories';
import { HashService } from '../services/hash.service';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject('services.HashService') private hashService: HashService,
  ) {}

  @post('/users/register')
  @response(201, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {
          exclude: ['id'],
        }),
      },
    },
  })
  async register(@requestBody() user: User): Promise<any> {
   
    const existingUser = await this.userRepository.findOne({ where: { email: user.email } });

    if (existingUser) {
      throw new HttpErrors.BadRequest('User already exists');
    }

  
    user.password = await this.hashService.hashPassword(user.password);

    try {
     
      const createdUser = await this.userRepository.create(user);
      return { user: createdUser };
    } catch (error) {
   
      throw new HttpErrors.InternalServerError('Error during registration');
    }
  }

  @post('/users/login')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {
          exclude: ['id'],
        }),
      },
    },
  })
  async login(@requestBody() user: { email: string; password: string }): Promise<any> {
    const foundUser = await this.userRepository.findOne({ where: { email: user.email } });

    if (!foundUser || !(await this.hashService.comparePassword(user.password, foundUser.password))) {
      throw new HttpErrors.Unauthorized('Invalid email or password');
    }

    return { user: foundUser };
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, { exclude: ['password'] }),
        },
      },
    },
  })
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new HttpErrors.InternalServerError('Error fetching users');
    }
  }
}
