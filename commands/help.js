import { SlashCommandBuilder } from "@discordjs/builders";

const helpCommand = new SlashCommandBuilder()
  .setName("help")
  .setDescription("I could tell you what I could help you with 🦊");

export default helpCommand.toJSON();
