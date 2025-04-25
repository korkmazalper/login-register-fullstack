import { Entity, model, property } from '@loopback/repository';

@model()  // Remove {settings: {strict: false}} as it's not necessary for relational databases
export class User extends Entity {
  @property({
    type: 'number',
    id: true,    // Primary key
    generated: true,  // Automatically generated (auto-incremented in the database)
  })
  id?: number;

  @property({
    type: 'string',
    required: true,  // Email is required
    unique: true,    // Ensure that the email is unique
  })
  email: string;

  @property({
    type: 'string',
    required: true,  // Password is required
  })
  password: string;

 
  

  // If you want to allow additional dynamic properties, you can explicitly define them (though it's not common in relational DB models)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here (e.g., one-to-many relationships, etc.)
}

export type UserWithRelations = User & UserRelations;
