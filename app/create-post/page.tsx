//app/create-post/page.tsx
'use client';

import CreatePostForm from '@/components/CreatePostForm';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter();

  // Handle closing → go back
  const handleClose = () => {
    router.back();
  };

  return (
    <CreatePostForm open={true} onOpenChange={(open) => !open && handleClose()} />
  );
}

