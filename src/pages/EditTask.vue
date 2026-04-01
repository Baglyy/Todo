<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import TaskForm from '../components/TaskForm.vue';
import { tasks, updateTask, type Task } from '../stores/taskStore';

const router = useRouter();
const route = useRoute();

const taskId = parseInt(route.params.id as string);
const task = tasks.value.find((t: Task) => t.id === taskId);

const handleSubmit = (formData: any) => {
    const debutParts = formData.debut.split('-');
    const finParts = formData.fin.split('-');
    updateTask(taskId, {
        ...formData,
        debut: `${debutParts[2]}/${debutParts[1]}/${debutParts[0]}`,
        fin: `${finParts[2]}/${finParts[1]}/${finParts[0]}`
    });
    router.push('/');
};
</script>

<template>
    <h1>Modifier la tâche</h1>
    <TaskForm v-if="task" class="mb-3" :initial-task="task" @submit="handleSubmit" />
    <button type="submit" form="taskForm" class="submitBtn btn btn-primary">Enregistrer</button>
</template>
