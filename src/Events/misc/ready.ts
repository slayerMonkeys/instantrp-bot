module.exports = (client: any) => {
    client.logger.log(`Logged in as ${client.user.tag}!`, "ready");
}