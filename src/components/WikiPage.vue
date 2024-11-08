<template>
    <div class="wiki-container">
        <h2>Wiki del Juego</h2>
        <div class="wiki-content">
            <div class="wiki-section">
                <h3>Introducción</h3>
                <p>Bienvenido a la wiki de nuestro juego. Aquí encontrarás toda la información importante sobre el
                    juego, sus personajes, modos de juego y más.</p>
            </div>
            <div class="wiki-section">
                <h3>Personajes</h3>
                <p>Conoce a los personajes del juego, sus habilidades, historia y más. Cada personaje tiene habilidades
                    únicas que ofrecen un estilo de juego distinto.</p>
            </div>
            <div class="wiki-section">
                <h3>Modos de Juego</h3>
                <p>Explora los diferentes modos de juego disponibles, desde el modo historia hasta el modo competitivo.
                </p>
            </div>
            <div class="wiki-section">
                <h3>Trucos y Consejos</h3>
                <p>¿Te gustaría mejorar tu habilidad? Aquí te dejamos algunos trucos y consejos para dominar el juego.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WikiPage',
};
</script>

<style scoped>
.wiki-container {
    margin-top: 45px;    /* Margen superior */
    margin-left: auto;    /* Centrado horizontal */
    margin-right: auto; 
    padding: 20px;
    max-width: 900px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    color: #2c3e50;
    font-size: 32px;
    margin-bottom: 20px;
}

.wiki-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.wiki-section {
    background-color: #ecf0f1;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.wiki-section h3 {
    color: #2980b9;
    margin-bottom: 10px;
}

.wiki-section p {
    color: #7f8c8d;
    font-size: 16px;
}
</style>