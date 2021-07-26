import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Cliente } from "src/app/Models/cliente";
import { ApiclienteService } from "src/app/services/apicliente.service";

@Component({
    templateUrl: 'dialogcliente.component.html'
})
export class DialogClienteComponent{
    constructor(
        public dialogRef: MatDialogRef<DialogClienteComponent>,
        public apiCliente: ApiclienteService,
        public snackBar: MatSnackBar,
    ){}

    close(){
        this.dialogRef.close()
    }

    addCliente(){
        const cliente: Cliente = { nit: 87654321, nombre: 'Ricardo', apellido:'Jota', telefono: 77600012, direccion: 'Totonicapan'};
        this.apiCliente.add(cliente).subscribe(response => {
            this.snackBar.open('jajajjaa', '');
            console.log(response.verdadero);
            

            if(response.verdadero == 1)
            {
                this.dialogRef.close()
                this.snackBar.open('Cliente insertado', '', {
                    duration: 2000
                });
            }
            if(response.verdadero == 0)
            {
                this.dialogRef.close()
                this.snackBar.open('Ya existe un Nit igual, "VERFICAR DATOS"', '', {
                    duration: 2000
                });
            }
        });
            
    }
    
    
}