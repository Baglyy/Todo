<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { tasks } from '../stores/taskStore';

const router = useRouter();

const filterEtat = ref('');
const filterPriorite = ref('');
const filterDebut = ref('');
const filterFin = ref('');

const getEtatClass = (etat) => {
    switch (etat) {
        case 'En cours': return 'bg-warning text-dark';
        case 'Terminé': return 'bg-success';
        case 'À faire': return 'bg-secondary';
        default: return 'bg-info';
    }
};

const getPrioriteClass = (priorite) => {
    switch (priorite) {
        case 'Haute': return 'bg-danger';
        case 'Moyenne': return 'bg-warning text-dark';
        case 'Basse': return 'bg-info text-dark';
        default: return 'bg-secondary';
    }
};

const currentPage = ref(1);
const itemsPerPage = 10;

const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(year, month - 1, day);
};

const filteredTodos = computed(() => {
    return tasks.value.filter(todo => {
        const matchEtat = !filterEtat.value || todo.etat === filterEtat.value;
        const matchPriorite = !filterPriorite.value || todo.priorite === filterPriorite.value;
        const todoDebut = parseDate(todo.debut);
        const todoFin = parseDate(todo.fin);
        const matchDebut = !filterDebut.value || todoDebut >= new Date(filterDebut.value);
        const matchFin = !filterFin.value || todoFin <= new Date(filterFin.value);
        return matchEtat && matchPriorite && matchDebut && matchFin;
    });
});

const paginatedTodos = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTodos.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredTodos.value.length / itemsPerPage));

const resetFilters = () => {
    filterEtat.value = '';
    filterPriorite.value = '';
    filterDebut.value = '';
    filterFin.value = '';
    currentPage.value = 1;
};

const handleDelete = (id) => {
    tasks.value = tasks.value.filter(t => t.id !== id);
};

const handleEdit = (id) => {
    router.push(`/EditTask/${id}`);
};
</script>

<template>
    <div class="filters">
        <div class="filter-group" style="flex: 1">
            <label for="filterEtat">État</label>
            <select id="filterEtat" v-model="filterEtat" class="form-select" @change="currentPage = 1">
                <option value="">Tous</option>
                <option value="À faire">À faire</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
            </select>
        </div>
        <div class="filter-group" style="flex: 1">
            <label for="filterPriorite">Priorité</label>
            <select id="filterPriorite" v-model="filterPriorite" class="form-select" @change="currentPage = 1">
                <option value="">Toutes</option>
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
            </select>
        </div>
        <div class="filter-group" style="flex: 1">
            <label for="filterDebut">Date début (après)</label>
            <input type="date" id="filterDebut" v-model="filterDebut" class="form-control" @change="currentPage = 1">
        </div>
        <div class="filter-group" style="flex: 1">
            <label for="filterFin">Date fin (avant)</label>
            <input type="date" id="filterFin" v-model="filterFin" class="form-control" @change="currentPage = 1">
        </div>
        <button v-if="filterEtat || filterPriorite || filterDebut || filterFin" @click="resetFilters" class="btn btn-link reset-btn">
            Réinitialiser
        </button>
    </div>
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Intitulé</th>
                <th scope="col">Description</th>
                <th scope="col">Date de début</th>
                <th scope="col">Date de fin</th>
                <th scope="col">État</th>
                <th scope="col">Priorité</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="todo in paginatedTodos" :key="index">
                <th scope="row">{{ todo.id }}</th>
                <td>{{ todo.intitule }}</td>
                <td>{{ todo.description }}</td>
                <td>{{ todo.debut }}</td>
                <td>{{ todo.fin }}</td>

                <td>
                    <span class="badge" :class="getEtatClass(todo.etat)">
                        {{ todo.etat }}
                    </span>
                </td>

                <td>
                    <span class="badge" :class="getPrioriteClass(todo.priorite)">
                        {{ todo.priorite }}
                    </span>
                </td>

                <td>
                    <button type="button" class="btn btn-link text-warning p-0 d-inline-flex align-items-center me-2" @click="handleEdit(todo.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                            class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                    </button>
                    <button type="button" class="btn btn-link text-danger p-0 d-inline-flex align-items-center" @click="handleDelete(todo.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                            class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path
                                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="table-footer">
        <RouterLink to="/CreateTask" class="btn btn-link p-0 shadow-none" v-on:click="">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
        </RouterLink>
        <nav aria-label="Page navigation">
            <ul class="pagination mb-0">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="currentPage--">
                        Précédent
                    </a>
                </li>

                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                    <a class="page-link" href="#" @click.prevent="currentPage = page">
                        {{ page }}
                    </a>
                </li>

                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="currentPage++">
                        Suivant
                    </a>
                </li>
            </ul>
        </nav>

    </div>
</template>
