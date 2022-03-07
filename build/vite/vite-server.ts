/*
 * @Author: maggot-code
 * @Date: 2022-02-17 17:35:39
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-28 14:58:34
 * @Description: file content
 */
// ProxyOptions
import type { ServerOptions } from 'vite';

import { searchForWorkspaceRoot } from 'vite';
import { ViteProxy } from './vite-proxy';

export function ViteServer(root: string): ServerOptions {
    return {
        strictPort: false,
        https: false,
        open: false,
        cors: true,
        force: true,
        fs: {
            strict: true,
            allow: [
                searchForWorkspaceRoot(root)
            ],
            deny: ['.env', '.env.*', '*.{pem,crt}']
        },
        proxy: ViteProxy(),
    }
}