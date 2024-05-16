// Code goes here!

// Object Strucutre for Validate input
interface Validation {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

// Validation
function validate(validateInput: Validation) {
    let isValid = true;
    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }
    if (validateInput.minLength != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length >= validateInput.minLength
    }
    if (validateInput.maxLength != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length <= validateInput.maxLength
    }
    if (validateInput.min != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value >= validateInput.min
    }
    if (validateInput.max != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value <= validateInput.max
    }
    return isValid;
}

// Autobind Decorator
function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const updatedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return updatedDescriptor;
}

// Project Type
enum ProjectStatus { Active, finished }

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus) { }
}

// Project state Management
type Listener<T> = (iitems: T[]) => void;

class State<T> {
    //List of functions that changes when something changes
    protected listeners: Listener<T>[] = [];

    addListener(ListenerFn: Listener<T>) {
        this.listeners.push(ListenerFn);
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) return this.instance;
        this.instance = new ProjectState();
        return this.instance;
    }




    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        for (const listenerFn of this.listeners)
            listenerFn(this.projects.slice());
    }
}

const projectstate = ProjectState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        tempplateId: string,
        hostElementid: string,
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.hostElement = document.getElementById(hostElementid)! as T;
        this.templateElement = document.getElementById(tempplateId)! as HTMLTemplateElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) this.element.id = newElementId;
        this.attach(insertAtStart);
    }

    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

// ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }

    configure(): void {
        projectstate.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.finished;
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';

    }
}


// Project Input Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    title: HTMLInputElement;
    description: HTMLInputElement;
    people: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        // // this.hostElement = <HTMLDivElement>document.getElementById('app')!;
        // this.hostElement = document.getElementById('app')! as HTMLDivElement;
        // this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;

        // const importedNode = document.importNode(this.templateElement.content, true);
        // // importNode is to make copy of any content, mainly HTML element and attcj it later somewhere else.
        // // flag true, is to make deep copy 
        // this.element = importedNode.firstElementChild as HTMLFormElement;
        // this.element.id = 'user-input';

        this.title = this.element.querySelector('#title') as HTMLInputElement;
        this.description = this.element.querySelector('#description') as HTMLInputElement;
        this.people = this.element.querySelector('#people') as HTMLInputElement;

        // Add Event Handler when form gets submitted...
        this.configure();

        // Insert Form tag into the DOM
        // this.attach();
    }

    private clearInputs() {
        this.title.value = '';
        this.description.value = '';
        this.people.value = '';
    }

    @Autobind
    private submitHandler(event: Event) {
        event?.preventDefault();
        const userinput = this.gatherUserInput();
        if (Array.isArray(userinput)) {
            const [title, desc, people] = userinput;
            projectstate.addProject(title, desc, people);
            console.log(title, desc, people);
            this.clearInputs();
        }
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(): void {

    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.title.value;
        const enteredDescription = this.description.value;
        const enteredPeople = +this.people.value;

        const titleValidatable: Validation = {
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable: Validation = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validation = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid Input, please try again!')
            return;
        }
        else {
            return [enteredTitle, enteredDescription, enteredPeople];
        }
    }
}

const prjInput = new ProjectInput();
const prjLstActive = new ProjectList('active');
const prjLstFinished = new ProjectList('finished');