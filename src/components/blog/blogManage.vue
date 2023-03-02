<template>
  <v-table :hover="true"  :density="'comfortable' " :fixed-header="true">
    <thead>
    <tr>
      <th v-if="blg_box" class="text-left blog-th">
        <v-checkbox class="blg-box" label="全选"></v-checkbox>
<!--        <input type="checkbox"/>全选-->
      </th>
      <th class="text-left">
        用户
      </th>
      <th class="text-left">
        登录时间

        <v-btn class="on-update"
               color="primary"
              @click="onUpdate"
        >
<!--          <v-icon-->
<!--              start-->
<!--              icon="mdi-arrow-right"-->
<!--          ></v-icon>-->
          修改

        </v-btn>
        <v-btn class="on-delete"
               color="primary"
               @click="onUpdate"
        >
          <!--          <v-icon-->
          <!--              start-->
          <!--              icon="mdi-arrow-right"-->
          <!--          ></v-icon>-->
          删除

        </v-btn>
      </th>
    </tr>
    </thead>
    <tbody>
    <template  v-for="item in desserts"
               :key="item.name">
    <tr

    ><td v-if="blg_box">
      <v-checkbox class="blg-box"></v-checkbox>
<!--      <input type="checkbox"/>-->
    </td>
      <td>{{ item.name }}</td>
      <td>{{ item.lastTime }}</td>

    </tr>
      <tr>
        <td v-if="blg_box">

        </td>
        <td colspan="2">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <template v-slot:default="{ expanded }">
                  <v-row no-gutters>
                    <v-col cols="4" class="d-flex justify-start">
                      个人文章
                    </v-col>
                    <v-col
                        cols="8"
                        class="text-grey"
                    >
                      <v-fade-transition leave-absolute>
                <span
                    v-if="expanded"
                    key="0"
                >
                  Enter a name for the trip
                </span>
                        <span
                            v-else
                            key="1"
                        >
                  {{ trip.name }}
                </span>
                      </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-text-field
                    v-model="trip.name"
                    hide-details
                    placeholder="Caribbean Cruise"
                ></v-text-field>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title v-slot="{ open }">
                <v-row no-gutters>
                  <v-col cols="4" class="d-flex justify-start">
                    评论
                  </v-col>
                  <v-col
                      cols="8"
                      class="text--secondary"
                  >
                    <v-fade-transition leave-absolute>
              <span
                  v-if="open"
                  key="0"
              >
                Select trip destination
              </span>
                      <span
                          v-else
                          key="1"
                      >
                {{ trip.location }}
              </span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row no-gutters>
                  <v-spacer></v-spacer>
                  <v-col cols="5">
                    <v-select
                        v-model="trip.location"
                        :items="locations"
                        chips
                        flat
                        variant="solo"
                    ></v-select>
                  </v-col>

                  <v-divider
                      vertical
                      class="mx-4"
                  ></v-divider>

                  <v-col cols="3">
                    Select your destination of choice
                    <br>
                    <a href="#">Learn more</a>
                  </v-col>
                </v-row>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      variant="text"
                      color="secondary"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      variant="text"
                      color="primary"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-expansion-panel-text>
            </v-expansion-panel>

<!--            <v-expansion-panel>-->
<!--              <v-expansion-panel-title v-slot="{ open }">-->
<!--                <v-row no-gutters>-->
<!--                  <v-col cols="4" class="d-flex justify-start">-->
<!--                    Start and end dates-->
<!--                  </v-col>-->
<!--                  <v-col-->
<!--                      cols="8"-->
<!--                      class="text&#45;&#45;secondary"-->
<!--                  >-->
<!--                    <v-fade-transition leave-absolute>-->
<!--                      <span v-if="open">When do you want to travel?</span>-->
<!--                      <v-row-->
<!--                          v-else-->
<!--                          no-gutters-->
<!--                          style="width: 100%"-->
<!--                      >-->
<!--                        <v-col cols="6" class="d-flex justify-start">-->
<!--                          Start date: {{ trip.start || 'Not set' }}-->
<!--                        </v-col>-->
<!--                        <v-col cols="6" class="d-flex justify-start">-->
<!--                          End date: {{ trip.end || 'Not set' }}-->
<!--                        </v-col>-->
<!--                      </v-row>-->
<!--                    </v-fade-transition>-->
<!--                  </v-col>-->
<!--                </v-row>-->
<!--              </v-expansion-panel-title>-->
<!--              <v-expansion-panel-text>-->
<!--                <v-row-->
<!--                    justify="space-around"-->
<!--                    no-gutters-->
<!--                >-->
<!--                  <v-col cols="3">-->
<!--                    <v-text-field-->
<!--                        v-service="trip.start"-->
<!--                        label="Start date"-->
<!--                        type="date"-->
<!--                    ></v-text-field>-->
<!--                  </v-col>-->

<!--                  <v-col cols="3">-->
<!--                    <v-text-field-->
<!--                        v-service="trip.end"-->
<!--                        label="End date"-->
<!--                        type="date"-->
<!--                    ></v-text-field>-->
<!--                  </v-col>-->
<!--                </v-row>-->
<!--              </v-expansion-panel-text>-->
<!--            </v-expansion-panel>-->
          </v-expansion-panels>
        </td>
      </tr>
    </template>
    </tbody>
  </v-table>

</template>
<script>
export default {
  data () {
    return {
      snackbar: false,
      text: `Hello, I'm a snackbar`,
      blg_box:true,
      date: null,
      trip: {
        name: '',
        location: null,
        start: null,
        end: null,
      },
      locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
      desserts: [
        {
          name: 'Frozen Yogurt',
          lastTime: '2023/12/23',
        },
        {
          name: 'Ice cream sandwich',
          lastTime: '2023/12/23',
        },
        {
          name: 'Eclair',
          lastTime: '2023/12/23',
        },
        {
          name: 'Cupcake',
          lastTime: '2023/12/23',
        },
        {
          name: 'Gingerbread',
          lastTime: '2023/12/23',
        },
        {
          name: 'Jelly bean',
          lastTime: '2023/12/23',
        },
        {
          name: 'Lollipop',
          lastTime: '2023/12/23',
        },
        {
          name: 'Honeycomb',
          lastTime: '2023/12/23',
        },
        {
          name: 'Donut',
          lastTime: '2023/12/23',
        },
        {
          name: 'KitKat',
          lastTime: '2023/12/23',
        },
      ],
    }
  },methods:{
      onUpdate(){
        if(this.blg_box){
          this.blg_box=false;
        }else {
          this.blg_box=true;
        }
        }
  }
}
</script>

<style scoped>
  .on-delete{
    position: absolute;
    right: 30px;
    height: 30px;
    width: 30px;
  }
  .on-update{
    position: absolute;
    right: 100px;
    height: 30px;
    width: 30px;
  }
  .blg-box{
    height: 20px;
    width: 80px;
    margin-top: -27px;
    /*float: left;*/
    /*position: absolute;*/

  }
  .blog-th{
    width: 8%;
  }
</style>