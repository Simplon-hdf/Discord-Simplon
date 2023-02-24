import {CategoryTemplate} from "../channels/category/category-template";

export class Course {

  private readonly _id: number;
  private readonly _name: string;

  private readonly _categoryTemplate: CategoryTemplate;


  constructor(id: number, name: string, categoryTemplate: CategoryTemplate) {
    this._id = id;
    this._name = name;
    this._categoryTemplate = categoryTemplate;
  }


  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get categoryTemplate(): CategoryTemplate {
    return this._categoryTemplate;
  }
}