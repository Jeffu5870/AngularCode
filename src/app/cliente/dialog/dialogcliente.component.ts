import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Cliente } from "src/app/Models/cliente";
import { ApiclienteService } from "src/app/services/apicliente.service";

@Component({
    templateUrl: 'dialogcliente.component.html'
})
export class DialogClienteComponent{
    public nit!: number;
    public nombre!: string;
    public apellido!: string;
    public telefono!: number;
    public direccion!: string;

    constructor(
        
        public referenciaDialogo: MatDialogRef<DialogClienteComponent>,
        public apiCliente: ApiclienteService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public cliente: Cliente
    ){

        if(this.cliente !== null){
            this.nit = cliente.nit;
            this.nombre = cliente.nombre;
            this.apellido = cliente.apellido;
            this.telefono = cliente.telefono;
            this.direccion = cliente.direccion;
        }
    }

    close(){
        this.referenciaDialogo.close()
    }

    addCliente(){
        const cliente: Cliente = { nit: this.nit, nombre: this.nombre, apellido: this.apellido, telefono: this.telefono, direccion: this.direccion};
        this.apiCliente.add(cliente).subscribe(response => {
            if(response.verdadero == 1)
            {
                this.referenciaDialogo.close()
                this.snackBar.open('Cliente insertado', '', {
                    duration: 2000
                });
            }
            if(response.verdadero == 0)
            {
                this.referenciaDialogo.close()
                this.snackBar.open('Ya existe un Nit igual, "VERFICAR DATOS"', '', {
                    duration: 2000
                });
            }
        });
            
    }


    modificarCliente(){
        const cliente: Cliente = { nit:this.cliente.nit, nombre:this.nombre, apellido:this.apellido, telefono:this.telefono, direccion:this.direccion};
        this.apiCliente.Modificar(cliente).subscribe(response => {
            if(response.verdadero == 1)
            {
                this.referenciaDialogo.close()
                this.snackBar.open('Cliente insertado', '', {
                    duration: 2000
                });
            }
            if(response.verdadero == 0)
            {
                this.referenciaDialogo.close()
                this.snackBar.open('Ya existe un Nit igual, "VERFICAR DATOS"', '', {
                    duration: 2000
                });
            }
        });
    }
    
    
}