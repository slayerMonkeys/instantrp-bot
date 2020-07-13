export interface IHelp {
    name: string;
    aliases: string[];
    category: string;
    permLevel: string
    cooldown?: number;
    usage?: string;
    ownercommand: boolean;
}
