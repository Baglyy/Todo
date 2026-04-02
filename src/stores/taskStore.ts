import { ref, watch } from 'vue';

interface Task {
    id: number;
    intitule: string;
    description: string;
    debut: string;
    fin: string;
    etat: string;
    priorite: string;
}

const STORAGE_KEY = 'todo-tasks';

const loadTasks = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return [];
        }
    }
    return [];
};

export type { Task };
export const tasks = ref(loadTasks());

watch(tasks, (newTasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
}, { deep: true });

export const addTask = (task: Omit<Task, 'id'>) => {
    const maxId = tasks.value.length > 0 ? Math.max(...tasks.value.map((t: Task) => t.id)) : 0;
    tasks.value.push({ ...task, id: maxId + 1 });
};

export const updateTask = (id: number, task: Partial<Task>) => {
    const index = tasks.value.findIndex((t: Task) => t.id === id);
    if (index !== -1) {
        tasks.value[index] = { ...tasks.value[index], ...task };
    }
};
