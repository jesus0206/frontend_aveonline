
<script>
import axios from "axios";

export default {
  data() {
    return {
      medicamentos: [],
      lista_medicamentos: [],
      simular: true,
      selected: "Simular",
      promocion_id: null,
      fecha_simulada: null,
      message: "",
      lista_promocion: null,
      promocion_id: null,
    };
  },
  mounted() {
    this.listar();
    this.listar_promociones();
  },
  methods: {
    seleccionar_medicamento: function (e) {
      const index = e.target.value;
      this.medicamentos.push(this.lista_medicamentos[index]);
    },
    accion: function (e) {
      if (e) e.preventDefault();
      console.log(this.selected);
      if (this.selected == "Simular") {
        this.calcular_simulador();
      } else {
        this.crear_factura();
      }
    },
    calcular_simulador: function (e) {
      axios
        .get(
          `http://localhost:8090/factura/simular?id_medicamentos=${this.medicamentos
            .map((data) => data.id)
            .join(",")}&fecha_compra=${this.fecha_simulada}`
        )
        .then((response) => {
          this.message = "El valor simulado es:" + response.data;
        });
    },
    crear_factura: function (e) {
      console.log(this.promocion_id)
      axios({
        method: "post",
        url: "http://localhost:8090/factura",
        data: {
          id_promocion: this.promocion_id,
          pago_total: 1,
          id_medicamentos: this.medicamentos.map((data) => data.id),
        },
      })
        .then((data) => {
          this.message = data.data;
          this.medicamentos = null;
          this.promocion_id = null;
        })
        .catch((data) => {
          console.log(data.error);
        });
    },
    listar: function () {
      axios.get("http://localhost:8090/medicamento").then((response) => {
        this.lista_medicamentos = response.data;
      });
    },
    listar_promociones: function () {
      axios.get("http://localhost:8090/promocion").then((response) => {
        this.lista_promocion = response.data;
      });
    },
  },
};
</script>
<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="mt md:mt-0 md:col-span-6">
          <form>
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-12">
                <div class="grid grid-cols-12 gap-8">
                  <div class="col-span-2 sm:col-span-2">
                    <label
                      for="precio"
                      class="block text-sm font-medium text-gray-700"
                      >Acción</label
                    >
                    <select
                      class="form-select mt-1 block w-full"
                      v-model="selected"
                    >
                      <option>Simular</option>
                      <option>Crear Factura</option>
                    </select>
                  </div>
                  <div class="col-span-2 sm:col-span-2">
                    <label
                      for="precio"
                      class="block text-sm font-medium text-gray-700"
                      >Medicamentos</label
                    >
                    <select
                      class="form-select mt-1 block w-full"
                      @change="seleccionar_medicamento"
                    >
                      <option
                        v-for="(item, index) in lista_medicamentos"
                        :key="item.id"
                        :value="index"
                      >
                        {{ item.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="col-span-2 sm:col-span-2" v-if="selected!='Simular'">
                    <label
                      for="precio"
                      class="block text-sm font-medium text-gray-700"
                      >Promociones</label
                    >
                    <select
                      class="form-select mt-1 block w-full"
                      v-model="promocion_id"
                    >
                      <option
                        v-for="(item) in lista_promocion"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.porcentaje }}%
                      </option>
                    </select>
                  </div>
                  <div
                    class="col-span-2 sm:col-span-3"
                    v-if="selected == 'Simular'"
                  >
                    <label
                      for="nombre"
                      class="block text-sm font-medium text-gray-700"
                      >Fecha</label
                    >
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      v-model="fecha_simulada"
                      autocomplete="given-name"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="mx-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
                {{ message }}
                <button
                  @click="accion"
                  class="
                    inline-flex
                    justify-center
                    py-2
                    px-4
                    border border-transparent
                    shadow-sm
                    text-sm
                    font-medium
                    rounded-md
                    text-white
                    bg-indigo-600
                    hover:bg-indigo-700
                    focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  "
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <hr class="m-3" />

    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-4 lg:-mx-3">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      px-2
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    class="
                      px-3
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in medicamentos" :key="item.email">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ item.id }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ item.nombre }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ item.precio }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>