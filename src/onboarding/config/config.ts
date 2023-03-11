export class Config implements IConfig {
  private _course_creation_channel_id: number;
  private _class_creation_channel_id: number;
  private _identification_verification_channel: number;
  private _classes_selection_channel_id: number;
  private _factories_names: List<string>;

  constructor(
    course_creation_channel_id: number,
    class_creation_channel_id: number,
    identification_verification_channel: number,
    classes_selection_channel_id: number,
  ) {
    this._course_creation_channel_id = course_creation_channel_id;
    this._class_creation_channel_id = class_creation_channel_id;
    this._identification_verification_channel =
      identification_verification_channel;
    this._classes_selection_channel_id = classes_selection_channel_id;
    this._factories_names = new List<string>();
  }

  get course_creation_channel_id(): number {
    return this._course_creation_channel_id;
  }

  set course_creation_channel_id(value: number) {
    this._course_creation_channel_id = value;
  }

  get class_creation_channel_id(): number {
    return this._class_creation_channel_id;
  }

  set class_creation_channel_id(value: number) {
    this._class_creation_channel_id = value;
  }

  get identification_verification_channel(): number {
    return this._identification_verification_channel;
  }

  set identification_verification_channel(value: number) {
    this._identification_verification_channel = value;
  }

  get classes_selection_channel_id(): number {
    return this._classes_selection_channel_id;
  }

  set classes_selection_channel_id(value: number) {
    this._classes_selection_channel_id = value;
  }

  get factories_names(): List<string> {
    return this._factories_names;
  }

  addFactory(factory_name: string) {
    this._factories_names.add(factory_name);
  }

  removeFactory(factory_name: string) {
    this._factories_names.remove(factory_name);
  }
}
