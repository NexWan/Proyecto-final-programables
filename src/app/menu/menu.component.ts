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

  async ngOnInit() {
    let x = await this.config.getBasureros();
    x.subscribe((data: basurero[]) => {
      console.log(data);
      this.contenedor = data[0].nombre_basurero;
      this.basureros = data;
    });
  }
}
