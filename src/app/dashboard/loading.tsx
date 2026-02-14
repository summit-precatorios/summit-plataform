import { LoadingSpinner } from '@/components/loading-spinner';

export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <LoadingSpinner className='h-8 w-8 text-brand' />
    </div>
  );
}
