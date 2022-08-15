import { SlashCommandBuilder } from "@discordjs/builders";

const banCommand = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Ban user form guild")
  .addUserOption((option) =>
    option.setName("user").setDescription("Add a user")
  );

export default usersCommand.toJSON();
