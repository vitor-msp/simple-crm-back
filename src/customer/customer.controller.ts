import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

@Controller('/customer')
export class CustomerController {
  @Get()
  get() {
    return 'customer';
  }
}
