import { Editor } from "@src/Editor";

export type IReadonly<Obj extends {}> = {
    readonly [Key in keyof Obj]: Key extends {} ? IReadonly<Obj[Key]>: Obj[Key]
};

export namespace Storage {
    export interface IProject {
        title: string,
        shapes: Editor.IAnyShape[]
    }

    const projects: IProject[] = [];

    /**
     * Gets the projects in the storage
     */
    export function getList(): IReadonly<IProject>[] {
        return projects;
    }

    /**
     * Loads the projects from local
     */
    export function load() {
        try {
            const local = localStorage.getItem("projects");
            if(!local) throw `Unable to load from local`;
            const object = <IProject[]> JSON.parse(local);
            
            projects.splice(0, projects.length, ...object);
        }
        catch(e) {
            console.error(e);
        }
    }

    /**
     * Save a project to local
     */

    export function save(project: IProject) {
        const repeated = projects.some(p => p.title.trim().toLocaleLowerCase() === project.title.trim().toLocaleLowerCase());
        if(repeated) return false;
        projects.push(project);

        try {
            localStorage.setItem("projects", JSON.stringify(projects));
        }
        catch(e) {
            console.error(e);
        }
        return true;
    }
}