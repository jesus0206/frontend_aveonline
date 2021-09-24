
<script>
import axios from "axios";

export default {
  data() {
    return {
      medicamentos: [{ id: 3 }, { id: 4 }],
      simular: true,
      selected: null,
      resultado: null,
      promocion_id: null,
      fecha_simulada: null,
    };
  },
  mounted() {},
  methods: {
    calcular_simulador: function (e) {
      axios
        .get(
          `http://localhost:8090/factura/simular?id_medicamentos=${this.medicamentos
            .map((data) => data.id)
            .join(",")}&fecha_compra=${this.fecha_simulada}`
        )
        .then((response) => {
          console.log(response);
          this.resultado = response.data;
        });
    },
    crear_factura: function (e) {
      axios({
        method: "post",
        url: "http://localhost:8090/factura",
        data: {
          id_promocion: this.promcion_id,
          pago_total: 1,
          id_medicamentos: this.medicamentos.map((data) => data.id),
        },
      })
        .then((data) => {
          console.log(data);
          this.medicamentos = null;
          this.promocion_id = null;
        })
        .catch((data) => {
          console.log(data.error);
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
        <div class="mt md:mt-0 md:col-span-6"></div>
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
