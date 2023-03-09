import { ICategory } from './category';
import { HttpUtils } from '../../utils/http';
import { Routes } from '../../utils/Routes';
import { ApiError } from '../../utils/exceptions/api-error';
import logger from '../../utils/logger';

export class CategoryManager {
  async registerCategory(category: ICategory) {
    const categoryJSON = await new HttpUtils().post(
      Routes.REGISTER_GUILD_CATEGORY,
      JSON.parse(JSON.stringify(category)),
    );

    if (categoryJSON.statusCode === 409) {
      throw new ApiError('API response is empty on register category');
    }

    logger.debug(
      '[Registering channel] ' +
        ' : Guild => name : ' +
        category.getCategoryName() +
        ' | id: ' +
        category.getCategoryUuid() +
        ' | categories: ' +
        category.getGuildUuid(),
    );

    return categoryJSON;
  }
}
