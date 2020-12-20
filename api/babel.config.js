module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "targets": {
                "browsers": ["last 2 versions"]
            }
        }]
    ],
    "plugins": [
        "@babel/plugin-transform-async-to-generator",
        "@babel/plugin-transform-runtime"
    ]
}
