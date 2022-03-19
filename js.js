var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    show_menu:false,
    main:true,
    turnamens:[],
    rankings:[],
    players:[],
    matchs:[],
    data_match:[],
    points:[],
    data_point:[],
    data_matchs:false,
    matchs:[],
    header:true,
    section:true,
    show_ranking:false,
    show_player:false,
    show_turnamen:false,
    jumbo:false,
    show_single_player:false,
    show_single_turnamen:false,
    show_event:true,
    show_slide:false,
    satu_turnamen:[],
    event: [],
    current: 0,
    width: 800,
    timer: 0,
    grups: [],
    dataModal:null,
    



  },
  computed:{
    HasilPertandingan: function(){
      return this.event.filter((blog) => {
          return blog.status =='2'
      });
    },
    events: function(){
      return this.event.filter((blog) => {
          return blog.status =='1'
      });
    },
    urutPlayers(){
      function compare(a, b) {
        if (a.player < b.player)
          return -1;
        if (a.player > b.player)
          return 1;
        return 0;
      }
  
      return this.players.sort(compare);
    },
    urutTurnaments(){
      function compare(a, b) {
        if (a.row > b.row)
          return -1;
        if (a.row < b.row)
          return 1;
        return 0;
      }
  
      return this.turnamens.sort(compare);
    },
    data_match_sort(){
      function compare1(a, b) {
        if (a.row > b.row)
          return -1;
        if (a.row < b.row)
          return 1;
        return 0;
      }
  
      return this.data_match[0].sort(compare1);
    },
    data_point_sort(){
      function compare1(a, b) {
        if (a.row > b.row)
          return -1;
        if (a.row < b.row)
          return 1;
        return 0;
      }
  
      return this.data_point.sort(compare1);
    },

    groups1(){
  if(this.grups.length > 0){
    const result = {};

    for(const {grup, namaTim, scorePlus, scoreMin, poin, games, selisihGames, JumlahMatch} of this.grups) {
      if(!result[grup]) result[grup] = [];
      result[grup].push({ grup, namaTim, scorePlus, scoreMin, poin, games, selisihGames, JumlahMatch });
          }
          return result;
        }
    },
    







  },
  methods:{
      showOff(){
        this.header =false;
        // this.main = false;
        this.show_player = false;
        this.jumbo = false;
        this.show_ranking = false;
        this.show_turnamen = false;
        this.show_single_player = false;
        this.show_single_turnamen = false;
        this.show_event = false;
        

      },
      showAll(){
        this.header =true;
        // this.main = true;
        this.show_player = true;
        this.jumbo = true;
        this.show_ranking = true;
        this.show_turnamen = true;
        this.show_single_player = false;
        this.show_event = true;
        this.section =true ;

      },
      mklikMenu(){
          // this.showOff();
          this.main = false;
          this.show_menu = true;
      },
      klikPlayer(x){
        this.showOff();
        this.header = true;
        this.section = true;
        this.show_single_player = true;
        // this.selectedPlayer = x;
//         console.log(x);
        this.ambil_data_player(x);

      },
      ambil_data_player(id){
        this.selectedPlayer = [];
          var data_ranking = [];
          data_ranking = this.rankings.filter(x => x.id === id.id);
          // console.log(data_ranking);

          var data_player = [];
          data_player = this.players.filter(x => x.id === id.id);
          var selectedPlayer1 = data_ranking.concat(data_player);
          // console.log(selectedPlayer1);

          var data_match1 = [];
          data_match1 = this.matchs.filter(x => x.player1 == id.player||x.player2 == id.player||x.player3 == id.player ||x.player4 == id.player);
          // console.log(data_match1);

          this.data_match = [data_match1];
          
          var data_point = [];
          data_point = this.points.filter(x => x.id === id.id);
          this.data_point = data_point;
          // console.log(selectedPlayer1);
          
          var ranking_player = data_ranking.concat(data_player);



          var selectedPlayer1 = ranking_player.concat([this.data_match_sort]);

          var selectedPlayer2 = selectedPlayer1.concat([this.data_point_sort]);
          // console.log(selectedPlayer1);


        return this.selectedPlayer = selectedPlayer2;
      
      },
      klikRanking(){
        this.show_menu = false;
        this.main = true;
        this.showOff();
        this.header = true;
        this.show_ranking = true;

      },
      klikTurnamen(){
        this.show_menu = false;
        this.main = true;
        this.showOff();
        this.header = true;
        this.show_turnamen = true;

      },
      klikPlayers(){
        this.showOff();
        this.main = true;
        this.header = true;
        this.show_menu = false;
        this.show_player = true;

      },
      klikTurnamen(){
        this.showOff();
        this.main = true;
        this.header = true;
        this.show_menu = false;
        this.show_turnamen = true;
        

      },
      klik_satu_turnamen(xx){
        this.showOff();
        this.main = true;
        this.header = true;
        this.show_menu = false;
        this.show_turnamen = false;
        this.show_single_turnamen = true;

        var abc = this.points.filter(x => x.turnamen == xx.nama);
        var bcd = this.matchs.filter(x => x.turnamen == xx.nama);
        var foto = xx.foto;
        var nama_turnamen = xx.nama;
        var tgl = xx.tanggal;
        var dokumentasi = xx.dokumentasi;
        return this.satu_turnamen = [abc, bcd, foto, nama_turnamen, dokumentasi, tgl];
    },
      
    nextSlide() {
      this.current++;
      if (this.current >= this.players.length)
        this.current = 0;
      
    },

    play () {
      // alert('dfsafd')
      this.timer = setInterval(function() {
        app.nextSlide();
        
      }, 4000);
    },
    mulai () {
      // alert('dfsafd')
      setTimeout (function() {
        app.showOff();
        app.show_slide = true;
        app.play();
        // alert('jlkjfkldjsfd')
      }, 2000);
    },
    stop_slide () {
      this.show_slide = false;
      this.main = true;
      this.header = true;
      this.show_event = true;
      setTimeout (function() {
        app.mulai();
      }, 600000);
    },




  },

  created() {
    // play slide show
    // this.mulai ()

    // ambil data grup
    this.grups = [];

    var url ="https://script.google.com/macros/s/AKfycbx6jx9ZCEFAe7tdpSnNAvzyLkEB__oEsA08wA3YhBcBbH-aDZZhK6la_yvEUh3fUWf17g/exec?action=read&table=Qgrup";

    $.getJSON(url, function (json) {
    // console.log(json.data);
    // console.log(json.data.records)
    app.grups = json.data;
    });    


    // ambil data event
    this.event = [];

    var url ="https://script.google.com/macros/s/AKfycbx6jx9ZCEFAe7tdpSnNAvzyLkEB__oEsA08wA3YhBcBbH-aDZZhK6la_yvEUh3fUWf17g/exec?action=read&table=Qevent";

    $.getJSON(url, function (json) {
    // console.log(json.data);
    // console.log(json.data.records)
    app.event = json.data;
    });


    // ambil data rangking
    this.rankings = [];

    var url ="https://script.google.com/macros/s/AKfycbx6jx9ZCEFAe7tdpSnNAvzyLkEB__oEsA08wA3YhBcBbH-aDZZhK6la_yvEUh3fUWf17g/exec?action=read&table=QPoints";

    $.getJSON(url, function (json) {
    // console.log(json.data);
    // console.log(json.data.records)
    app.rankings = json.data;
    });

    // ambil data players
    this.rankings = [];

    var url ="https://script.google.com/macros/s/AKfycbx6jx9ZCEFAe7tdpSnNAvzyLkEB__oEsA08wA3YhBcBbH-aDZZhK6la_yvEUh3fUWf17g/exec?action=read&table=QPlayers";

    $.getJSON(url, function (json) {
    // console.log(json.data);
    // console.log(json.data.records)
    app.players = json.data;
    });

    // ambil data match
    this.matchs = [];

    var url ="https://script.google.com/macros/s/AKfycbx6jx9ZCEFAe7tdpSnNAvzyLkEB__oEsA08wA3YhBcBbH-aDZZhK6la_yvEUh3fUWf17g/exec?action=read&table=match";

    $.getJSON(url, function (json) {
    // console.log(json.data);
    // console.log(json.data.records)
    app.matchs = json.data;
    });

          // ambil data point
          this.matchs = [];

          var url ="https://script.google.com/macros/s/AKfycbx6jx9ZCEFAe7tdpSnNAvzyLkEB__oEsA08wA3YhBcBbH-aDZZhK6la_yvEUh3fUWf17g/exec?action=read&table=points";
    
          $.getJSON(url, function (json) {
          // console.log(json.data);
          // console.log(json.data.records)
          app.points = json.data;
          });

          // ambil data turnament
          this.turnamens = [];

          var url ="https://script.google.com/macros/s/AKfycbx6jx9ZCEFAe7tdpSnNAvzyLkEB__oEsA08wA3YhBcBbH-aDZZhK6la_yvEUh3fUWf17g/exec?action=read&table=turnament";
    
          $.getJSON(url, function (json) {
          // console.log(json.data);
          // console.log(json.data.records)
          app.turnamens = json.data;
          });

  },

})
