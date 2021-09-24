<template>
  <div class="small">
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="mt md:mt-0 md:col-span-6">
          <form>
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-12">
                <div class="grid grid-cols-12 gap-8">
                  <div class="col-span-2 sm:col-span-3">
                    <label
                      for="fecha_inicio"
                      class="block text-sm font-medium text-gray-700"
                      >Fecha Inicio</label
                    >
                    <input
                      type="text"
                      name="fecha_inicio"
                      id="fecha_inicio"
                      v-model="fecha_inicio"
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
                      for="fecha_fin"
                      class="block text-sm font-medium text-gray-700"
                      >Fecha Fin</label
                    >
                    <input
                      type="text"
                      v-model="fecha_fin"
                      name="fecha_fin"
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
                    />
                  </div>
                </div>
              </div>
              <div class="mx-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  @click="listar"
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
                  Calcular
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="chart">
      <line-chart v-if="active" :chart-data="datacollection"></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from "../util/line-chartjs";
import axios from "axios";
import moment from "moment";

export default {
  name: "Home",
  components: {
    LineChart,
  },
  data() {
    return {
      fecha_inicio: null,
      fecha_fin: null,
      active: false,
      datacollection: {
        labels: [],
        datasets: [],
      },
    };
  },
  mounted() {
    // this.listar("2021-07-06", "2021-09-25");
  },
  methods: {
    longitud: function () {
      return this.datacollection.labels.length();
    },
    listar: function (e) {
            if (e) e.preventDefault();
      this.active = false;
      let colors = {
        0: "#3e95cd",
        1: "#8e5ea2",
        2: "#3cba9f",
        3: "#e8c3b9",
        4: "#c45850",
      };
      axios
        .get(
          `http://localhost:8090/factura?fecha_inicio=${this.fecha_inicio}&fecha_fin=${this.fecha_fin}`
        )
        .then((response) => {
          let result = {};
          const list = response.data;
          list.forEach((data) => {
            const fecha = moment(data.fecha_crear, "YYYY-MM-DD").format(
              "MM/DD"
            );
            let calculado =
              parseFloat(data.pago_total) -
              parseFloat(data.pago_total) * (data.promocion.porcentaje / 100);

            if (result[data.promocion.id]) {
              let temp = result[data.promocion.id];
              let index = temp.fecha.findIndex((item) => item == fecha);
              if (index == -1) {
                result[data.promocion.id].saldo.push(calculado);
                result[data.promocion.id].fecha.push(fecha);
              }
              result[data.promocion.id].saldo[index] += calculado;
            } else {
              result[data.promocion.id] = {
                nombre: data.promocion.descripcion,
                fecha: [fecha],
                saldo: [calculado],
                color: colors[data.promocion.id],
              };
            }
          });
          for (let item in result) {
            console.log(result[item].nombre);
            this.datacollection.labels.push(result[item].fecha);
            let obj = {
              data: result[item].saldo,
              label: result[item].nombre,
              borderColor: result[item.color],
              fill: false,
            };
            this.datacollection.datasets.push(obj);
          }
          this.active = true;
        });
    },
  },
  // name: "Home",
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.chart {
  height: 20%;
  width: 70%;
}
</style>