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

const defaultTasks = [
    { id: 1, intitule: 'Refonte Site Web', description: 'Migration vers Vue 3', debut: '01/01/2026', fin: '15/01/2026', etat: 'En cours', priorite: 'Haute' },
    { id: 2, intitule: 'Rapport Ventes', description: 'Analyse du Q4 2025', debut: '05/01/2026', fin: '10/01/2026', etat: 'Terminé', priorite: 'Moyenne' },
    { id: 3, intitule: 'Campagne SEO', description: 'Optimisation mots-clés', debut: '10/01/2026', fin: '30/01/2026', etat: 'À faire', priorite: 'Haute' },
    { id: 4, intitule: 'Maintenance', description: 'Update serveurs SQL', debut: '12/01/2026', fin: '12/01/2026', etat: 'En cours', priorite: 'Haute' },
    { id: 5, intitule: 'Design Logo', description: 'Client "Alpha Tech"', debut: '15/01/2026', fin: '25/01/2026', etat: 'À faire', priorite: 'Basse' },
    { id: 6, intitule: 'Formation', description: 'Atelier TypeScript', debut: '20/01/2026', fin: '21/01/2026', etat: 'À faire', priorite: 'Moyenne' },
    { id: 7, intitule: 'Recrutement', description: 'Entretien Dev Front', debut: '02/02/2026', fin: '02/02/2026', etat: 'En cours', priorite: 'Moyenne' },
    { id: 8, intitule: 'Facturation', description: 'Envoi factures Q1', debut: '01/03/2026', fin: '05/03/2026', etat: 'À faire', priorite: 'Basse' },
    { id: 9, intitule: 'Audit Sécurité', description: 'Test de pénétration', debut: '10/03/2026', fin: '15/03/2026', etat: 'À faire', priorite: 'Haute' },
    { id: 10, intitule: 'Conférence', description: 'Networking Paris', debut: '20/03/2026', fin: '22/03/2026', etat: 'Terminé', priorite: 'Basse' },
    { id: 11, intitule: 'Bug Fix iOS', description: 'Crash au démarrage', debut: '01/04/2026', fin: '03/04/2026', etat: 'En cours', priorite: 'Haute' },
    { id: 12, intitule: 'Newsletter', description: 'Édition spécial été', debut: '05/04/2026', fin: '07/04/2026', etat: 'En cours', priorite: 'Moyenne' },
    { id: 13, intitule: 'Review Code', description: 'PR #452 Architecture', debut: '10/04/2026', fin: '10/04/2026', etat: 'Terminé', priorite: 'Haute' },
    { id: 14, intitule: 'Backup', description: 'Sauvegarde Cloud', debut: '12/04/2026', fin: '12/04/2026', etat: 'Terminé', priorite: 'Basse' },
    { id: 15, intitule: 'Tests Unitaires', description: 'Couverture 80%', debut: '15/04/2026', fin: '20/04/2026', etat: 'À faire', priorite: 'Moyenne' },
    { id: 16, intitule: 'Brainstorming', description: 'Nouveau projet "Mars"', debut: '01/05/2026', fin: '01/05/2026', etat: 'À faire', priorite: 'Basse' },
    { id: 17, intitule: 'Doc API', description: 'Update Swagger UI', debut: '05/05/2026', fin: '10/05/2026', etat: 'En cours', priorite: 'Moyenne' },
    { id: 18, intitule: 'UI Kit', description: 'Composants boutons', debut: '12/05/2026', fin: '15/05/2026', etat: 'À faire', priorite: 'Moyenne' },
    { id: 19, intitule: 'Launch Beta', description: 'Ouverture testeurs', debut: '20/05/2026', fin: '30/05/2026', etat: 'À faire', priorite: 'Haute' },
    { id: 20, intitule: 'Appel Client', description: 'Point mensuel', debut: '31/05/2026', fin: '31/05/2026', etat: 'Terminé', priorite: 'Basse' },
];

const loadTasks = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return defaultTasks;
        }
    }
    return defaultTasks;
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
