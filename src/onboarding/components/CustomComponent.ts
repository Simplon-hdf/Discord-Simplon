import { ComponentBuilder, Interaction, ModalBuilder } from 'discord.js';

export default abstract class CustomComponent {
  protected abstract customId: string;
  protected abstract data: any;
  protected abstract component: ComponentBuilder | ModalBuilder;

  public abstract execute(interaction: Interaction): void;

  public get_customId(): string {
    return this.customId;
  }

  public get_data(): any {
    return this.data;
  }

  public get_component(): ComponentBuilder | ModalBuilder {
    return this.component;
  }
}
