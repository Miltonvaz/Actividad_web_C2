import { PipePokemonPipe } from './pipe-pokemon.pipe';

describe('PipePokemonPipe', () => {
  it('create an instance', () => {
    const pipe = new PipePokemonPipe();
    expect(pipe).toBeTruthy();
  });
});
