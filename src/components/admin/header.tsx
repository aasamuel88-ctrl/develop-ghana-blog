interface AdminHeaderProps {
  title: string;
  description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-2xl font-bold md:text-3xl">{title}</h1>
      {description && (
        <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
}
