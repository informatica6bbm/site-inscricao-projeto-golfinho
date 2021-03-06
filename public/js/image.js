Vue.use(VueMask.VueMaskPlugin);

var app = new Vue({
    el: '#inscricao',
    data: {
        nomeCompleto: "",
        documento: "",
        dataNascimento: "",
        cpf: "",
        rg: "",
        idade: "",
        tamanhoRegata: "",
        nomeResponsavel: "",
        whatsapp: "",
        email: "",
        bairro: "",
        cidade: "",
        estado: "",
        local: "",
        deficiencia: "",
        descricaoAtendimento: "",
        inscricaoSucesso: false,
        erroInscricao: false,
        erroCampos: false,
        exibeDescricaoAtendimento: false,
        clubes: [],
        msg: "",
        cidades: [],
    },
    created() {
        axios.get('https://projetogolfinho.herokuapp.com/pessoa/cidades/').then(response => {
            this.cidades = response.data;
        });

        /*function getDataHoraAtual() {
            var data = new Date();
            let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
            var data = data2.toISOString().replace(/\.\d{3}Z$/, '');

            return data;
        }*/
        /*this.anoAtual = parseInt(getDataHoraAtual().split("T")[0].split("-")[0]) ;
        this.mesAtual = parseInt(getDataHoraAtual().split("T")[0].split("-")[1]);
        this.diaAtual = parseInt(getDataHoraAtual().split("T")[0].split("-")[2]);

        if(this.mesAtual + 1 > 2 && this.diaAtual > 27){
            this.inscricoesAbertas = false;
        }*/
    },
    watch: {
        deficiencia(val) {
            var valor = (val === 'true');
            if(valor) {
                this.exibeDescricaoAtendimento = true;
            }

            if(!valor) {
                this.exibeDescricaoAtendimento = false;
            }
        },
        cidade(val){
            if(val){
                axios.get("https://projetogolfinho.herokuapp.com/pessoa/Clubescidade/" + val).then(response => {
                    this.clubes = response.data;
                });
            }
        }
    },
    methods: {
        validaCampos() {
            if( this.nomeCompleto &&
                this.dataNascimento &&
                this.idade &&
                this.tamanhoRegata &&
                this.nomeResponsavel &&
                this.whatsapp &&
                this.email &&
                this.bairro &&
                this.cidade &&
                this.estado &&
                this.local
            ) {
            if(!this.cpf  && !this.rg){
                return false;
            }

            if(this.cpf && !this.rg || !this.cpf && this.rg || this.cpf && this.rg) {
                console.log(this.deficiencia == "true");
                if(this.deficiencia == "true") {
                    this.erroCampos = false;
                    if(this.descricaoAtendimento) {
                        if(parseInt(this.idade) >= 8 && parseInt(this.idade) <= 14) {
                            return true;
                        }
                        if(parseInt(this.idade) < 8 && parseInt(this.idade) > 14) {
                            this.erroCampos = true;
                            return false;
                        }
                    }

                    if(!this.descricaoAtendimento) {
                        this.erroCampos = true;
                        return false;
                    }
                }

                if(this.deficiencia == "false") {
                    if(parseInt(this.idade) >= 8 && parseInt(this.idade) <= 14) {
                        return true;
                    }

                    if(parseInt(this.idade) < 8 && parseInt(this.idade) > 14) {
                        this.erroCampos = true;
                        return false;
                    }
                }
            }

            this.inscricaoSucesso = false;
            this.erroCampos = true;
            return false;
            }
        },
        inscrever() {
            var data = {
                nomeCompleto: this.nomeCompleto,
                cpf:  this.cpf,
                rg: this.rg,
                dataNascimento: this.dataNascimento,
                idade: this.idade,
                tamanhoRegata: this.tamanhoRegata,
                nomeResponsavel: this.nomeResponsavel,
                whatsapp: this.whatsapp,
                email: this.email,
                bairro: this.bairro,
                cidade: this.cidade,
                estado: this.estado,
                local: this.local,
                deficiencia: this.deficiencia,
                descricaoAtendimento: this.descricaoAtendimento,
            };
            if(this.validaCampos()) {

                for(var cont = 0; cont < this.cidades.length; cont++){
                    if(this.cidades[cont].idcidade == data.cidade){
                        data.cidade = this.cidades[cont].cidade;
                    }
                }

                axios.post('https://projetogolfinho.herokuapp.com/pessoa', data).then(response => {
                // axios.post('http://localhost:3000/pessoa', data).then(response => {
                    if(response.data.res) {
                        $('#modalAceite').modal('hide');
                        this.inscricaoSucesso = true;
                        this.erroInscricao = false;
                        alert("Inscrição realizada com sucesso!");
                        window.location.href = "#alert-sucesso";
                    }

                    if(!response.data.res) {
                        this.erroInscricao = true;
                        this.msg = response.data.msg ? response.data.msg : "Erro ao realizar a inscrição!";
                        $('#modalAceite').modal('hide');
                    }

                    this.nomeCompleto = "";
                    this.cpf = "";
                    this.rg = "";
                    this.dataNascimento = "";
                    this.idade = "";
                    this.tamanhoRegata = "";
                    this.nomeResponsavel = "";
                    this.whatsapp = "";
                    this.email = "";
                    this.bairro = "";
                    this.cidade = "";
                    this.estado = "";
                    this.local = "";
                    this.deficiencia = "";
                    this.descricaoAtendimento = "";

                    axios.get('https://projetogolfinho.herokuapp.com/pessoa/vagas').then(response => {
                        this.clubes = response.data;
                    });
                });
            }

            if(!this.validaCampos()) {
                $('#modalAceite').modal('hide');
            }
        },
    }
});

document.getElementById('links').onclick = function(event) {
    event = event || window.event
    var target = event.target || event.srcElement,
    link = target.src ? target.parentNode : target,
    options = { index: link, event: event },
    links = this.getElementsByTagName('a')
    blueimp.Gallery(links, options)
}