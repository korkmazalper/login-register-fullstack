import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import cors from 'cors';

export {ApplicationConfig};

export class UserLoginBeApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

  
    this.sequence(MySequence);

  
    this.static('/', path.join(__dirname, '../public'));

   
    this.middleware(async (ctx, next) => {
      return new Promise<void>((resolve, reject) => {
        cors({
          origin: 'http://localhost:3001', 
          methods: ['GET', 'POST'],  
          allowedHeaders: ['Content-Type', 'Authorization'],  
        })(ctx.request, ctx.response, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }).then(next);
    });

    
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    
    this.bootOptions = {
      controllers: {
        
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
