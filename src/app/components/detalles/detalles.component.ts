import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiPokemonService } from '../../service/api-pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { TitleCasePipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, HeaderComponent, FooterComponent,UpperCasePipe],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent implements OnInit {

  pokemon?: Pokemon;
  pokemonImages: string[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiPokemonService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const url = params['url'];
      if (url) {
        this.apiService.getPokemonDetails(url).subscribe({
          next: (data: Pokemon) => {
            this.pokemon = data;
            this.loadPokemonImages();
          },
          error: (err: any) => {
            console.error('Error retrieving Pokémon details:', err);
          }
        });
      }
    });
  }

  loadPokemonImages(): void {
    if (this.pokemon?.sprites) {
      this.pokemonImages = [
        this.pokemon.sprites.front_default,
        this.pokemon.sprites.back_default,
        this.pokemon.sprites.front_shiny,
        this.pokemon.sprites.back_shiny,
      ].filter((url): url is string => url !== undefined); 
    }
  
  }
}
