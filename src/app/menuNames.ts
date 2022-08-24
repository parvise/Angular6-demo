export class MenuNames {
    id: number;
    path: string;
    title: string;
    permission: boolean;
    childMenus:MenuNames[];
    

    constructor(id: number,
        path: string,
        title: string,
        permission: boolean,childMenus:MenuNames[]) {
        this.id = id;
        this.path = path;
        this.title = title;
        this.permission = permission;
        this.childMenus=childMenus;

    }
}
