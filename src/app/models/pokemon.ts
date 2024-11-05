export interface Ability {
    ability: {
      name: string;
      url: string;
    };
  }
  
  export interface GameIndex {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }
  
  export interface Sprite {
    front_default: string;
    back_default?: string;
    front_shiny?: string;
    back_shiny?: string;
  }
  
  export interface Pokemon {
    name: string;
    url?: string;
    sprites?: Sprite;
    abilities?: Ability[];
    game_indices?: GameIndex[];
  }
  