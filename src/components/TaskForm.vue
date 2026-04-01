<template>
    <form id="taskForm" class="form" @submit.prevent="submit">
        <div class="form-group">
            <label for="taskName">Intitulé</label>
            <input type="text" class="form-control" id="taskName" name="intitule" required
                :value="initialTask?.intitule" :placeholder="initialTask ? '' : 'Nom de la tâche'">
        </div>
        <div class="form-group">
            <label for="taskDesc">Description</label>
            <textarea class="form-control" id="taskDesc" name="description"
                :placeholder="initialTask ? '' : 'Description'" rows="4" :value="initialTask?.description"></textarea>
        </div>
        <div class="form-group">
            <label for="taskStart">Date de début</label>
            <input type="date" class="form-control" id="taskStart" name="debut" required
                :value="initialTask?.debut?.split('/').reverse().join('-')">
        </div>
        <div class="form-group">
            <label for="taskEnd">Date de fin</label>
            <input type="date" class="form-control" id="taskEnd" name="fin" required
                :value="initialTask?.fin?.split('/').reverse().join('-')">
        </div>
        <div class="form-group">
            <label>État</label>
            <div class="radio-group">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="etat" value="À faire"
                        :checked="initialTask?.etat === 'À faire' || !initialTask">
                    <label class="form-check-label">À faire</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="etat" value="En cours"
                        :checked="initialTask?.etat === 'En cours'">
                    <label class="form-check-label">En cours</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="etat" value="Terminé"
                        :checked="initialTask?.etat === 'Terminé'">
                    <label class="form-check-label">Terminé</label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>Priorité</label>
            <div class="radio-group">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="priorite" value="Haute"
                        :checked="initialTask?.priorite === 'Haute' || !initialTask">
                    <label class="form-check-label">Haute</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="priorite" value="Moyenne"
                        :checked="initialTask?.priorite === 'Moyenne'">
                    <label class="form-check-label">Moyenne</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="priorite" value="Basse"
                        :checked="initialTask?.priorite === 'Basse'">
                    <label class="form-check-label">Basse</label>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import type { Task } from '../stores/taskStore';

defineProps<{ initialTask?: Task }>();
const emit = defineEmits(['submit']);

const submit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    emit('submit', {
        intitule: formData.get('intitule'),
        description: formData.get('description'),
        debut: formData.get('debut'),
        fin: formData.get('fin'),
        etat: formData.get('etat'),
        priorite: formData.get('priorite')
    });
};
</script>
