import JobCard from '../JobCard';

export default function JobCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <JobCard
        id="1"
        title="Desarrollador Web Junior"
        company="Tech Solutions SA"
        location="CABA"
        jobType="Part-time"
        specialization="Programación"
        description="Buscamos estudiante de informática para desarrollo web. Horario flexible compatible con cursada."
        onViewDetails={(id) => console.log('Ver detalles del trabajo:', id)}
      />
    </div>
  );
}
