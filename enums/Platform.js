class Platform {
    static DISCORD = new Platform("DISCORD");
    static GOOGLE = new Platform("GOOGLE");
    static GITHUB = new Platform("GITHUB");

    constructor(name) {
        this.name = name
    }
}

module.exports = { Platform }