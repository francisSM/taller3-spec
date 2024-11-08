<template>
    <div>
        <h2>Estadísticas</h2>
        <p v-if="!isAuthenticated">Por favor, inicia sesión para ver tus estadísticas.</p>
        <div v-else>
            <p>Tus estadísticas de juego:</p>
            <div v-if="stats.length === 0">
                <p>Aún no tienes estadísticas de juego.</p>
            </div>
            <div v-else>
                <ul @scroll="loadMore" ref="statsList">
                    <li v-for="(stat, index) in stats" :key="index">
                        <p><strong>Resultado del Juego:</strong> {{ stat.result }}</p>
                        <p><strong>Jugado el:</strong> {{ stat.created_at }}</p>
                    </li>
                </ul>
                <p v-if="loading">Cargando más estadísticas...</p>
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
            loading: false,
            page: 1,
            pageSize: 5,
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
                    const response = await fetch(`http://localhost:5000/api/stats/${userId}?page=${this.page}&limit=${this.pageSize}`);
                    if (response.ok) {
                        const data = await response.json();
                        this.stats = this.page === 1 ? data : [...this.stats, ...data]; 
                    } else {
                        console.error('Error al obtener estadísticas');
                    }
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