import { SlashCommandBuilder } from "@discordjs/builders";

const channelsCommand = new SlashCommandBuilder()
  .setName("channels")
  .setDescription("Channels cmd")
  .addChannelOption((option) =>
    option.setName("channel").setDescription("Add a channel").setRequired(true)
  )
  .addBooleanOption((option) =>
    option
      .setName("deletemsgs")
      .setDescription("Delete the messages")
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option.setName("age").setDescription("Add your age")
  )
  .addAttachmentOption((option) =>
    option.setName("photo").setDescription("add a photo")
  );

export default channelsCommand.toJSON();
