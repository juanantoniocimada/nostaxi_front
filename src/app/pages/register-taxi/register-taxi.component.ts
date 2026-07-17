import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { NestJSService } from '../../services/nestjs.service';

@Component({
  selector: 'app-register-taxi',
  templateUrl: './register-taxi.component.html',
  styleUrls: ['./register-taxi.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FormsModule
  ],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterTaxiComponent implements OnInit {

  taxi = {
    nome: '',
    whatsapp: '',
    ilha: 'São Vicente',
    funcionalidades: [] as string[]
  };

  constructor(private nestJsService: NestJSService) {}

  ngOnInit() {
  }

  toggleFuncionalidade(event: any) {

    const value = event.target.value;

    if (event.target.checked) {
      this.taxi.funcionalidades.push(value);
    } else {
      this.taxi.funcionalidades =
        this.taxi.funcionalidades.filter(
          item => item !== value
        );
    }

  }

  registerTaxi() {

  const json = {
    driver_name: this.taxi.nome,
    driver_phone: this.taxi.whatsapp,
    island: this.taxi.ilha,
    features: this.taxi.funcionalidades
  };

    console.log('Dados do interesse:', json);

    /*
    this.nestJsService.post('taxi-interest', json)
      .subscribe({
        next: (response) => {
          console.log('Guardado', response);
        },
        error: (error) => {
          console.error(error);
        }
      });
    */

    this.nestJsService.registerTaxiInterest(json)
    .subscribe({
      next: (response) => {
        console.log('Guardado correctamente', response);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

}