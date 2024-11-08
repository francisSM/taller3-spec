<template>
    <div>
        <h2>Statistics</h2>
        <p v-if="!isAuthenticated">Please log in to view your stats.</p>
        <div v-else>
            <p>Your game statistics:</p>
            <div v-if="stats.length === 0">
                <p>You don't have any game stats yet.</p>
            </div>
            <div v-else>
                <ul>
                    <li v-for="(stat, index) in stats" :key="index">
                        <p><strong>Game Result:</strong> {{ stat.result }}</p>
                        <p><strong>Played On:</strong> {{ stat.created_at }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StatsPage',
    data() {
        return {
            isAuthenticated: false,
            stats: [],
        };
    },
    created() {
        const token = localStorage.getItem('token');
        if (token) {
            this.isAuthenticated = true;
            this.fetchStats();
        }
    },
    methods: {
        async fetchStats() {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const userId = decodedToken.id;
                    const response = await fetch(`http://localhost:5000/api/stats/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        this.stats = data;
                    } else {
                        console.error('Error al obtener estadísticas');
                    }
                }
            } catch (error) {
                console.error('Error en la obtención de estadísticas:', error);
            }
        },
    },
};
</script>

<style scoped>
h2 {
    text-align: center;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 1rem;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 5px;
}
</style>