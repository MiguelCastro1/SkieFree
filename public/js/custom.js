(function () {

    let FPS = 20;
    const TAMX = 300;
    const TAMY = 400;
  
    const PROB_ARVORE = 2;    
    const PROB_ROCHA = 2;
    const PROB_TOCO = 1;
    const PROB_CACHORRO = 0.5;
    const PROB_ARBUSTO = 1;
    const PROB_ARVORE_GRANDE = 0.5;
    //const PROB_COGUMELO = 1;
  
    let montanha;
    let skier;
    let intervalo;
    const obstaculos = [];
    //const cogumelos = [];
    let tempo;
    
    function init() {
      montanha = new Montanha();
      skier = new Skier();
      intervalo = setInterval(run, 1000/FPS);
    }
  
    function parar(){
      clearInterval(intervalo)
      window.removeEventListener('keydown',eventos)
    }
  
    function eventos(e){
      if (e.key === 'ArrowLeft') skier.mudarDirecao(-1)
      else if (e.key === 'ArrowRight') skier.mudarDirecao(+1);
      else if(e.key === 'f' || e.key == 'F') {
        FPS = 30  
        clearInterval(intervalo)
        intervalo = setInterval(run, 1000/FPS)
      }else if(e.keyCode == 32){
        clearInterval(intervalo)
      }
    }
  
    window.addEventListener('keydown', eventos);
    class Montanha {
      constructor() {
        this.element = document.getElementById('montanha');
        this.element.style.width = `${TAMX}px`;
        this.element.style.height = `${TAMY}px`;
        this.element.style.top = '200px';
        this.element.style.left =  '200px'
      }
    }
    class Skier {
      constructor() {
        this.vidas = 3;
        this.metros = 0;
        this.caido = false;
        this.element = document.getElementById('skier');
        this.direcoes = ['para-esquerda', 'para-frente', 'para-direita'];
        this.direcao = 1;
        this.element.className = this.direcoes[this.direcao];
        this.element.style.top = '20px';
        this.element.style.left = parseInt(TAMX/2) -8 + 'px';
      }
      mudarDirecao(giro) {
        if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
          this.direcao += giro;
          this.element.className = this.direcoes[this.direcao];
        }
      }
      andar() {
        if (this.direcao === 0 && parseInt(this.element.style.left) >= 0) this.element.style.left = parseInt(this.element.style.left)-1 + 'px';
        else if (this.direcao === 2 && parseInt(this.element.style.left)  <= (TAMX - parseInt(this.element.clientWidth) )) this.element.style.left = parseInt(this.element.style.left)+1 + 'px';
      }
      cair(){
        this.caido = true;
        this.element.className = 'caido';
        this.vidas -= 1;
        if(this.vidas <= 0)
          this.morrer();
      }
      levantar(){
        this.caido = false;
        this.element.className = this.direcoes[this.direcao];
      }
      morrer(){
        this.element.className = 'morto';
        parar();
      }
  
    }
    class Arvore {
      constructor() {
        this.element = document.createElement('div');
        this.element.className = 'arvore';
        montanha.element.appendChild(this.element);
        this.element.style.top = `${TAMY}px`;
        this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
      }
    }
    class Arbusto {
      constructor() {
        this.element = document.createElement('div');
        this.element.className = 'arbusto';
        montanha.element.appendChild(this.element);
        this.element.style.top = `${TAMY}px`;
        this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
      }
    }
    class Rocha {
      constructor() {
        this.element = document.createElement('div');
        this.element.className = 'rocha';
        montanha.element.appendChild(this.element);
        this.element.style.top = `${TAMY}px`;
        this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
      }
    }
    class Toco {
      constructor() {
        this.element = document.createElement('div');
        this.element.className = 'toco';
        montanha.element.appendChild(this.element);
        this.element.style.top = `${TAMY}px`;
        this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
      }
    }
    class Cachorro {
      constructor() {
        this.element = document.createElement('div');
        this.element.className = 'cachorro';
        montanha.element.appendChild(this.element);
        this.element.style.top = `${TAMY}px`;
        this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
      }
    }
    
    class Arvore_grande {
      constructor() {
        this.element = document.createElement('div');
        this.element.className = 'arvore_grande';
        montanha.element.appendChild(this.element);
        this.element.style.top = `${TAMY}px`;
        this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
      }
    }
  
   // class Cogumelo {
   //   constructor() {
   //     this.element = document.createElement('div');
   //     this.element.className = 'cogumelo';
   //     montanha.element.appendChild(this.element);
   //     this.element.style.top = `${TAMY}px`;
   //     this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
   //   }
   // }
  
  
    function run() {
      const random = Math.random() * 100;
  
      if (random <= PROB_ARVORE) {
        const arvore = new Arvore();
        obstaculos.push(arvore);
      }
      
      if (random <= PROB_ARBUSTO) {
        const arbusto = new Arbusto();
        obstaculos.push(arbusto);
      }
      
      if (random <= PROB_ROCHA) {
        const rocha = new Rocha();
        obstaculos.push(rocha);
      }
      
      if (random <= PROB_TOCO) {
        const toco = new Toco();
        obstaculos.push(toco);
      }
      
      if (random <= PROB_ARVORE_GRANDE) {
        const arvore_grande = new Arvore_grande();
        obstaculos.push(arvore_grande);
      }
  
      if (random <= PROB_CACHORRO) {
        const cachorro = new Cachorro();
        obstaculos.push(cachorro);
      }
  
    //  if (random <= PROB_COGUMELO) {
    //    const cogumelo = new Cogumelo();
    //    cogumelos.push(cogumelo);
    // }
      
      skier.andar();  
  
      obstaculos.forEach(a => {
        a.element.style.top = parseInt(a.element.style.top)-1 + 'px';
      })
  
    //  cogumelos.forEach(a => {
     //   a.element.style.top = parseInt(a.element.style.top)-1 + 'px';
     // })
  
      if(!skier.caido)
        colisao();
      else{
        tempo +=1;
        //tempo de vulnerabilidade
        if(tempo == 60){
          skier.levantar();
        }
      }  
  
      skier.metros = skier.metros +1;
      document.getElementById('metros').innerHTML = skier.metros
      document.getElementById('vidas').innerHTML = skier.vidas
    }
  
    init();
  
    function colisao(){
      // dados dos skier como onde está cada ponto dos cantos(pé)
      let altura =  parseInt(skier.element.style.top);
      let pes_altura = parseInt(skier.element.style.top) + parseInt(skier.element.clientHeight);
      let pe_direito = parseInt(skier.element.style.left) + parseInt(skier.element.clientWidth);
      let pe_esquerdo = parseInt(skier.element.style.left);
      
      //const obstaculos_filtrados = obstaculos.filter(a => a.element.style.top > pes_altura)
      //para cada obstaculo, verifica se colidiu
      obstaculos.forEach(a => {
         // dados dos obstaculo como onde está cada ponto de cantos(pé)
        let altura_o =  parseInt(a.element.style.top) ;
        let pes_altura_o = parseInt(a.element.style.top) + parseInt(a.element.clientHeight);
        let pe_direito_o = parseInt(a.element.style.left) + parseInt(a.element.clientWidth) ;
        let pe_esquerdo_o = parseInt(a.element.style.left) ;
  
        //tolerancia para colisao(maior se for arvore)
        const tolerancia = 5;
        if(a.element.className === 'arvore_grande' || a.element.className === 'arvore'){
          altura_o = altura_o + tolerancia + 2;
          pe_esquerdo_o = pe_esquerdo_o + tolerancia
          pe_direito_o = pe_direito_o - tolerancia
        }else{
          altura_o = altura_o + 2;
          pe_esquerdo_o = pe_esquerdo_o + 2
          pe_direito_o = pe_direito_o - 2
        }
      
        //Colisao de frente
        if(pes_altura == altura_o && pe_direito > pe_direito_o  && pe_esquerdo < pe_esquerdo_o){
          skier.cair()
          tempo = 0;
        //colisao pela direita
        }else if(pe_direito > pe_esquerdo_o && pe_direito < pe_direito_o && pes_altura > altura_o && pes_altura < pes_altura_o){
          skier.cair()
          tempo = 0;
        //colisao pela esquerda
        }else if(pe_esquerdo < pe_direito_o &&  pe_esquerdo > pe_esquerdo_o && pes_altura > altura_o && pes_altura < pes_altura_o){
          skier.cair()
          tempo = 0;
        } 
      })
    }
  })()
  
function apagarCurso(id){
    console.log('in')
    $.ajax({
        url: `/curso/${id}`,
        type: 'DELETE',

    })
    .done(function (msg) {
        console.log(msg);
        window.location.href='/curso';
    })
    .fail(function (msg){
        console.log(msg);
    })
}