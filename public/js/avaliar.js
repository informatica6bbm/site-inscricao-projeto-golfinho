var app = new Vue({
    el: '#form-avaliar',
    data: {
        pergunta1: "",
        pergunta2: "",
        pergunta3: "",
        pergunta4: "",
        pergunta5: "",
        sugestao: "",
        exibeFormulario: true,
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
            if(this.pergunta1 && this.pergunta2 && this.pergunta3 && this.pergunta4 && this.pergunta5) {
                return true;
            }
            return false;
        },
        avaliar() {
            if(this.validaCampos()) {
                var data = {
                    pergunta1: this.pergunta1,
                    pergunta2: this.pergunta2,
                    pergunta3: this.pergunta3,
                    pergunta4: this.pergunta4,
                    pergunta5: this.pergunta5,
                    sugestao: this.sugestao
                }

                axios.post('https://projetogolfinho.herokuapp.com/pessoa/avaliar', data).then(response => {
                    if(response.data){
                        this.exibeFormulario = false;
                    }
                });
            }
        }
    }
});