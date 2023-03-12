import { ICategory } from './category';
import { HttpUtils } from '../../utils/http';
import { HttpRoutes } from '../../utils/routes/http-routes';
import { ApiError } from '../../utils/exceptions/api-error';
import logger from '../../utils/logger';

export class CategoryManager {
  async registerCategory(category: ICategory) {
    const categoryJSON = await new HttpUtils().post(
      HttpRoutes.REGISTER_GUILD_CATEGORY,
      JSON.parse(JSON.stringify(category)),
    );

    logger.debug(
      '[Registering category] ' +
        ' : Guild => name : ' +
        category.getCategoryName() +
        ' | id: ' +
        category.getCategoryUuid() +
        ' | categories: ' +
        category.getGuildUuid(),
    );

    return categoryJSON;
  }

  async updateCategoryName(category: ICategory) {
    const categoryJSON = await new HttpUtils().patch(
      HttpRoutes.UPDATE_CATEGORY_NAME,
      JSON.parse(JSON.stringify(category)),
    );

    if (categoryJSON.statusCode === 409) {
      return;
    }

    logger.debug(
      '[Updating category name] ' +
        ' : Guild => name : ' +
        category.getCategoryName() +
        ' | id: ' +
        category.getCategoryUuid() +
        ' | categories: ' +
        category.getGuildUuid(),
    );

    return categoryJSON;
  }

  async deleteCategory(categoryUUID: string) {
    const categoryJSON = await new HttpUtils().delete(
      HttpRoutes.DELETE_CATEGORY,
      null,
      categoryUUID,
    );

    if (categoryJSON.statusCode === 409) {
      return;
    }

    logger.debug('[Deleting category] ' + ' : Guild => name : ' + categoryUUID);

    return categoryJSON;
  }
}
