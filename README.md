- setup .env
- run:
    - composer create-project laravel/laravel:^10.0 laravel-vuejs
    - composer require laravel/jetstream
    - php artisan jetstream:install inertia --teams
    - npm install
    - npm run build
    - php artisan migrate
- update files:
    - resources/js/Components/ApplicationLogo.vue
    - resources/js/Components/ApplicationMark.vue
    - resources/js/Components/AuthenticationCardLogo.vue
- run:
    - npm run build
- add:
    - git-hooks
        - add file: git-hooks/pre-commit
            - content:
                ```
                #!/bin/sh

                # Check for Laravel Pint
                which ./vendor/bin/pint &> /dev/null
                if [[ "$?" == 1 ]]; then
                echo "\t\033[41mPlease install Laravel Pint\033[0m"
                exit 1
                fi

                ./vendor/bin/pint --preset laravel -v --test

                if [[ "$?" == 1 ]]; then
                exit 1
                fi

                # Check for ESLint
                which ./node_modules/.bin/eslint &> /dev/null
                if [[ "$?" == 1 ]]; then
                echo "\t\033[41mPlease install ESlint\033[0m"
                exit 1
                fi

                ./node_modules/.bin/eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts --ignore-path .gitignore

                if [[ "$?" == 1 ]]; then
                exit 1
                fi

                exit $?
                ```
        - add file: .eslintrc.cjs
            - content:
                ```
                /* eslint-env node */
                require("@rushstack/eslint-patch/modern-module-resolution");

                module.exports = {
                    extends: [
                        "eslint:recommended",
                        "plugin:vue/vue3-recommended",
                        "@vue/eslint-config-typescript",
                        "@vue/eslint-config-prettier/skip-formatting",
                    ],
                    rules: {
                        "vue/multi-word-component-names": 0,
                    },
                };
                ```
        - run:
            - npm install @rushstack/eslint-patch @vue/eslint-config-prettier @vue/eslint-config-typescript prettier
        - update files:
            - package.json:
                - under script:
                    ```
                    "dev": "vite",
                    "build": "vite build",
                    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts --fix --ignore-path .gitignore",
                    "format": "prettier . --write"
                    ```
            - postcss.config.js
                - rename to postcss.config.mjs
        - run:
            - cp git-hooks/pre-commit .git/hooks/pre-commit
            - chmod +x .git/hooks/pre-commit (MAC)
            - icacls .git\hooks\pre-commit /grant Everyone:F (Windows)
        - run then fix:
            - vendor/bin/pint --preset laravel -v
            - npm run lint
    - temporary disable fortify and jetstream features
    - mixins (not implemented yet)
    - localization (not implemented yet)
    - enums (not implemented yet)
    - base service for crud (not implemented yet)
