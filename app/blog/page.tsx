import { title } from "@/components/primitives";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BlogPage() {
  const loading = false; // Replace with actual loading state

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className={title()}>Blog</h1>
    </div>
  );
}
