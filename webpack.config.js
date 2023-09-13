import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'production',

    entry: {
        index: `${__dirname}/src/ts/index.ts`
    },

    output: {
        path: `${__dirname}/app/js/`,
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: `${__dirname}/tsconfig.json`
                    }
                },
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
    }
}