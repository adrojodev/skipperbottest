import { SlashCommandBuilder } from "@discordjs/builders";

const promptCommand = new SlashCommandBuilder()
  .setName("prompt")
  .setDescription("Send an idea for the next doodle ✍️");

export default promptCommand.toJSON();
