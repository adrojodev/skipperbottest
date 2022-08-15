import { SlashCommandBuilder } from "@discordjs/builders";

const orderCommand = new SlashCommandBuilder()
  .setName("order")
  .setDescription("Order your favourite meal");

export default orderCommand.toJSON();
