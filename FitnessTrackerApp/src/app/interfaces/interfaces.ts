export interface Menu {
    title: string,
    icon: string,
    submenu: Array<string>[],
    redirectTo: string,
    visible: boolean
}