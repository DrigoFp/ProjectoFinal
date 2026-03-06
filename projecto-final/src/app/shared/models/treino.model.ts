export interface Treino {
  id: number;
  nome: string;
  tipo: string;
  data: string;
  exercicios: {
    id: number,
    nome: string;
    repeticoes: number;
    peso: number;
  }[];
}
