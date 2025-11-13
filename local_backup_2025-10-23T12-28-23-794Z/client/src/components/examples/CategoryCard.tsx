import CategoryCard from '../CategoryCard';
import { Code } from 'lucide-react';

export default function CategoryCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <CategoryCard
        title="Programación"
        description="Desarrollo web, aplicaciones móviles, bases de datos y más."
        icon={Code}
        count={15}
        href="/ofertas?rubro=programacion"
      />
    </div>
  );
}
