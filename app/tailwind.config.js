module.exports = {
    plugins: [require('daisyui')],
    daisyui: {
        themes: [{
            scrcpyplus: {
            ...require("daisyui/src/theming/themes")["dark"],
              "primary": "#8867c0",
            },
        }],
      },
};  