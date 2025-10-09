import TestimonialCard from '../TestimonialCard';

export default function TestimonialCardExample() {
  return (
    <div className="p-8 max-w-md">
      <TestimonialCard
        name="María González"
        specialization="Informática"
        year="6to año - 2024"
        quote="Gracias a esta plataforma conseguí mi primera práctica profesionalizante en una empresa de software. El equipo me ayudó con mi CV y ahora trabajo part-time mientras estudio."
      />
    </div>
  );
}
