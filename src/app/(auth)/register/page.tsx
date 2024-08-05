import Link from 'next/link';

import { Button } from '@/components/ui/button';

import RegisterUserForm from './_components/register-user-form';

export default function RegisterPage() {
  return (
    <>
      <RegisterUserForm />
      <Link href="/login" passHref>
        <Button variant="link">Already have an account? Login here</Button>
      </Link>
    </>
  );
}
