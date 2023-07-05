import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    get(): string {
        return "products"
    }
}
