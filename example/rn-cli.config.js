const path = require("path");
const blacklist = require('metro-bundler/build/blacklist');

const getRoots = () => [path.resolve(__dirname, "../"), path.resolve(__dirname)];

/**
 * Default configuration for the CLI.
 *
 * If you need to override any of this functions do so by defining the file
 * `rn-cli.config.js` on the root of your project with the functions you need
 * to tweak.
 */
var config = {
    getProjectRoots() {
        return getRoots();
    },

    getAssetRoots() {
        return getRoots();
    },

    getBlacklistRE(platform) {
        let root = this.getProjectRoots();
        return blacklist(platform, []);
    }
};

module.exports = config;
