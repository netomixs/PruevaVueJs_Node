<template>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Datos</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                </ul>
                <form class="d-flex" role="search">
                    <input v-model="username"  class="form-control me-2" type="search" placeholder="Usuario" aria-label="Search">
                    <button @click="getToken()" class="btn btn-outline-success" type="button">Login</button>
                </form>
            </div>
        </div>
    </nav>
    <div class="container">
        <table class="table">
        <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido Paterno</th>
                <th scope="col">Apellido Materno</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="cliente in clientes" :key="cliente.id">
                <td> {{ cliente.Nombre }}</td>
                <td> {{ cliente.Apellido_P }}</td>
                <td> {{ cliente.Apellido_M }}</td>

                <td>
                    <button @click="goTover(cliente.id)" type="button" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-eye" viewBox="0 0 16 16">
                            <path
                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                            <path
                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                        </svg>
                    </button>
                    <button @click="goToactualizar(cliente.id)" type="button" class="btn btn-success ms-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                    </button>
                    <button @click="eliminar(cliente.id)" type="button" class="btn btn-danger ms-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                    </button>
                </td>
            </tr>

        </tbody>
    </table>
    <button @click="goToCrear()" type="button" class="btn btn-primary">
        Nuevo cliente
    </button>
    </div>
   
 
</template>
<script lang="js">
import { defineComponent } from 'vue';
import apiClient from '../../Tools/api';
export default defineComponent({
    data() {
        return {
            clientes: [{ id: 1 }],
            username: ""
        };

    },
    created() {
        this.uno = "asdasdasd";
        this.getDatos();
    },
    watch: {

    },
    methods: {
        getToken() {
            const data = { username: "username" }
            console.log("Hoal mudno")
            apiClient.post("createNewUser", data).then(response => {
                localStorage.setItem("token", response.data)
                console.log(response.data);
                
            }).catch(error => {
                console.log(error)
            })
        },
        async getDatos() {
            await apiClient.get('cliente/all').then(response => {
                this.clientes = response.data
            })

        },
        async eliminar(id) {
            const confirmacion = window.confirm('¿Estás seguro de que quieres continuar?');

            if (confirmacion) {
                apiClient.delete('cliente/' + id).then(response => {
                    window.alert("Registro elimindo");
                    this.getDatos();
                })
            }


        },
        async goToactualizar(id) {
            this.$router.push('/form/' + id + '/0');
        },
        async goTover(id) {
            this.$router.push('/form/' + id + '/1');
        },
        async goToCrear() {
            this.$router.push('/form');
        }

    }
});
</script>
<style scoped></style>