const path = require("path");

const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");

const stylesHandler = "style-loader";

const pages = [
    "index",
    "invite-your-team",
    "success-your-team-me",
	"my-company"
    // Other html
];


const config = {
    entry: pages.reduce((config, page) => {
        config[page] = `./src/${page}.js`;
        return config;
    }, {}),
    output: {
        // filename: '[name].js',
        path: path.resolve(__dirname, "dist"),
        // assetModuleFilename: '[name][ext]',
    },

    // optimization: {
    //     splitChunks: {
    //         chunks: "all",
    //     },
    // },

    devServer: {
        open: true,
        host: "localhost",
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "src/pages/invite-your-team.html",
            filename: "invite-your-team.html"
        }),
        new HtmlWebpackPlugin({
            template: "src/pages/success-your-team-me.html",
            filename: "success-your-team-me.html"
        }),
        new HtmlWebpackPlugin({
            template: "src/pages/my-company.html",
            filename: "my-company.html"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, "css-loader", "sass-loader"],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader"],
            },
            {
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
            },
            {
                test: /\.(png|svg|gif|woff|woff2|eot|jpg|ttf)$/i,
                type: "asset/resource",
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    } else {
        config.mode = "development";
    }

    return config;
};
