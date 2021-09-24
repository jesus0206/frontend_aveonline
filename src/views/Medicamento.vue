<script>
import axios from "axios";

export default {
  data() {
    return {
      data: null,
      nombre: null,
      precio: null,
      ubicacion: null,
    };
  },
  mounted() {
    this.listar();

  },
  methods: {
    create_medicamento: function (e) {
      if (e) e.preventDefault();

      axios({
        method: "post",
        url: "http://localhost:8090/medicamento",
        data: {
          nombre: this.nombre,
          ubicacion: this.ubicacion,
          precio: parseFloat(this.precio, 10),
        },
      })
        .then((data) => {
          console.log(data);
          this.listar();
          this.nombre = "";
          this.ubicacion = "";
          this.precio = "";
        })
        .catch((data) => {
          this.error = data;
          console.log(data.error);
        });
    },
    listar: function () {
      axios.get("http://localhost:8090/medicamento").then((response) => {
        this.data = response.data;
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
                  <div class="col-span-2 sm:col-span-3">
                    <label
                      for="nombre"
                      class="block text-sm font-medium text-gray-700"
                      >Nombre</label
                    >
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      v-model="nombre"
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
                  <div class="col-span-2 sm:col-span-2">
                    <label
                      for="precio"
                      class="block text-sm font-medium text-gray-700"
                      >precio</label
                    >
                    <input
                      type="text"
                      v-model="precio"
                      name="price"
                      id="price"
                      class="
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        pl-7
                        pr-12
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                      placeholder="0.00"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="ubicacion"
                      class="block text-sm font-medium text-gray-700"
                      >Ubicación</label
                    >
                    <input
                      type="text"
                      v-model="ubicacion"
                      name="ubicacion"
                      id="ubicacion"
                      autocomplete="family-name"
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
                <button
                  @click="create_medicamento"
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
                    Ubicación
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in data" :key="item.email">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ item.id }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ item.nombre }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ item.precio }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ item.ubicacion }}
                    </div>
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
