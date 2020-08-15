module.exports = (client: any, event) => {
    const roleReactionEvents = {
        MESSAGE_REACTION_ADD: 'messageReactionAdd',
        MESSAGE_REACTION_REMOVE: 'messageReactionRemove'
    }
    if (roleReactionEvents.hasOwnProperty(event.t)) {
        switch (event.d.channel_id) {
            case '716019522896658532':
                client.emit('reactionRoleVerified', event);
                break
            case '732233682357846087':
                client.emit('reactionRoleJobs', event);
                break
            case '739159609302056990':
                client.emit('reactionRoleLinkedIn', event);
                break
            case '716019523668541446':
                client.emit('tickets', event);
                break
        }
    }
}
