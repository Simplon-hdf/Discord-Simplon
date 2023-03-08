import {CategoryTemplate} from "../channels/category/category-template";

export class Course {

  private readonly _name: string;
  private _categoryTemplate?: CategoryTemplate;


  constructor(name: string, categoryTemplate?: CategoryTemplate) {
    this._name = name;
    this._categoryTemplate = categoryTemplate;
  }


  get name(): string {
    return this._name;
  }

  getCategoryTemplate(): CategoryTemplate | undefined{
    return this._categoryTemplate;
  }

  setCategoryTemplate(categoryTemplate: CategoryTemplate) : void{
    this._categoryTemplate = categoryTemplate;
  }
}