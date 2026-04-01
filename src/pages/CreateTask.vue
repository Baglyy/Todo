<script setup lang="ts">
import { useRouter } from 'vue-router';
import TaskForm from '../components/TaskForm.vue';
import { addTask } from '../stores/taskStore';

const router = useRouter();

const handleSubmit = (formData: any) => {
    addTask(formData);
    router.push('/');
};
</script>

<template>
    <h1>Ajouter une tâche</h1>
    <TaskForm class="mb-3" @submit="handleSubmit" />
    <button type="submit" form="taskForm" class="submitBtn btn btn-primary">Ajouter</button>
</template>
