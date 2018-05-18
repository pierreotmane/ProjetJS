Vue.prototype.$http = axios;

  new Vue({

    el:"#app",
    data: {
      names:[],
      monnaie: null,
      position:null,
      inputNumber:null,
      valueBouton:"",
      transac:0
    },
    created(){
      var vm = this;
      this.$http.get('././api/name')
      .then(function(response){
        vm.names = response.data.data;  

      })
    },
    methods:{
      doMath:function(){
        return index;
      },
      acheter:function(){
        var vm = this;
        
        var mn = vm.names[vm.monnaie].name;
        vm.transac+=1;
        console.log(vm.transac);
        this.$http.put('././api/'+mn,{nbmonnaie : vm.inputNumber, value:"achat"})
        
      },
      afficher:function(){
        var vm = this;
        var mn = vm.names[vm.monnaie].name;
        if(vm.transac>0){
          this.$http.get('././api/portemonnaie/'+mn)
        .then(function(response){
          console.log(response);
        })
        }
        
      }
    }
  });