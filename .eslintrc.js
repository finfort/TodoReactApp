module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "react": {
            "createClass": "createClass", // Regex for Component Factory to use, default to "createClass" 
            "pragma": "React",  // Pragma to use, default to "React" 
            "version": "15.0" // React version, default to the latest React stable release 
        }
    },
    "rules": {
        "react/jsx-uses-vars": 1,
        "react/react-in-jsx-scope": 1,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "no-console": 0,
        // "indent": [
        //     "error",
        //     "tab"
        // ],
        // "linebreak-style": [
        //     "error",
        //     "windows"
        // ],
        "semi": [
            "error",
            "always"
        ]
    }
};