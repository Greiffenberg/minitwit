const { followUser, unfollowUser, readFollowers } = require('../DatabaseActions/DBActions')

/** gets all the followers of a super, limit: ?no */
exports.getFollowers = async (req, res) => {

    // Deconstruct url parameter and queries
    let { username } = req.params
    let { no } = req.query.no

    // update latest - latest is a global var
    latest = !!req.query.latest ? req.query.latest : latest

    try{
        // Retrieve followers
        let follows = await readFollowers(username)

        // Limit the output to the max no
        if(!!no && no > 0) follows = follows.splice(0, no)

        return res.status(200).json({follows: follows, latest})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Failed to find users"})
    }
}

/** A user follows or unfollows another user */
exports.handleFollow = async (req, res) => {
    let { username } = req.params

    // Deconstruct body data
    let { follow, unfollow } = req.body

    // Username of the user to be followed or unfollowed
    let targetUser = ""

    // update latest - latest is a global var
    latest = !!req.query.latest ? req.query.latest : latest

    try{
        // If follow is in the data, follow that user
        if(!!follow && follow.length > 0){
            targetUser = follow
            await followUser(username, targetUser)
            return res.status(200).json({latest: latest})
        }

        // If unfollow is in the data, unfollow that user
        if(!!unfollow || unfollow.length > 0){
            targetUser = unfollow
            await unfollowUser(username, targetUser)
            return res.status(200).json({latest: latest})
        }

        // If it got here, hasnt returned a valid request yet
        return res.status(400).json({message: "Must specify either follow or unfollow data."})
    } catch(error){
        console.log(error)
        return res.status(500).json({message: "failed to follow/unfollow user."})
    }
}