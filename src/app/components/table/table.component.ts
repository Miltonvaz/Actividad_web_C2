import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'; 
import { ApiPokemonService } from '../../service/api-pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { Router } from '@angular/router'; 
import { UpperCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PipePokemonPipe } from '../../pipes/pipe-pokemon.pipe';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule, 
    MatIconModule,
    UpperCasePipe, 
    CommonModule,
    PipePokemonPipe 
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: MatTableDataSource<Pokemon> = new MatTableDataSource();
  favoritePokemons = new Set<string>(); 

  @ViewChild(MatPaginator) paginator?: MatPaginator; 
  @ViewChild(MatSort) sort?: MatSort; 

  constructor(private apiService: ApiPokemonService, private router: Router) { 
    this.loadPokemon();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  loadPokemon(): void {
    
    this.apiService.getPokemonList().subscribe({
      next: (response: Pokemon[]) => { 
        this.dataSource.data = response; 
      },
      error: (err: any) => {
        console.error('Error retrieving Pokémon data:', err);
      },
    });
  }

  applyFilter(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  viewDetails(row: Pokemon): void {
    const url = row.url; 
    this.router.navigate(['/detalles', { url }]);
  }

  toggleFavorite(row: Pokemon): void {
    if (this.favoritePokemons.has(row.url!)) {
      this.favoritePokemons.delete(row.url!);
    } else {
      this.favoritePokemons.add(row.url!);
    }
  }

  isFavorite(row: Pokemon): boolean {
    return this.favoritePokemons.has(row.url!);
  }
}
