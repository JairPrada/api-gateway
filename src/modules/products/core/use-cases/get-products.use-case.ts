import { ProductResponseDto } from '../../dto';

export abstract class GetProductsUseCase {
  abstract execute(userId: string): Promise<ProductResponseDto[]>;
}
