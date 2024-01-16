import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, Message } from "discord.js";
import { TweetResponse } from "../types/tweet";


export class TwitterExpand {

    private message : Message
    private client : Client

    constructor( message : Message , client : Client ){
        this.client = client;
        this.message = message

        this.run();
    }

    private async run() {
        this.message.content.split('\n').map( v => this.createEmbed( v ))
    }               

    private async createEmbed( content : string ){
        const TwitterReg = new RegExp(/^https?:\/\/(x|twitter)\.com/)
        const IsTwitterLink = TwitterReg.test( content )

        console.log( IsTwitterLink , content )

        if(!IsTwitterLink) return;

        const SnowFlakeAndUserGet = content.split('/')
        console.log(SnowFlakeAndUserGet)

        const [ _a , _b , _c , userName , _d , Snowflake ] = SnowFlakeAndUserGet;

        if(!userName || !Snowflake) return;

        const data = await this.fetchMessage( userName , Snowflake );
        if(
            data === null
        ) return;

        const embed = new EmbedBuilder().setAuthor({
                                                name : `${data.author.name} (@${data.author.screen_name})`,
                                                iconURL : data.author.avatar_url
                                        })
                                        .setDescription(`${data.text ?? " "}\n\n:heart: ${data.likes} / :repeat: ${data.retweets} / :thought_balloon: ${data.replies}`)
                                        .setTimestamp( new Date( data.created_at ) )
                                        
                                    
        if( typeof data.media === "object" && data.media !== null && typeof data.media.photos === "object"){
            data.media.photos.map( photo => embed.setImage( photo.url ) );
        }

        if( typeof data.media === "object" && data.media !== null && typeof data.media.videos === "object"){
            data.media.videos.map( video => embed.setImage(video.thumbnail_url));
        }

        const btn = new ActionRowBuilder<ButtonBuilder>().setComponents(
            new ButtonBuilder().setStyle( ButtonStyle.Danger ).setEmoji({ name : "🗑️" }).setCustomId('delete.twt')
        )

        this.message.reply({
            embeds : [ embed ],
            components : [ btn ]
        }).catch(() => {})
    }

    private async fetchMessage( user : string , snowflake : string ){
        const response = await fetch(`https://api.fxtwitter.com/${user}/status/${snowflake}`)
        if(!response.ok) return null;
        const data = await response.json() as TweetResponse;
        if(data.code !== 200) return null;
        return data.tweet;
    }
}