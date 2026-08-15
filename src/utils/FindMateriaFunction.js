import dados from "../data/db.json";

export default function buscarMateriaPorId(id) {
  return dados.materias.find((materia) => materia.id === +id);
}
