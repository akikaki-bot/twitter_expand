export interface TweetResponse {
    code:    number;
    message: string;
    tweet:   Tweet;
}

export interface Tweet {
    url:                string;
    id:                 string;
    text:               string;
    author:             Author;
    replies:            number;
    retweets:           number;
    likes:              number;
    created_at:         string;
    created_timestamp:  number;
    possibly_sensitive: boolean;
    views:              number;
    is_note_tweet:      boolean;
    lang:               string;
    replying_to:        null;
    replying_to_status: null;
    media:              Media | null;
    source:             string;
    twitter_card:       string;
    color:              null;
}

export interface Author {
    id:           string;
    name:         string;
    screen_name:  string;
    avatar_url:   string;
    banner_url:   string;
    description:  string;
    location:     string;
    url:          string;
    followers:    number;
    following:    number;
    joined:       string;
    likes:        number;
    website:      Website;
    tweets:       number;
    avatar_color: null;
}

export interface Website {
    url:         string;
    display_url: string;
}

export interface Media {
    all:    All[];
    photos: All[];
    videos : VideoFormat[];
}

export interface VideoFormat extends All {
    duration : number,
    format : string,
    thumbnail_url : string
}

export interface All {
    type:    string;
    url:     string;
    width:   number;
    height:  number;
    altText: string;
}
