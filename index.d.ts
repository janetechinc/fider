declare interface Window {
  ga?: (cmd: string, evt: string, args?: any) => void
  set: (key: string, value: any) => void
}

declare let __webpack_nonce__: string
declare let __webpack_public_path__: string

declare module "*.svg" {
  const content: React.FC<any>
  export default content
}
