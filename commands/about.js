import { SlashCommandBuilder } from "@discordjs/builders";

const aboutCommand = new SlashCommandBuilder()
  .setName("about")
  .setDescription("Let me let you know what is Humankind 🤍🖤");

export default aboutCommand.toJSON();
