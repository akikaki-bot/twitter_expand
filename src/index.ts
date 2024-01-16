

import {
    Client,
    GatewayIntentBits
} from "discord.js"
import { Token } from "./constants/token"
import { TwitterExpand } from "./components/expand"

export const client = new Client({
    intents : ["GuildMessages" , "MessageContent", "Guilds"]
})

client.on('ready' , async ( ) => {
    console.log(`[Log] Twitter Expand Ready! `)

    client.user.setActivity({
        name : "Tweet expand! :)"
    })
})


client.on('messageCreate', ( message ) => {
    new TwitterExpand( message , client )
})

client.on('interactionCreate', ( interaction ) => {
    if( interaction.isButton() && interaction.customId === "delete.twt"){
        if(
            interaction.message.mentions.users.has( interaction.user.id )
        ) interaction.message.deletable && interaction.message.delete();
        else interaction.reply({ content : "作成者以外はメッセージを削除できません。" , ephemeral : true })
    }
})

client.login( Token );

