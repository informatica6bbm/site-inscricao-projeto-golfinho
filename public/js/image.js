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
    },
    created() {
        axios.get('https://projetogolfinho.herokuapp.com/pessoa/vagas').then(response => {
            this.clubes = response.data;
        });
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
                if(!this.cpf && !this.rg){
                    return false;
                }

                if(this.cpf && !this.rg || !this.cpf && this.rg || this.cpf && this.rg) {
                    var deficiencia = (this.deficiencia === 'true');
                    if(deficiencia) {
                        this.erroCampos = false;
                        if(this.descricaoAtendimento) {
                            if(parsInt(this.idade) >= 8 && parsInt(this.idade) <= 13) {
                                return true;
                            }
                            if(!(parsInt(this.idade) >= 8 && parsInt(this.idade) <= 13)) {
                                this.erroCampos = true;
                                return false;
                            }
                        }

                        if(!this.descricaoAtendimento) {
                            this.erroCampos = true;
                            return false;
                        }
                    }

                    if(!deficiencia) {
                        if(parseInt(this.idade) >= 8 && parseInt(this.idade) <= 13) {
                            return true;
                        }
                        if(!(parseInt(this.idade) >= 8 && parseInt(this.idade) <= 13)) {
                            this.erroCampos = true;
                            return false;
                        }
                    }
                }
            }
            this.inscricaoSucesso = false;
            this.erroCampos = true;
            return false;
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
                axios.post('https://projetogolfinho.herokuapp.com/pessoa', data).then(response => {
                    if(response.data.res) {
                        $('#modalAceite').modal('hide');
                        this.inscricaoSucesso = true;
                        this.erroInscricao = false;
                        alert("Inscrição realizada com sucesso! você receberá um email de confimação de inscrição.");
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
