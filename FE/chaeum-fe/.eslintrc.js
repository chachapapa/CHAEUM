module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest" : true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "prettier",
        "jest",
        "jest-dom",
        "@typescript-eslint",
    ],
    "rules": {
        "prettier/prettier": "error"
    },
    "settings": {
        "import/resolver": {
          "typescript": {}
        }
    }
}
