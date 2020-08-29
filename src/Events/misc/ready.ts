module.exports = async (client: any) => {
    client.appInfo = await client.fetchApplication();
    setInterval(async ()=> {
        client.appInfo = await client.fetchApplication();
    }, 60000);
    require('../../modules/dashboardModule.js')(client);
    client.logger.log(`Logged in as ${client.user.tag}!`, "ready");
}
