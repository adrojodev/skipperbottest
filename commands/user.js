import { SlashCommandBuilder } from "@discordjs/builders";

const usersCommand = new SlashCommandBuilder()
  .setName("users")
  .setDescription("Users cmd")
  .addUserOption((option) =>
    option.setName("user").setDescription("Add a user")
  );

export default usersCommand.toJSON();
