import { ComponentBuilder, Interaction } from "discord.js";

export default abstract class CustomComponent {

  protected abstract customId: string;
  protected abstract data: any; 
  protected abstract component: ComponentBuilder;

  public abstract execute(interaction: Interaction): void;
 
  public get_customId(): string {
    return this.customId;
  }
  
  public get_data(): any {
    return this.data;
  }

  public get_component(): ComponentBuilder {
    return this.component;
  }

}