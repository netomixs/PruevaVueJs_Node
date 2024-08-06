<template>

    <form action="" class="container">
        <div class="card ms-3 ps-3 me-3  pe-3 shadow-lg">
            <h3 class="mt-3">Datos generales</h3>
            <div class="row mt-2 ">
                <div class="col ">

                    <label for="nombreInput" class="form-label">Nombre</label>

                    <input v-model="inputNombre" type="text" class="form-control " id="nombreInput" value=" " required
                        :class="{ 'is-invalid': isNombreValido }">
                    <div class="invalid-feedback">
                        Completa este campo
                    </div>

                </div>
                <div class="col">

                    <label for="ApellidoPInput" class="form-label">Apellido Paterno</label>
                    <input v-model="inputApellidoP" type="text" class="form-control" id="ApellidoPInput" value=" "
                        required :class="{ 'is-invalid': isApellidoPValido }">
                    <div class="invalid-feedback">
                        Completa este campo
                    </div>

                </div>
                <div class="col">
                    <label for="ApellidoMInput" class="form-label">Apellido Mateno</label>
                    <input v-model="inputApellidoM" type="text" class="form-control" id="ApellidoMInput" value=" " required>
                    <div class="invalid-feedback">
                        Completa este campo
                    </div>
                </div>
            </div>
            <div class="row mt-2 mb-4">
                <div class="col-md-4">

                    <label for="correoInput" class="form-label">Correo electronico</label>
                    <div class="input-group has-validation">
                    </div>
                    <input v-model="inputCorreo" type="email" class="form-control" id="correoInput" value=" " required
                        :class="{ 'is-invalid': isCorreoValido }">
                    <div class="invalid-feedback">
                        Completa este campo
                    </div>
                </div>
            </div>
        </div>

        <div class="card ms-3 ps-3 me-3 mt-3 shadow-lg pe-3 ">
            <h3 class="mt-3">Datos de contacto</h3>
            <div class="row mt-2  mb-3   ">

                <div class="col-md-4 ">

                    <label for="calleInput" class="form-label">Calle</label>
                    <input v-model="inputCalle" type="text" class="form-control" id="calleInput" value=" " required
                        :class="{ 'is-invalid': isCalleValido }">
                    <div class="invalid-feedback">
                        Completa este campo
                    </div>

                </div>
                <div class="col-md-2">

                    <label for="calleNoPInput" class="form-label">Numero de calle </label>
                    <input v-model="inputNoCalle" type="text" class="form-control" id="calleNoPInput" value=" " 
                        :class="{ 'is-invalid': isNoCallevalido }">
                    <div class="invalid-feedback">
                        Completa este campo
                    </div>

                </div>
                <div class="col-md-2">
                    <label for="CpInput" class="form-label">Codigo postal</label>
                    <input v-model="inputCp" type="text" class="form-control" id="CpInput" value=" " required
                        :class="{ 'is-invalid': isCpValido }">
                    <div class="invalid-feedback">
                        Completa este campo
                    </div>
                </div>
            </div>
            <div class="row mt-2 mb-4">
                <div class="col-md-4">

                    <label for="ciudadInput" class="form-label">Ciudad</label>
                    <div class="input-group has-validation">
                    </div>
                    <input v-model="inputCiudad" type="text" class="form-control" id="ciudadInput" value=" " required
                        :class="{ 'is-invalid': isCiudadValido }">
                    <div class="invalid-feedback">
                        Completa este campo
                    </div>
                </div>
                <div class="col-md-4">

                    <label for="EstadoInput" class="form-label">Estado</label>
                    <div class="input-group has-validation">
                    </div>
                    <input v-model="inputEstado" type="text" class="form-control" id="EstadoInput" value=" " required
                        :class="{ 'is-invalid': isEstadoValio }">
                    <div class="invalid-feedback">
                        Completa este campo
                    </div>
                </div>
            </div>
        </div>
        <div class="  ms-3 ps-3 me-3 mt-3   pe-3 d-flex justify-content-center ">
            <button :disabled="isNuevo" @click="enviar()" type="button" class="btn btn-primary ">
                Enviar
            </button>
            <button  :disabled="isSoloVista " @click="actualizar()"  type="button" class="btn btn-success ms-3">
                Actualizar
            </button>
            <button  :disabled="isSoloVista"  @click="eliminar()" type="button" class="btn btn-danger ms-3">
                Eliminar
            </button>
        </div>
    </form>
</template>
<script lang="js">
import { defineComponent } from 'vue';
import apiClient from '../../Tools/api';
import cliente from '../models/cliente.model'
import Cliente from '../models/cliente.model';
export default defineComponent({
    data() {
        return {
            cliente: Cliente,
            inputNombre: "",
            inputApellidoM: "",
            inputApellidoP: "",
            inputCorreo: "",
            inputCalle: "",
            inputNoCalle: "",
            inputCp: "",
            inputCiudad: "",
            inputEstado: "",
        }
    }, created() {
        this.seleccionarModo()

    }, methods: {
        enviar() {
            if (!this.isNombreValido &&
                !this.isApellidoPValido &&
                !this.isCorreoValido &&
                !this.isCalleValido &&
                !this.isNoCallevalido &&
                !this.isCpValido &&
                !this.isCiudadValido &&
                !this.isEstadoValio
            ) {
                const data = {
                    "nombre": this.inputNombre,
                    "apellido_P": this.inputApellidoP,
                    "apellido_M": this.inputApellidoM,
                    "correo": this.inputCorreo,
                    "no_Calle": this.inputNoCalle,
                    "calle": this.inputCalle,
                    "cp": this.inputCp,
                    "estado": this.inputCiudad,
                    "ciudad": this.inputEstado
                }
                apiClient.post('cliente', data).then(response => {
                    console.log(response)
                    window.alert("Registrado")
                }
                ).catch(error => {
                    console.log(error)
                })
            }
        },
        actualizar() {
            if (!this.isNombreValido &&
                !this.isApellidoPValido &&
                !this.isCorreoValido &&
                !this.isCalleValido &&
                !this.isNoCallevalido &&
                !this.isCpValido &&
                !this.isCiudadValido &&
                !this.isEstadoValio
            ) {
                const data = {
                    "idCliente": this.usuarioId,
                    "nombre": this.inputNombre,
                    "apellido_P": this.inputApellidoP,
                    "apellido_M": this.inputApellidoM,
                    "correo": this.inputCorreo,
                    "no_Calle": this.inputNoCalle,
                    "calle": this.inputCalle,
                    "cp": this.inputCp,
                    "estado": this.inputCiudad,
                    "ciudad": this.inputEstado
                }
                apiClient.put('cliente', data).then(response => {
                    console.log(response)
                    window.alert("Actualizado")
                }
                ).catch(error => {
                    console.log(error)
                })
            }
        }, eliminar() {
            const confirmacion = window.confirm('¿Estás seguro de que quieres continuar?');

            if (confirmacion) {
                apiClient.delete('cliente/' + this.usuarioId()).then(response => {
                    console.log(response)
                    this.$router.push('/');
                }
                ).catch(error => {
                    console.log(error)
                })
            }

        },
        cargarDatos(datos) {

            this.inputNombre = datos.Nombre;
            this.inputApellidoM = datos.Apellido_P;
            this.inputApellidoP = datos.Apellido_M;
            this.inputCorreo = datos.usuario.Correo;
            this.inputCalle = datos.direccion.Calle;
            this.inputNoCalle = datos.direccion.Numero;
            this.inputCp = datos.direccion.CP;
            this.inputCiudad = datos.direccion.Ciudad;
            this.inputEstado = datos.direccion.Estado;

        },
        seleccionarModo() {
            console.log(this.usuarioId);
            if (!this.isNuevoRegistro) {
                if (this.usuarioId) {
                    this.getDatos(this.usuarioId)

                }
            }
        }, getDatos(id) {
            apiClient.get('cliente/id/' + id).then(response => {
                console.log(response);

                this.cargarDatos(response.data)
            }).catch(error => {
                console.log(error);

            })
        }

    },

    computed: {
        isNuevo() {
            if (this.$route.params.id==null ) {
                return false
            } else {
                return true;
            }
        },
        isSoloVista() {
            if (this.$route.params.view) {
                if (this.$route.params.view == 1) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        usuarioId() {
            return this.$route.params.id;
        },
        isNombreValido() {
            if (this.inputNombre.length > 3) {
                return false
            } else {
                return true;
            }
        },
        isApellidoPValido() {
            if (this.inputApellidoP.length > 3) {
                return false
            } else {
                return true;
            }
        },
        isCorreoValido() {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex.test(this.inputCorreo)) {

                return false
            } else {
                return true;
            }
        },
 
        isCalleValido() {
            if (this.inputCalle.length > 3) {
                return false
            } else {
                return true;
            }
        },
        isNoCallevalido() {
            if (this.inputNoCalle.length > 2 && this.inputNoCalle.length <= 5 ) {
                return false
            } else {
                return true;
            }
        },
        isCpValido() {
            if (this.inputCp.length == 5) {
                return false
            } else {
                return true;
            }
        },
        isCiudadValido() {
            if (this.inputCiudad.length > 3 && this.inputCiudad.length < 30) {
                return false
            } else {
                return true;
            }
        },
        isEstadoValio() {
            if (this.inputEstado.length > 3 && this.inputEstado.length < 30) {
                return false
            } else {
                return true;
            }
        }

    }

})
</script>