<template>
    <div>
        <h2>Statistics</h2>
        <p>Here are your stats...</p>
        <p v-if="!isAuthenticated">Please log in to view your stats.</p>
    </div>
</template>

<script>
export default {
    name: 'StatsPage',
    data() {
        return {
            isAuthenticated: false,
        };
    },
    created() {
        const token = localStorage.getItem('token');
        if (token) {
            this.isAuthenticated = true;
        }
    },
};
</script>

<style scoped>
h2 {
    text-align: center;
}
</style>