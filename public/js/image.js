Vue.use(VueMask.VueMaskPlugin);

var app = new Vue({
    el: '#inscricao',
    data: {
        nomeCompleto: "",
        documento: "",
        dataNascimento: "",
        documento: "",
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
                this.documento &&
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
                var deficiencia = (this.deficiencia === 'true');
                if(deficiencia) {
                    this.erroCampos = false;
                    if(this.descricaoAtendimento) {
                        return true;
                    }

                    if(!this.descricaoAtendimento) {
                        this.erroCampos = true;
                        return false;
                    }
                }

                if(!deficiencia) {
                    return true;
                }
            }
            this.inscricaoSucesso = false;
            this.erroCampos = true;
            return false;
        },
        inscrever() {
            var data = {
                nomeCompleto: this.nomeCompleto,
                documento:  this.documento,
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
                axios.post('http://localhost:3000/pessoa', data).then(response => {
                    if(response.data) {
                        this.inscricaoSucesso = true;
                        this.erroInscricao = false;
                    }

                    if(!response.data) {
                        this.erroInscricao = true;
                    }

                    this.nomeCompleto = "";
                    this.documento = "";
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
                });
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

document.getElementById('links-1').onclick = function(event) {
    event = event || window.event
    var target = event.target || event.srcElement,
    link = target.src ? target.parentNode : target,
    options = { index: link, event: event },
    links = this.getElementsByTagName('a')
    blueimp.Gallery(links, options)
}
