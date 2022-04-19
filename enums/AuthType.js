class AuthType {
    static DISCORD = new AuthType("DISCORD");
    static GOOGLE = new AuthType("GOOGLE");
    static GITHUB = new AuthType("GITHUB");
    constructor(name) {
        this.name = name
    }
}

module.exports = { AuthType }