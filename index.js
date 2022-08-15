import {
  ActionRowBuilder,
  Client,
  ModalBuilder,
  Routes,
  SelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import orderCommand from "./commands/order.js";
import rolesCommand from "./commands/roles.js";
import usersCommand from "./commands/user.js";
import channelsCommand from "./commands/channel.js";
import registerCommand from "./commands/register.js";
import { REST } from "@discordjs/rest";

config();

const token = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});

const rest = new REST({ version: "10" }).setToken(token);

client.on("ready", () => {
  console.log(`${client.user.tag} is online 🤖`);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName == "order") {
      const actionRowComponent = new ActionRowBuilder().setComponents(
        new SelectMenuBuilder().setCustomId("food_options").setOptions([
          { label: "Cake", value: "cake" },
          { label: "Pizza", value: "pizza" },
          { label: "Sushi", value: "sushi" },
        ])
      );
      const actionRowDrinksMenu = new ActionRowBuilder().setComponents(
        new SelectMenuBuilder().setCustomId("drinks_options").setOptions([
          { label: "Coke", value: "coke" },
          { label: "Sprite", value: "sprite" },
          { label: "Water", value: "water" },
        ])
      );
      interaction.reply({
        components: [actionRowComponent.toJSON(), actionRowDrinksMenu.toJSON()],
      });
    } else if (interaction.commandName == "register") {
      const modal = new ModalBuilder()
        .setTitle("Register user form")
        .setCustomId("registerUserModal")
        .setComponents(
          new ActionRowBuilder().setComponents(
            new TextInputBuilder()
              .setLabel("username")
              .setCustomId("username")
              .setStyle(TextInputStyle.Short)
          ),
          new ActionRowBuilder().setComponents(
            new TextInputBuilder()
              .setLabel("email")
              .setCustomId("email")
              .setStyle(TextInputStyle.Short)
          ),
          new ActionRowBuilder().setComponents(
            new TextInputBuilder()
              .setLabel("comment")
              .setCustomId("comment")
              .setStyle(TextInputStyle.Paragraph)
          )
        );

      interaction.showModal(modal);
    } else if (interaction.commandName == "users") {
      const user = interaction.options.get("user").user.username;
      interaction.reply(`Acabas de agregar a: ${user}`);
    } else if (interaction.commandName == "channels") {
      const channel = interaction.options.get("channel").channel.name;
      interaction.reply(`Acabas de agregar el canal #${channel}`);
    } else {
      interaction.reply("This is not used");
    }
  } else if (interaction.isSelectMenu()) {
    if (interaction.customId == "food_options") {
    }
  } else if (interaction.isModalSubmit()) {
    const username = interaction.fields.getTextInputValue("username");
    const email = interaction.fields.getTextInputValue("email");
    const comments = interaction.fields.getTextInputValue("comment");
    interaction.reply(
      `Submission received, your submissiongoes like this 👇 \nname: ${username}\nemail: ${email}\ncomments: ${comments} `
    );
  }
});

async function main() {
  const commands = [
    orderCommand,
    rolesCommand,
    usersCommand,
    channelsCommand,
    registerCommand,
  ];

  try {
    console.log("started refreshing applications (/) commands");

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    client.login(token);
  } catch (err) {
    console.log(err);
  }
}

main();
