const plugin = require('tailwindcss/plugin')

module.exports = {
    theme: {},
    variants: {},
    future: {
        removeDeprecatedGapUtilities: false,
    },
    plugins: [plugin(({ addUtilities, addComponents, e, prefix, config }) => {

    })],
}
