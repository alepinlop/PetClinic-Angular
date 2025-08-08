import { HttpHeaders } from "@angular/common/http";

export const environment = {

    //API_URL_Login: "http://localhost/AJAX/petClinic/lista_personas_V1",

    API_URL: "http://localhost/ANGULAR/PetClinic_Final/serviciosWeb/petClinic/servicios.php",

    cabecera: function(){
        let headers = { headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage["JWT"]
        })};
        return headers;
    },

    jsonEquals: function (a: any, b: any) {
        return JSON.stringify(a) == JSON.stringify(b);
    },

    SeleccionarObj: function (lista: object[], obj: object) {
        var res;
        lista.forEach(valor => {
            if (environment.jsonEquals(valor, obj))
                res = valor;
        }
        );
    },

    //Funcion que nos sirve para que se queden marcados los elementos que ya esten seleccionados en un objeto
    //Por ejemplo, para que aparezcan marcadas las especialidades de un veterinario
    SeleccionarObjArray: function (lista: Array<object>, objE: Array<object>) {
        var res = new Array();
        objE.forEach(ele => {
            lista.forEach(valor => {
                if (environment.jsonEquals(valor, ele))
                    res.push(valor);
            })
        })
        return res;
    }
};
