export interface Treino {
  id: number;
  nome: string;
  tipo: string;
  data: string;
  exercicios: {
    nome: string;
    repeticoes: number;
    peso: number;
  }[];
}
