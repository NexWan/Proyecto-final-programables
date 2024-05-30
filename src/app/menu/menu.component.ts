import { Component } from '@angular/core';
import { ConfigService } from '../config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { basurero } from '../../../types';



@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TableModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent {

  contenedor:any = "hola mundo"

  basureros: basurero[] = [];
  
  constructor(private config: ConfigService, private route: ActivatedRoute, private router: Router) {}

  async loadAllData(){
    this.contenedor = this.config.getAllData().subscribe((data: basurero[]) => {
      console.log(data);
      sessionStorage.setItem('prevLleno', data[0].lleno.toString());
      this.basureros = data;
      this.contenedor = data[0].nombre_basurero;
      return data[0];
    });
  }

  async ngOnInit() {
    let x = await this.config.getBasureros();
    await this.loadAllData();
    x.subscribe((data: basurero[]) => {
      console.log(data);
      let lleno = data[0].lleno;
      if(sessionStorage.getItem('prevLleno') !== lleno.toString()){
        this.contenedor = data[0].nombre_basurero;
        this.basureros = data;
        sessionStorage.setItem('prevLleno', lleno.toString());
      }
    });
  }


}
