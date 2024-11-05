import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class ApiPokemonService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 100): Observable<Pokemon[]> {
    const urlApi = `${this.url}?limit=${limit}`;
    console.log(urlApi);
    
    return this.http.get<{ results: Pokemon[] }>(urlApi).pipe(
      map(response => response.results) 
    );
  }

  getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }
}
