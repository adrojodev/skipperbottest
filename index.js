import {
  Client,
  Routes,
  EmbedBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  ActionRowBuilder,
} from "discord.js";
import helpCommand from "./commands/help.js";
import aboutCommand from "./commands/about.js";
import rulesCommand from "./commands/rules.js";
import promptCommand from "./commands/prompt.js";
import { REST } from "@discordjs/rest";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

function makeid() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const firebaseConfig = {
  apiKey: "AIzaSyCbDLF09yn8kxHXfnULe7fraIwXMdMEx4M",
  authDomain: "humankind-637da.firebaseapp.com",
  databaseURL: "https://humankind-637da-default-rtdb.firebaseio.com",
  projectId: "humankind-637da",
  storageBucket: "humankind-637da.appspot.com",
  messagingSenderId: "707375406570",
  appId: "1:707375406570:web:7ddbf35bca0f36d1f62693",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

let commandPrompts = [];
let messagePrompts = [];

onValue(ref(database, "interactions"), (snapshot) => {
  commandPrompts = [];
  messagePrompts = [];
  let gottedValue = snapshot.val();

  Object.values(gottedValue).forEach((element) => {
    commandPrompts.push(element.commands);
    messagePrompts.push(element.responses);
  });
});

const token =
  "MTAwMzc2NTY0NjAwMzI3MzczOA.Gbvdko.St4OaRKtLjnvF2VVHhYIRPRVb2aAgu4ECO-dbE";
const CLIENT_ID = "1003765646003273738";
const GUILD_ID = "1003777028828438661";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});

const rest = new REST({ version: "10" }).setToken(token);

const prefixes = ["skipper ", "skip "];

client.on("ready", () => {
  console.log(`Hey, I'm here 🦊 ${client.user.username}!`);
});

client.on("messageCreate", (message) => {
  let isTheCommandHere = false;

  let thisMessage = message.content.toLowerCase();

  if (thisMessage == "skipper" || thisMessage == "skip") {
    message.reply(
      "While I consider myself pretty smart, I'm not that great with telepathy communication. I don't think our brains have evolved to master that skill. Try using a word like help or about so I can help you."
    );
  }

  let prefix = false;

  for (const thisPrefix of prefixes) {
    if (thisMessage.startsWith(thisPrefix)) prefix = thisPrefix;
  }

  if (!thisMessage.startsWith(prefix) || message.author.bot) return;

  const command = message.content.toLowerCase().slice(prefix.length).trim();

  if (thisMessage == "skipper" || thisMessage == "skip") {
    message.reply("Hi");
  }

  if (command == "help" || command == "help me" || command == "help me!") {
    isTheCommandHere = true;
    const helpInfo = new EmbedBuilder()
      .setTitle("Skipper help 🦊")
      .setColor("#000")
      .setDescription("Here's what I could help you with.")
      .addFields(
        {
          name: "Say hello 👋",
          value: "`Skipper hi/hello/hola`",
          inline: true,
        },
        {
          name: "Register into waitlist ✏️",
          value: "`Skipper register/waitlist/wl/list/al`",
          inline: true,
        },
        {
          name: "Know us ⚔️",
          value: "`Skipper Maya/Dallas/Ankka/Skipper`",
          inline: true,
        },
        {
          name: "Know Humankind 🤍",
          value: "`Skipper about/humankind`",
          inline: true,
        },
        {
          name: "Get security tips 🛡",
          value: "`Skipper security tips`",
          inline: true,
        },
        {
          name: "Know the rules 🫶",
          value: "`Skipper rules`",
          inline: true,
        },
        {
          name: "Apply to the HK Fund 💌",
          value: "`Skipper apply/fund`",
          inline: true,
        }
      );

    message.reply({ embeds: [helpInfo] });
  } else if (
    command == "hello" ||
    command == "hi" ||
    command == "hola" ||
    command == "hello!" ||
    command == "hi!" ||
    command == "hola!"
  ) {
    isTheCommandHere = true;
    message.reply(`Hi, ${message.author.username}`);
  } else if (command == "tell me about maya" || command == "maya") {
    isTheCommandHere = true;
    const mayaInfo = new EmbedBuilder()
      .setTitle("Maya")
      .setColor("#000")
      .setDescription(
        `Maya is a free spirit with an optimistic approach to life—outgoing, openhearted, and open-minded. Being full of charm and energy, she naturally became the leader of her small group. Her enthusiasm and curiosity are contagious which motivate and inspire them to search for new adventures.

    Maya profoundly cares about the many creatures she finds on her journey. This generosity leads the crew to go on many escapades to help others. She has also built a community in Avocado Hill that welcomes the many Kinds without judgment.
    
    
    But Maya is not perfect. She can be overly optimistic and not see when people abuse her trust, leading her to make well-intentioned but naive decisions. Being an idealist makes her restless, too, constantly feeling like there’s something else to do and that things are rarely ever good enough. For her, it’s hard to focus, and the thrill of a new adventure can make it challenging to commit to long-term experiences.
    
    Maya has a secret tragedy from her past that will lead her to her biggest adventure.`
      )
      .setImage(
        "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62ce13d0910000f75fa033cf_bio-04.png"
      );
    message.reply({ embeds: [mayaInfo] });
  } else if (command == "tell me about dallas" || command == "dallas") {
    isTheCommandHere = true;
    const dallasInfo = new EmbedBuilder()
      .setTitle("Dallas")
      .setColor("#000")
      .setDescription(
        `Dallas is a unique monster who’s been Maya’s best friend since they were small kids. He’s warm-hearted and compassionate and always thinks about his friends before himself.

        While capable of using his incredible destructive skills and being equipped with pretty powerful weapons, Dallas would never want to harm anyone or any living thing unless it’s to protect someone. He’s peaceful at heart.
        
        
        Dallas may be a mighty giant, but he’s still silly and playful with Maya and her friends and enjoys going on adventures through The Forsaken Plane, Delusion Land, Deadfield, or The Mammoth Reach.
        
        Maya can be chaotic and unpredictable, so Dallas usually maintains an order and brings the team back on course. He’s also there to support his friends when they're stressed or feeling down.
        
        Even though Dallas can easily sense how others feel, it’s hard for him to express his emotions—there’s a hidden story inside him.`
      )
      .setImage(
        "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62ce13d02a8ea909e6325bb1_bio-03.png"
      );
    message.reply({ embeds: [dallasInfo] });
  } else if (
    command == "tell me about skipper" ||
    command == "tell me about you" ||
    command == "skipper" ||
    command == "you"
  ) {
    isTheCommandHere = true;
    const skipperInfo = new EmbedBuilder()
      .setTitle("That's me, Skipper")
      .setColor("#000")
      .setDescription(
        `Meet the engineer of the group. They excel at analyzing situations to reach the root of the problem and quickly develop a practical solution. Skipper is often insightful about the world around them and can find humor in it—usually sarcastic.

        Skipper's methods sometimes seem bizarre and random for the rest of the team, but they come from all the technical mastery learned over time and usually help everyone get out of trouble. It can be making an upgrade to Dallas’s arm, devising a way to cross Death River, or hacking a puzzle in a dungeon.
        
        
        While small, Skipper is an agile and fearful fighter. They’re always creating tools and weapons that surprise their enemies. And in a crisis, instead of panicking, Skip is busy finding a way out. But sometimes, this can put everyone at risk.
        
        Skipper can be stubborn—mainly because they see things others can’t. Skip is usually private and reserved and prefers looking at the stars in a quiet snooky during chill times.`
      )
      .setImage(
        "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62ce13d08327d010c0602cf4_bio-02.png"
      );
    message.reply({ embeds: [skipperInfo] });
  } else if (command == "tell me about ankka" || command == "ankka") {
    isTheCommandHere = true;
    const ankkaInfo = new EmbedBuilder()
      .setTitle("Ankka the Hunter")
      .setColor("#000")
      .setDescription(
        `Ankka is the most no-nonsense and serious of the group. She takes pride in her integrity, and when committing to doing something, she makes sure to follow through.

        She’s strong-willed and loves planning everything. Before going on any feat, she asks everyone to be calm and responsible and devise a strategy before walking into danger. But, when the time comes, she won’t hesitate to use her many abilities and weapons, including her Super Duper Vaccum 3000. Ankka is always ready for battle!
        
        
        Since she’s so practical and self-sufficient, she can be blunt and avoid touchy-feely situations. For her, facts matter more than feelings or ideas. Her determination can sometimes make her seem insensitive and close-minded. But, her friends know that she’s just being honest and direct—which they love.
        
        Ankka is sometimes too hard on herself, blaming any failed adventure on her. Skip, who identifies with her, sometimes joins her in quiet times, reflecting by a lonely cliff overseeing The Land of Kinds.`
      )
      .setImage(
        "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62ce13d069ea3891b91996f4_bio-01.png"
      );
    message.reply({ embeds: [ankkaInfo] });
  } else if (command == "about" || command == "humankind") {
    isTheCommandHere = true;
    const humankindInfo = new EmbedBuilder()
      .setTitle("Humankind 🤍🖤")
      .setColor("#000")
      .setDescription(
        `Humankind is a creative team led by Pablo Stanley dedicated to capturing the hearts and minds of kids and adults worldwide with charming creations, a unique vision, and decentralized storytelling.
        

Visit our [website 🤍](https://humankind.art)`
      )
      .setImage(
        "https://assets.bueno.art/images/QmSWV2BstFKNpXez9XbZoiVHJrNC5YSgaAAFNAPNERs9K8?w=600&s=716b8d5892ac5503c3a754d6b52bfbd5"
      );

    message.reply({ embeds: [humankindInfo] });
  } else if (command == "about" || command == "humankind") {
    isTheCommandHere = true;
    const humankindInfo = new EmbedBuilder()
      .setTitle("Humankind 🤍🖤")
      .setColor("#000")
      .setDescription(
        `Humankind is a creative team led by Pablo Stanley dedicated to capturing the hearts and minds of kids and adults worldwide with charming creations, a unique vision, and decentralized storytelling.
        

Visit our [website 🤍](https://humankind.art)`
      )
      .setImage(
        "https://assets.bueno.art/images/QmSWV2BstFKNpXez9XbZoiVHJrNC5YSgaAAFNAPNERs9K8?w=600&s=716b8d5892ac5503c3a754d6b52bfbd5"
      );

    message.reply({ embeds: [humankindInfo] });
  } else if (command == "rules") {
    isTheCommandHere = true;
    const rulesInfo = new EmbedBuilder()
      .setTitle("Rules 🫶")
      .setColor("#000")
      .setDescription(
        `1️⃣  Please be kind and respectful to everyone. HumanKind is about building a welcoming community by inspiring one another, building together, and creating a safe space. Having different opinions is healthy, but having hostile arguments will not be permitted.
      
2️⃣  No harassment, suggestive/NSFW content, hate speech, abusive language, bigotry, or swearing. This is a family-friendly community. 
      
3️⃣  No spamming allowed. Make sure any links you share are relevant to the conversation. 
      
In addition to our rules, the community is expected to uphold Discord’s guidelines: https://discord.com/guidelines.`
      )
      .setImage(
        "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62bd55b5d9bace30da243dbd_be-kind%201.png"
      );

    message.reply({ embeds: [rulesInfo] });
  } else if (
    command == "apply" ||
    command == "artist fund" ||
    command == "fund"
  ) {
    isTheCommandHere = true;
    const artistFundInfo = new EmbedBuilder()
      .setTitle("Artist Fund 🤍🖤")
      .setColor("#000")
      .setDescription(
        `It’s a fund that gives a basic income for a year to selected artists so they can focus on creating without worrying about money. The fund also helps artists learn about web3 and use the power of a community to empower their creations.

If you have doubts here's [more info ✨](https://www.humankind.art/fund)

And if you're an artist, [apply here 🚀](https://buenonft.typeform.com/humankind-fund)`
      )
      .setImage(
        "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62d7913136e43840d2ef5a1e_fire.png"
      );

    message.reply({ embeds: [artistFundInfo] });
  }

  commandPrompts.forEach((commandArray, index) => {
    commandArray.forEach((eachCommand) => {
      if (command == eachCommand) {
        isTheCommandHere = true;
        const promptMessage = messagePrompts[index];
        message.reply(
          promptMessage[Math.floor(Math.random() * promptMessage.length)]
        );
      }
    });
  });

  if (!isTheCommandHere) {
    message.reply(
      "Unfortunately, my vocabulary in this Discord apparatus is limited. I know, you must be dissapointed, since I'm known to be super smart. But, could you try a different word, like `about` or `gm`?\n\nIf you need some hints, try the `/help` command!"
    );
  }

  //   if (command == "help" || command == "help me" || command == "help me!") {
  //     const helpInfo = new EmbedBuilder()
  //       .setTitle("Skipper help 🦊")
  //       .setColor("#000")
  //       .setDescription("Here's what I could help you with.")
  //       .addFields(
  //         {
  //           name: "Say hello 👋",
  //           value: "`Skipper hi/hello/hola`",
  //           inline: true,
  //         },
  //         {
  //           name: "Register into waitlist ✏️",
  //           value: "`Skipper register/waitlist/wl/list/al`",
  //           inline: true,
  //         },
  //         {
  //           name: "Know us ⚔️",
  //           value: "`Skipper Maya/Dallas/Ankka/Skipper`",
  //           inline: true,
  //         },
  //         {
  //           name: "Know Humankind 🤍",
  //           value: "`Skipper about/humankind`",
  //           inline: true,
  //         },
  //         {
  //           name: "Get security tips 🛡",
  //           value: "`Skipper security tips`",
  //           inline: true,
  //         },
  //         {
  //           name: "Know the rules 🫶",
  //           value: "`Skipper rules`",
  //           inline: true,
  //         },
  //         {
  //           name: "Apply to the HK Fund 💌",
  //           value: "`Skipper apply/fund`",
  //           inline: true,
  //         }
  //       );

  //     message.reply({ embeds: [helpInfo] });
  //   } else if (
  //     command == "hello" ||
  //     command == "hi" ||
  //     command == "hola" ||
  //     command == "hello!" ||
  //     command == "hi!" ||
  //     command == "hola!"
  //   ) {
  //     message.reply(`Hi, ${message.author.username}`);
  //   } else if (
  //     command == "register" ||
  //     command == "waitlist" ||
  //     command == "wl" ||
  //     command == "list" ||
  //     command == "al"
  //   ) {
  //     message.reply(
  //       `Even though you’re here at the Discord it’s great for you to register on the waitlist too.

  // Register on this link 👇

  // https://forms.bueno.art/humankind`
  //     );
  //   } else if (command == "tell me about") {
  //     message.reply(`Ask me about any of the characters at Humankind just ask for it.

  // Ex. "Skipper tell me about Maya"`);
  //   } else if (command == "tell me about maya" || command == "maya") {
  //     const mayaInfo = new EmbedBuilder()
  //       .setTitle("Maya")
  //       .setColor("#000")
  //       .setDescription(
  //         `Maya is a free spirit with an optimistic approach to life—outgoing, openhearted, and open-minded. Being full of charm and energy, she naturally became the leader of her small group. Her enthusiasm and curiosity are contagious which motivate and inspire them to search for new adventures.

  //     Maya profoundly cares about the many creatures she finds on her journey. This generosity leads the crew to go on many escapades to help others. She has also built a community in Avocado Hill that welcomes the many Kinds without judgment.

  //     But Maya is not perfect. She can be overly optimistic and not see when people abuse her trust, leading her to make well-intentioned but naive decisions. Being an idealist makes her restless, too, constantly feeling like there’s something else to do and that things are rarely ever good enough. For her, it’s hard to focus, and the thrill of a new adventure can make it challenging to commit to long-term experiences.

  //     Maya has a secret tragedy from her past that will lead her to her biggest adventure.`
  //       )
  //       .setImage(
  //         "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62ce13d0910000f75fa033cf_bio-04.png"
  //       );
  //     message.reply({ embeds: [mayaInfo] });
  //   } else if (command == "tell me about dallas" || command == "dallas") {
  //     const dallasInfo = new EmbedBuilder()
  //       .setTitle("Dallas")
  //       .setColor("#000")
  //       .setDescription(
  //         `Dallas is a unique monster who’s been Maya’s best friend since they were small kids. He’s warm-hearted and compassionate and always thinks about his friends before himself.

  //         While capable of using his incredible destructive skills and being equipped with pretty powerful weapons, Dallas would never want to harm anyone or any living thing unless it’s to protect someone. He’s peaceful at heart.

  //         Dallas may be a mighty giant, but he’s still silly and playful with Maya and her friends and enjoys going on adventures through The Forsaken Plane, Delusion Land, Deadfield, or The Mammoth Reach.

  //         Maya can be chaotic and unpredictable, so Dallas usually maintains an order and brings the team back on course. He’s also there to support his friends when they're stressed or feeling down.

  //         Even though Dallas can easily sense how others feel, it’s hard for him to express his emotions—there’s a hidden story inside him.`
  //       )
  //       .setImage(
  //         "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62ce13d02a8ea909e6325bb1_bio-03.png"
  //       );
  //     message.reply({ embeds: [dallasInfo] });
  //   } else if (
  //     command == "tell me about skipper" ||
  //     command == "tell me about you" ||
  //     command == "skipper" ||
  //     command == "you"
  //   ) {
  //     const skipperInfo = new EmbedBuilder()
  //       .setTitle("That's me, Skipper")
  //       .setColor("#000")
  //       .setDescription(
  //         `Meet the engineer of the group. They excel at analyzing situations to reach the root of the problem and quickly develop a practical solution. Skipper is often insightful about the world around them and can find humor in it—usually sarcastic.

  //         Skipper's methods sometimes seem bizarre and random for the rest of the team, but they come from all the technical mastery learned over time and usually help everyone get out of trouble. It can be making an upgrade to Dallas’s arm, devising a way to cross Death River, or hacking a puzzle in a dungeon.

  //         While small, Skipper is an agile and fearful fighter. They’re always creating tools and weapons that surprise their enemies. And in a crisis, instead of panicking, Skip is busy finding a way out. But sometimes, this can put everyone at risk.

  //         Skipper can be stubborn—mainly because they see things others can’t. Skip is usually private and reserved and prefers looking at the stars in a quiet snooky during chill times.`
  //       )
  //       .setImage(
  //         "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62ce13d08327d010c0602cf4_bio-02.png"
  //       );
  //     message.reply({ embeds: [skipperInfo] });
  //   } else if (command == "tell me about ankka" || command == "ankka") {
  //     const ankkaInfo = new EmbedBuilder()
  //       .setTitle("Ankka the Hunter")
  //       .setColor("#000")
  //       .setDescription(
  //         `Ankka is the most no-nonsense and serious of the group. She takes pride in her integrity, and when committing to doing something, she makes sure to follow through.

  //         She’s strong-willed and loves planning everything. Before going on any feat, she asks everyone to be calm and responsible and devise a strategy before walking into danger. But, when the time comes, she won’t hesitate to use her many abilities and weapons, including her Super Duper Vaccum 3000. Ankka is always ready for battle!

  //         Since she’s so practical and self-sufficient, she can be blunt and avoid touchy-feely situations. For her, facts matter more than feelings or ideas. Her determination can sometimes make her seem insensitive and close-minded. But, her friends know that she’s just being honest and direct—which they love.

  //         Ankka is sometimes too hard on herself, blaming any failed adventure on her. Skip, who identifies with her, sometimes joins her in quiet times, reflecting by a lonely cliff overseeing The Land of Kinds.`
  //       )
  //       .setImage(
  //         "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62ce13d069ea3891b91996f4_bio-01.png"
  //       );
  //     message.reply({ embeds: [ankkaInfo] });
  //   } else if (command == "about" || command == "humankind") {
  //     const humankindInfo = new EmbedBuilder()
  //       .setTitle("Humankind 🤍🖤")
  //       .setColor("#000")
  //       .setDescription(
  //         `Humankind is a creative team led by Pablo Stanley dedicated to capturing the hearts and minds of kids and adults worldwide with charming creations, a unique vision, and decentralized storytelling.

  // Visit our [website 🤍](https://humankind.art)`
  //       )
  //       .setImage(
  //         "https://assets.bueno.art/images/QmSWV2BstFKNpXez9XbZoiVHJrNC5YSgaAAFNAPNERs9K8?w=600&s=716b8d5892ac5503c3a754d6b52bfbd5"
  //       );

  //     message.reply({ embeds: [humankindInfo] });
  //   } else if (command == "security" || command == "security tips") {
  //     const securityTips = [
  //       "Turn off DM’s on every server you join",
  //       "The staff will never send you DM’s, if you believe someone is trying to scam you, report it on the #report-channel",
  //       "Be kind, we’re a great community, keep it cool",
  //     ];

  //     message.reply(
  //       securityTips[Math.floor(Math.random() * securityTips.length)]
  //     );
  //   } else if (command == "rules") {
  //     const rulesInfo = new EmbedBuilder()
  //       .setTitle("Rules 🫶")
  //       .setColor("#000")
  //       .setDescription(
  //         `1️⃣  Please be kind and respectful to everyone. HumanKind is about building a welcoming community by inspiring one another, building together, and creating a safe space. Having different opinions is healthy, but having hostile arguments will not be permitted.

  // 2️⃣  No harassment, suggestive/NSFW content, hate speech, abusive language, bigotry, or swearing. This is a family-friendly community.

  // 3️⃣  No spamming allowed. Make sure any links you share are relevant to the conversation.

  // In addition to our rules, the community is expected to uphold Discord’s guidelines: https://discord.com/guidelines.`
  //       )
  //       .setImage(
  //         "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62bd55b5d9bace30da243dbd_be-kind%201.png"
  //       );

  //     message.reply({ embeds: [rulesInfo] });
  //   } else if (
  //     command == "apply" ||
  //     command == "artist fund" ||
  //     command == "fund"
  //   ) {
  //     const artistFundInfo = new EmbedBuilder()
  //       .setTitle("Artist Fund 🤍🖤")
  //       .setColor("#000")
  //       .setDescription(
  //         `It’s a fund that gives a basic income for a year to selected artists so they can focus on creating without worrying about money. The fund also helps artists learn about web3 and use the power of a community to empower their creations.

  // If you have doubts here's [more info ✨](https://www.humankind.art/fund)

  // And if you're an artist, [apply here 🚀](https://buenonft.typeform.com/humankind-fund)`
  //       )
  //       .setImage(
  //         "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62d7913136e43840d2ef5a1e_fire.png"
  //       );

  //     message.reply({ embeds: [artistFundInfo] });
  //   } else if (command == "random gummy" || command == "gummy") {
  //     const jellyUrl = [
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly1.png?alt=media&token=0c449c07-4945-4d5f-b139-0edabd0b5895",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly10.jpeg?alt=media&token=f65f5f67-364f-4c22-b8ab-d68435d19561",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly11.png?alt=media&token=c92d146d-fe09-4981-9d53-7872ab715d5f",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly12.png?alt=media&token=a5cf6da0-17b1-479c-871d-bf1f4b81020b",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly13.png?alt=media&token=cc7311a3-2cb3-4b30-beea-0abae5689d71",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly14.png?alt=media&token=2d168a6a-5e01-4f09-bbec-1adb8b50cd71",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly15.png?alt=media&token=81f4f7ef-99e2-42c2-bf75-44b2fe185392",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly16.png?alt=media&token=7ab68959-33d8-4d82-b21b-9151bb4ee61e",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly17.jpeg?alt=media&token=dfa048b0-3662-4aaf-8573-a75a5b726667",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly18.png?alt=media&token=961e5d2b-db26-44ce-9c8d-98e04531c08d",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly2.png?alt=media&token=9dbbc7c3-f7de-4aae-8854-441018cf353d",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly20.png?alt=media&token=f80b2312-7822-44a8-8d42-75d36aa2dc45",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly21.png?alt=media&token=49404e72-9a24-4d48-a1b8-62a29ef64149",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly22.png?alt=media&token=c3205195-8b04-40f5-8f3d-a1b0a3357cd2",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly23.png?alt=media&token=9ef4a1ac-012f-441b-bbbf-b8897d415751",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly24.png?alt=media&token=7d3a9a7d-1f6d-4467-a32c-d4a25a7a1eca",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly3.png?alt=media&token=5eafb2a5-f6ab-42b4-9251-7fde73ecc432",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly4.png?alt=media&token=0f6badec-0461-4b43-903b-bd05b3979820",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly5.png?alt=media&token=d59ae9fb-5691-49b5-a7be-8dad38c98b16",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly6.png?alt=media&token=76b12438-9f8a-462f-8143-eaec2ea6b6ea",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly7.png?alt=media&token=3fa8e4d6-b74e-46a3-8e40-b431d7fa6b0b",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly8.png?alt=media&token=17188036-11b2-47c9-a578-b2466d08fcc5",
  //       "https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly9.png?alt=media&token=9c8d3b34-9bc9-4f6e-a7f9-cfa9dba35152",
  //     ];

  //     message.reply(jellyUrl[Math.floor(Math.random() * jellyUrl.length)]);
  //   } else if (command == "cute" || command == "cutie" || command == "so cute") {
  //     message.reply(
  //       "I’m not cute! I’m a warrior, an adventurer, and an engineer! I’m tough!"
  //     );
  //   } else if (command == "mint" || command == "wen mint") {
  //     message.reply(
  //       `Oh, I love mint leaves; they’re a rich source of Vitamin A, which are critical for healthy eyes and night vision! Something every warrior needs.

  // https://firebasestorage.googleapis.com/v0/b/humankind-637da.appspot.com/o/jelly13.png?alt=media&token=cc7311a3-2cb3-4b30-beea-0abae5689d71`
  //     );
  //   } else if (command == "wen" || command == "wen?") {
  //     message.reply("Perhaps you meant when? It’s ok; it’s a common mistake.");
  //   } else if (command == "when" || command == "when?") {
  //     message.reply("Perhaps you meant wen? It’s ok; it’s a common mistake.");
  //   } else if (command == "nft" || command == "nfts" || command == "nft's") {
  //     message.reply(
  //       "What is that? NFT? Is that an acronym for a weapon or some bio-hack I don’t know about? Perhaps it’s that Nano Field Technology that the Biomisfits have been talking about?"
  //     );
  //   } else if (
  //     command == "pablo" ||
  //     command == "pablo stanley" ||
  //     command == "pabs" ||
  //     command == "stanley"
  //   ) {
  //     const pabsMessage = [
  //       "Don’t know that person… it must be an interesting fella.",
  //       "Who is that? A warrior? An adventurer? Perhaps one of those Oddkinds that keep looting our vertical fields! ",
  //     ];
  //     message.reply(pabsMessage[Math.floor(Math.random() * pabsMessage.length)]);
  //   } else if (
  //     command == "roadmap" ||
  //     command == "map" ||
  //     command == "plans" ||
  //     command == "plan"
  //   ) {
  //     message.reply(
  //       "A good roadmap violently executed now is better than a perfect roadmap executed next week."
  //     );
  //   } else if (command == "life") {
  //     const lifeMessage = [
  //       "Life is what happens while you are dwelling in the past or dreaming of the future. I prefer to focus on the most beautiful thing that exists: the present moment.",
  //       "The secret of life is to turn your mistakes into wisdom.",
  //     ];
  //     message.reply(lifeMessage[Math.floor(Math.random() * lifeMessage.length)]);
  //   } else if (command == "gm" || command == "gm!") {
  //     const gmMessage = [
  //       "GM! Oh, it’s the perfect day for an adventure!",
  //       "GM! Let’s go battle some monsters… with science!",
  //       "GM! I feel like I need some caffeine. Maya uses socks to brew her coffee. It's made with beans from the elves in Bakkal Mountains. It’s kinda bitter… but don’t tell her I said that!",
  //     ];
  //     message.reply(gmMessage[Math.floor(Math.random() * gmMessage.length)]);
  //   } else if (
  //     command == "tacos" ||
  //     command == "tacos!" ||
  //     command == "taco" ||
  //     command == "taco!"
  //   ) {
  //     message.reply(
  //       "Tacos are the most perfectly engineered food. Their design makes them ergonomic and easy to eat. Their shape makes them quickly customizable. They also are made up of the main food groups, making them highly nutritious—great for surviving adventures for days. Oh, and yeah.. they’re also yummy."
  //     );
  //   } else if (
  //     command == "gn" ||
  //     command == "gn!" ||
  //     command == "good nite" ||
  //     command == "good nite!" ||
  //     command == "goodnite" ||
  //     command == "goodnite!" ||
  //     command == "good night" ||
  //     command == "good night!"
  //   ) {
  //     const gnMessage = [
  //       "GN! Would you be down to go on a night adventure? 🌛",
  //       "GN! Perfect. I love a dark night. That’s when the evil spirits rise so we can go fight them… with science! 🔬",
  //       "GN! Oh my Claude! I need to rest. Too many adventures today. 🥱",
  //     ];
  //     message.reply(gnMessage[Math.floor(Math.random() * gnMessage.length)]);
  //   } else if (
  //     command == "joke" ||
  //     command == "say a joke" ||
  //     command == "funny" ||
  //     command == "tell a joke" ||
  //     command == "tell me a joke" ||
  //     command == "joke!"
  //   ) {
  //     const jokeMessage = [
  //       "Why are chemists great at solving problems?\nThey have all the solutions.",
  //       "What did the volcano say to the other volcano?\nI lava you",
  //       "Why shouldn't you trust atoms?\nThey make up everything!",
  //       "What do you call it when the bio-misfits take a photo of themselves?\nA cell-fie",
  //       "What kind of hair does the sea have?\nWavy hair",
  //       "I love the name of the plate Saturn...\nIt has a nice ring to it.",
  //     ];
  //     message.reply(jokeMessage[Math.floor(Math.random() * jokeMessage.length)]);
  //   } else {
  //     message.reply(
  //       "Unfortunately, my vocabulary in this Discord apparatus is limited. I know, you must be dissapointed, since I'm know to be super smart. But, could you try a different word, like `about` or `gm`?\n\nIf you need some hints, try the `/help` command!"
  //     );
  //   }
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName == "help") {
      const helpInfo = new EmbedBuilder()
        .setTitle("Skipper help 🦊")
        .setColor("#000")
        .setDescription("Here's what I could help you with.")
        .addFields(
          {
            name: "Say hello 👋",
            value: "`Skipper hi/hello/hola`",
            inline: true,
          },
          {
            name: "Register into waitlist ✏️",
            value: "`Skipper register/waitlist/wl/list/al`",
            inline: true,
          },
          {
            name: "Know us ⚔️",
            value: "`Skipper Maya/Dallas/Ankka/Skipper`",
            inline: true,
          },
          {
            name: "Know Humankind 🤍",
            value: "`Skipper about/humankind`",
            inline: true,
          },
          {
            name: "Get security tips 🛡",
            value: "`Skipper security tips`",
            inline: true,
          },
          {
            name: "Know the rules 🫶",
            value: "`Skipper rules`",
            inline: true,
          },
          {
            name: "Apply to the HK Fund 💌",
            value: "`Skipper apply/fund`",
            inline: true,
          }
        );

      interaction.reply({ embeds: [helpInfo] });
    } else if (interaction.commandName == "about") {
      const humankindInfo = new EmbedBuilder()
        .setTitle("Humankind 🤍🖤")
        .setDescription(
          `Humankind is a creative team led by Pablo Stanley dedicated to capturing the hearts and minds of kids and adults worldwide with charming creations, a unique vision, and decentralized storytelling.
        

Visit our [website 🤍](https://humankind.art)`
        )
        .setImage(
          "https://assets.bueno.art/images/QmSWV2BstFKNpXez9XbZoiVHJrNC5YSgaAAFNAPNERs9K8?w=600&s=716b8d5892ac5503c3a754d6b52bfbd5"
        );

      interaction.reply({ embeds: [humankindInfo] });
    } else if (interaction.commandName == "rules") {
      const rulesInfo = new EmbedBuilder()
        .setTitle("Rules 🫶")
        .setDescription(
          `1️⃣  Please be kind and respectful to everyone. HumanKind is about building a welcoming community by inspiring one another, building together, and creating a safe space. Having different opinions is healthy, but having hostile arguments will not be permitted.
      
2️⃣  No harassment, suggestive/NSFW content, hate speech, abusive language, bigotry, or swearing. This is a family-friendly community. 
      
3️⃣  No spamming allowed. Make sure any links you share are relevant to the conversation. 
      
In addition to our rules, the community is expected to uphold Discord’s guidelines: https://discord.com/guidelines.`
        )
        .setImage(
          "https://assets.website-files.com/62b94e6b19cb4487d4ca3d43/62bd55b5d9bace30da243dbd_be-kind%201.png"
        );

      interaction.reply({ embeds: [rulesInfo] });
    } else if (interaction.commandName == "prompt") {
      const modal = new ModalBuilder()
        .setCustomId("promptModal")
        .setTitle("Send your ideas ✍️");

      const nameInput = new TextInputBuilder()
        .setCustomId("nameInput")
        .setLabel("Write your name here!")
        .setStyle(TextInputStyle.Short);

      const firstActionRow = new ActionRowBuilder().addComponents(nameInput);

      modal.addComponents(firstActionRow);

      interaction.showModal(modal);
    }
  }
  if (interaction.isModalSubmit()) {
    if (interaction.customId == "promptModal") {
      let user = interaction.fields.getTextInputValue("nameInput");
      let timeStamp = new Date();
      var currentdate =
        timeStamp.getFullYear() +
        "-" +
        (timeStamp.getMonth() + 1) +
        "-" +
        timeStamp.getDate();
      set(ref(database, `prompts/${makeid()}`), {
        timesStamp: currentdate,
        user: user,
      });

      interaction.reply("Your form were submitted");
    }
  }
});

async function main() {
  const commands = [helpCommand, aboutCommand, rulesCommand, promptCommand];

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
