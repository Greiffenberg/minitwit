const { createMessage, readMessages } = require('../DatabaseActions/DBActions')

/** gets all the followers of a super, limit: ?no */
exports.getFollowers = async (req, res) => {
    let { username } = res.params
    let { no } = res.query.no
}

exports.handleFollow = async (req, res) => {
    let { username } = res.params

}