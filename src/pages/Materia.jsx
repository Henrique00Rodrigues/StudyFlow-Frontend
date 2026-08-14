import { useParams } from "react-router-dom";

export default function Materia() {
  const { id } = useParams();

  return (
    <main>
      <h1 className="text-white">Matéria {id}</h1>
    </main>
  );
}
