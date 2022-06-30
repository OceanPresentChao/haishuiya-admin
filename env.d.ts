/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
interface ImportMetaEnv {
    readonly VITE_APP_MOCKAPI: string
    readonly VITE_APP_REALAPI: string
    readonly VITE_APP_SLOGAN: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}