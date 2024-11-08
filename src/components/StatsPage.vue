<template>
    <div>
        <h2>Estadísticas</h2>
        <div v-if="stats.length === 0">
            <p>No hay estadísticas disponibles.</p>
        </div>
        <div v-else>
            <ul @scroll="loadMore" ref="statsList">
                <li v-for="(stat, index) in stats" :key="stat.id">
                    <p><strong>Usuario:</strong> {{ stat.username }} (ID: {{ stat.id }})</p>
                    <p><strong>Victorias:</strong> {{ stat.wins }}</p>
                    <p><strong>Derrotas:</strong> {{ stat.losses }}</p>
                </li>
            </ul>
            <p v-if="loading">Cargando más estadísticas...</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StatsPage',
    data() {
        return {
            stats: [],
            loading: false,
            page: 1,
            pageSize: 5,
        };
    },
    created() {
        this.fetchStats();
    },
    methods: {
        async fetchStats() {
            try {
                this.loading = true;
                const response = await fetch(`http://localhost:5000/api/stats?page=${this.page}&limit=${this.pageSize}`);
                if (response.ok) {
                    const data = await response.json();
                    this.stats = this.page === 1 ? data : [...this.stats, ...data];
                } else {
                    console.error('Error al obtener estadísticas');
                }
            } catch (error) {
                console.error('Error en la obtención de estadísticas:', error);
            } finally {
                this.loading = false;
            }
        },
        loadMore(event) {
            const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
            if (bottom && !this.loading) {
                this.loading = true;
                this.page += 1;
                this.fetchStats();
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
    max-height: 500px;
    overflow-y: auto;
}

li {
    margin-bottom: 1rem;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 5px;
}

p {
    text-align: center;
}
</style>
