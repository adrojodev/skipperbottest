import { SlashCommandBuilder } from "@discordjs/builders";

const rulesCommand = new SlashCommandBuilder()
  .setName("rules")
  .setDescription("These are the rules of this great community 🫶");

export default rulesCommand.toJSON();
