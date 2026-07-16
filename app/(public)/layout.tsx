export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex mx-auto flex-1 w-full flex-col items-center justify-between p-4 sm:px-8 md:px-16 lg:px-32 bg-background">
      {children}
    </main>
  );
}