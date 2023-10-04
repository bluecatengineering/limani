# Coverity - Static Application Security Testing

## Coverity scan & Report

-   Create a configuration for a native compiler

          // In this project, we only scan JavaScript and disable analysis Typescript and VueJs
          cov-configure --config ./coverity/config.xml --javascript --no-typescript --no-vue

-   Capture and emit source code:

          cov-build --config ./coverity/config.xml --dir ./coverity/scan/ --fs-capture-search ./src --no-command

-   Checkers on captured code in an intermediate directory and stores
    analysis results

            cov-analyze --dir ./coverity/scan/ --strip-path $PWD --all

-   Reads analysis output, source data stored and writes them to a Coverity Connect database in a stream that you specify.

          cov-commit-defects
          --dir ./coverity/scan/
          --url <COVERITY_SERVER>
          --stream <stream-name>
          --version $CI_COMMIT_SHORT_SHA
          --auth-key-file <COVERITY_AUTH_KEY_FILE>
