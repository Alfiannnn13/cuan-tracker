import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url(/bg.jpg)' }}
    >
      <div className=" bg-opacity-80 p-8 rounded-lg shadow-lg">
        <SignIn />
      </div>
    </div>
  );
}
