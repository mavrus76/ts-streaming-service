/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");

const isProduction = process.env.NODE_ENV === "production";
const stylesHandler = "style-loader";

module.exports = (env) => ({
	entry: "./index.ts",
	mode: isProduction ? "production" : "development",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "",
		assetModuleFilename: "public/[name][ext]",
		clean: true,
	},
	devServer: {
		open: true,
		host: "localhost",
	},
	devtool: false,
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: "public", to: "public" }],
		}),
		new webpack.SourceMapDevToolPlugin({}),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: "ts-loader",
				exclude: ["/node_modules/"],
			},
			{
				test: /\.css$/i,
				use: [
					env.isProduction ? MiniCssExtractPlugin.loader : stylesHandler,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: () => [autoprefixer()],
							},
						},
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "public/[name][ext]",
				},
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
		alias: {
			"~": path.resolve(__dirname, "src"),
			"@api": path.resolve(__dirname, "src/api"),
			"@auth": path.resolve(__dirname, "src/auth"),
			"@components": path.resolve(__dirname, "src/components"),
			"@core": path.resolve(__dirname, "src/core"),
			"@helpers": path.resolve(__dirname, "src/helpers"),
			"@utils": path.resolve(__dirname, "src/utils"),
		},
	},
});
