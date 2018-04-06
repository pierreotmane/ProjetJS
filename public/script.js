Vue.prototype.$http = axios;

  new Vue({

    el:"#app",
    data: {
      names:[],
      charts:[],
      monnaie: null
    },
    created(){
      var vm = this;
      this.$http.get('././api/name')
      .then(function(response){
        vm.names = response.data.data;   
      })
    },
    methods:{
      afficherChart:function(monnaie){
        var vm = this
        vm.charts = [];
        this.$http.get('././api/'+monnaie)
        .then(function(response){
          var val = response.data.data.data;

          for(var i =0; i<val.length;i++){
            vm.charts.push([val[i].time, val[i].close]); 
          }
          
          Highcharts.stockChart('container', {
            rangeSelector: {
                selected: 1
            },

            title: {
                text: vm.monnaie
            },

            series: [{
                name: vm.monnaie,
                data: vm.charts,
                tooltip: {
                valueDecimals: 2
                }
            }]
          });
          
        })
      }
    }
  })